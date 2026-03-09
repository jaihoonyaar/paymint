package com.jai.merchantcashbacksystem.dto;

import com.jai.merchantcashbacksystem.entity.TransactionStatus;
import lombok.Builder;
import lombok.Data;

import java.math.BigDecimal;
import java.time.LocalDateTime;

@Data
@Builder
public class TransactionResponse {

    private Long id;
    private BigDecimal amount;
    private BigDecimal cashback;
    private TransactionStatus status;
    private LocalDateTime createdAt;
}