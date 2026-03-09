package com.jai.merchantcashbacksystem.strategy;

import java.math.BigDecimal;
import java.math.RoundingMode;

import org.springframework.stereotype.Component;

import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;

@Component
public class TieredCashbackStrategy implements CashbackStrategy {

    private final ObjectMapper objectMapper = new ObjectMapper();

    @Override
    public BigDecimal calculateCashback(BigDecimal amount, String ruleConfig) {

        try {
            JsonNode root = objectMapper.readTree(ruleConfig);
            JsonNode tiers = root.get("tiers");

            for (JsonNode tier : tiers) {

                BigDecimal min = tier.get("min").decimalValue();
                BigDecimal max = tier.get("max").decimalValue();
                BigDecimal percent = tier.get("percent").decimalValue();

                // check range
                if (amount.compareTo(min) >= 0 &&
                    amount.compareTo(max) < 0) {

                    return amount
                            .multiply(percent)
                            .divide(BigDecimal.valueOf(100), 2, RoundingMode.HALF_UP);
                }
            }

            return BigDecimal.ZERO;

        } catch (Exception e) {
            throw new RuntimeException("Invalid TIERED cashback config");
        }
    }
}