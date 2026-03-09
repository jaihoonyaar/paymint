package com.jai.merchantcashbacksystem.dto;

import jakarta.validation.constraints.NotNull;
import lombok.Data;

import java.math.BigDecimal;

@Data
public class CreditWalletRequest {

    @NotNull
    private BigDecimal amount;

    private String description;
}