package com.jai.merchantcashbacksystem.strategy;

import java.math.BigDecimal;
import java.math.RoundingMode;

import org.springframework.stereotype.Component;

import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;

@Component
public class FlatCashbackStrategy implements CashbackStrategy {

    private final ObjectMapper objectMapper = new ObjectMapper();

    @Override
    public BigDecimal calculateCashback(BigDecimal amount, String ruleConfig) {

        try {
            // Parse JSON config
            JsonNode node = objectMapper.readTree(ruleConfig);

            BigDecimal percentage =
                    node.get("percentage").decimalValue();

            // cashback = amount * percentage / 100
            return amount
                    .multiply(percentage)
                    .divide(BigDecimal.valueOf(100), 2, RoundingMode.HALF_UP);

        } catch (Exception e) {
            throw new RuntimeException("Invalid FLAT cashback config");
        }
    }
}