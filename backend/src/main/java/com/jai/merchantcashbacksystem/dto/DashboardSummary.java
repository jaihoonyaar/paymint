package com.jai.merchantcashbacksystem.dto;

import lombok.Builder;
import lombok.Data;

import java.math.BigDecimal;

@Data
@Builder
public class DashboardSummary {

    private long totalTransactions;
    private long successfulPayments;
    private long failedPayments;
    private BigDecimal totalCashbackGiven;
    private BigDecimal walletBalance;
}