package com.jai.merchantcashbacksystem.dto;

import com.jai.merchantcashbacksystem.entity.LedgerType;
import com.jai.merchantcashbacksystem.entity.ReferenceType;
import lombok.Builder;
import lombok.Data;

import java.math.BigDecimal;
import java.time.LocalDateTime;

@Data
@Builder
public class LedgerResponse {

    private BigDecimal amount;
    private LedgerType type;
    private ReferenceType referenceType;
    private String description;
    private LocalDateTime createdAt;
}