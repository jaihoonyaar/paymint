package com.jai.merchantcashbacksystem.dto;

import lombok.Builder;
import lombok.Data;

import java.math.BigDecimal;

@Data
@Builder
public class PaymentResponse {

    private BigDecimal paymentAmount;
    private BigDecimal cashback;
    private BigDecimal remainingBalance;
    private String referenceId;
}