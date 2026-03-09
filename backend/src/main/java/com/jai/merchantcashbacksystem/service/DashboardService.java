package com.jai.merchantcashbacksystem.service;

import java.math.BigDecimal;

import org.springframework.stereotype.Service;

import com.jai.merchantcashbacksystem.dto.DashboardSummary;
import com.jai.merchantcashbacksystem.entity.Merchant;
import com.jai.merchantcashbacksystem.entity.TransactionStatus;
import com.jai.merchantcashbacksystem.repository.TransactionRepository;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class DashboardService {

    private final TransactionRepository transactionRepository;
    private final WalletService walletService;

    public DashboardSummary getSummary(Merchant merchant) {

        long total =
                transactionRepository.countByMerchant(merchant);

        long success =
                transactionRepository.countByMerchantAndStatus(
                        merchant,
                        TransactionStatus.SUCCESS);

        long failed =
                transactionRepository.countByMerchantAndStatus(
                        merchant,
                        TransactionStatus.FAILED);

        BigDecimal cashback =
                transactionRepository.totalCashbackByMerchant(merchant);

        BigDecimal balance =
                walletService.getWalletBalance(
                        walletService.getWalletByMerchant(merchant));

        return DashboardSummary.builder()
                .totalTransactions(total)
                .successfulPayments(success)
                .failedPayments(failed)
                .totalCashbackGiven(cashback)
                .walletBalance(balance)
                .build();
    }
}