package com.jai.merchantcashbacksystem.service;

import java.math.BigDecimal;
import java.util.List;

import org.springframework.stereotype.Service;

import com.jai.merchantcashbacksystem.entity.*;
import com.jai.merchantcashbacksystem.exception.ResourceNotFoundException;
import com.jai.merchantcashbacksystem.repository.MerchantWalletRepository;
import com.jai.merchantcashbacksystem.repository.WalletLedgerRepository;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class WalletService {

    private final MerchantWalletRepository walletRepository;
    private final WalletLedgerRepository ledgerRepository;

    // ✅ Create wallet when merchant registers
    public MerchantWallet createWallet(Merchant merchant) {

        MerchantWallet wallet = MerchantWallet.builder()
                .merchant(merchant)
                .build();

        return walletRepository.save(wallet);
    }

    // ✅ Credit wallet
    public void creditWallet(MerchantWallet wallet,
                             BigDecimal amount,
                             ReferenceType referenceType,
                             String description) {

        WalletLedger entry = WalletLedger.builder()
                .wallet(wallet)
                .amount(amount)
                .type(LedgerType.CREDIT)
                .referenceType(referenceType)
                .description(description)
                .build();

        ledgerRepository.save(entry);
    }

    // ✅ Debit wallet
    public void debitWallet(MerchantWallet wallet,
                            BigDecimal amount,
                            ReferenceType referenceType,
                            String description) {

        BigDecimal balance = getWalletBalance(wallet);

        if (balance.compareTo(amount) < 0) {
            throw new RuntimeException("Insufficient wallet balance");
        }

        WalletLedger entry = WalletLedger.builder()
                .wallet(wallet)
                .amount(amount)
                .type(LedgerType.DEBIT)
                .referenceType(referenceType)
                .description(description)
                .build();

        ledgerRepository.save(entry);
    }

    // ✅ Calculate wallet balance
    public BigDecimal getWalletBalance(MerchantWallet wallet) {

        List<WalletLedger> entries = ledgerRepository.findByWalletOrderByCreatedAtDesc(wallet);

        BigDecimal credits = entries.stream()
                .filter(e -> e.getType() == LedgerType.CREDIT)
                .map(WalletLedger::getAmount)
                .reduce(BigDecimal.ZERO, BigDecimal::add);

        BigDecimal debits = entries.stream()
                .filter(e -> e.getType() == LedgerType.DEBIT)
                .map(WalletLedger::getAmount)
                .reduce(BigDecimal.ZERO, BigDecimal::add);

        return credits.subtract(debits);
    }

    // ✅ Ledger history
    public List<WalletLedger> getLedgerHistory(MerchantWallet wallet) {
        return ledgerRepository.findByWalletOrderByCreatedAtDesc(wallet);
    }
    
    public MerchantWallet getWalletByMerchant(Merchant merchant) {

        return walletRepository.findByMerchant(merchant)
                .orElseThrow(() ->
                        new ResourceNotFoundException("Wallet not found"));
    }
}