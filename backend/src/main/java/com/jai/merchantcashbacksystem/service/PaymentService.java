package com.jai.merchantcashbacksystem.service;

import java.math.BigDecimal;
import java.util.Optional;
import org.springframework.stereotype.Service;

import com.jai.merchantcashbacksystem.dto.PaymentResponse;
import com.jai.merchantcashbacksystem.entity.Merchant;
import com.jai.merchantcashbacksystem.entity.MerchantWallet;
import com.jai.merchantcashbacksystem.entity.ReferenceType;
import com.jai.merchantcashbacksystem.exception.ResourceNotFoundException;
import com.jai.merchantcashbacksystem.entity.Transaction;
import com.jai.merchantcashbacksystem.entity.TransactionStatus;
import com.jai.merchantcashbacksystem.repository.TransactionRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.transaction.annotation.Transactional;

@Service
@RequiredArgsConstructor

public class PaymentService {
	

    private final CashbackService cashbackService;
    private final WalletService walletService;
    private final TransactionRepository transactionRepository;
    
    @Transactional
    public PaymentResponse processPayment(Merchant merchant,
            BigDecimal amount,
            String idempotencyKey) {

    	// ⭐ Check duplicate payment using idempotency key
    	Optional<Transaction> existingTransaction =
    	        transactionRepository.findByReferenceId(idempotencyKey);

    	if (existingTransaction.isPresent()) {

    	    Transaction tx = existingTransaction.get();

    	    return PaymentResponse.builder()
    	            .paymentAmount(tx.getAmount())
    	            .cashback(tx.getCashback())
    	            .remainingBalance(
    	                    walletService.getWalletBalance(
    	                            walletService.getWalletByMerchant(merchant)))
    	            .referenceId(tx.getReferenceId())
    	            .build();
    	}
    	
// 1️⃣ Get wallet
MerchantWallet wallet =
walletService.getWalletByMerchant(merchant);

// 2️⃣ Calculate cashback
BigDecimal cashback =
cashbackService.calculateCashback(merchant, amount);

// 3️⃣ Debit wallet if cashback exists
if (cashback.compareTo(BigDecimal.ZERO) > 0) {

walletService.debitWallet(
wallet,
cashback,
ReferenceType.CASHBACK,
"Cashback for payment of " + amount
);
}

// 4️⃣ Get updated balance
BigDecimal remainingBalance =
walletService.getWalletBalance(wallet);

// ⭐ 5️⃣ SAVE TRANSACTION
Transaction transaction = Transaction.builder()
.merchant(merchant)
.amount(amount)
.cashback(cashback)
.status(TransactionStatus.SUCCESS)
.build();

transactionRepository.save(transaction);

// 6️⃣ Return response
return PaymentResponse.builder()
        .paymentAmount(amount)
        .cashback(cashback)
        .remainingBalance(remainingBalance)
        .referenceId(transaction.getReferenceId())
        .build();
}
    @Transactional
    public String createPayment(Merchant merchant,
                                BigDecimal amount,
                                String idempotencyKey) {

        // Check if payment already created
        Optional<Transaction> existing =
                transactionRepository.findByReferenceId(idempotencyKey);

        if (existing.isPresent()) {
            return existing.get().getReferenceId();
        }

        // Create PENDING transaction
        Transaction transaction = Transaction.builder()
                .merchant(merchant)
                .amount(amount)
                .cashback(BigDecimal.ZERO)
                .referenceId(idempotencyKey)
                .status(TransactionStatus.PENDING)
                .build();

        transactionRepository.save(transaction);

        return transaction.getReferenceId();
    }
    
    @Transactional
    public PaymentResponse confirmPayment(String referenceId) {

        // 1️⃣ Find transaction
        Transaction transaction = transactionRepository
                .findByReferenceId(referenceId)
                .orElseThrow(() ->
                        new ResourceNotFoundException("Transaction not found"));
        
        if (transaction.getStatus() == TransactionStatus.FAILED) {
            throw new RuntimeException(
                    "Cannot confirm a FAILED payment");
        }
        // 2️⃣ Prevent double confirmation
        if (transaction.getStatus() == TransactionStatus.SUCCESS) {

            MerchantWallet wallet =
                    walletService.getWalletByMerchant(transaction.getMerchant());

            return PaymentResponse.builder()
                    .paymentAmount(transaction.getAmount())
                    .cashback(transaction.getCashback())
                    .remainingBalance(walletService.getWalletBalance(wallet))
                    .referenceId(referenceId)
                    .build();
        }

        // 3️⃣ Calculate cashback
        BigDecimal cashback =
                cashbackService.calculateCashback(
                        transaction.getMerchant(),
                        transaction.getAmount());

        // 4️⃣ Debit wallet
        MerchantWallet wallet =
                walletService.getWalletByMerchant(transaction.getMerchant());

        if (cashback.compareTo(BigDecimal.ZERO) > 0) {
            walletService.debitWallet(
                    wallet,
                    cashback,
                    ReferenceType.CASHBACK,
                    "Cashback for payment of " + transaction.getAmount()
            );
        }

        // 5️⃣ Update transaction
        transaction.setCashback(cashback);
        transaction.setStatus(TransactionStatus.SUCCESS);

        transactionRepository.save(transaction);

        // 6️⃣ Return response
        return PaymentResponse.builder()
                .paymentAmount(transaction.getAmount())
                .cashback(cashback)
                .remainingBalance(walletService.getWalletBalance(wallet))
                .referenceId(referenceId)
                .build();
    }
    
    @Transactional
    public String failPayment(String referenceId) {

        Transaction transaction = transactionRepository
                .findByReferenceId(referenceId)
                .orElseThrow(() ->
                        new ResourceNotFoundException("Transaction not found"));

        // Prevent invalid state change
        if (transaction.getStatus() == TransactionStatus.SUCCESS) {
            throw new RuntimeException("Cannot fail a successful payment");
        }

        if (transaction.getStatus() == TransactionStatus.FAILED) {
            return "Payment already failed";
        }

        transaction.setStatus(TransactionStatus.FAILED);
        transactionRepository.save(transaction);

        return "Payment marked as FAILED";
    }
    
    
}