package com.jai.merchantcashbacksystem.dto;

import com.jai.merchantcashbacksystem.entity.CashbackType;
import jakarta.validation.constraints.NotNull;
import lombok.Data;

@Data
public class CashbackRuleRequest {

    @NotNull
    private CashbackType type;

    @NotNull
    private String ruleConfig;
}