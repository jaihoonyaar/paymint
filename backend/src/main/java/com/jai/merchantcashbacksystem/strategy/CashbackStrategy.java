package com.jai.merchantcashbacksystem.strategy;

import java.math.BigDecimal;

public interface CashbackStrategy {

    BigDecimal calculateCashback(BigDecimal amount, String ruleConfig);
}