package com.jai.merchantcashbacksystem.strategy;

import java.math.BigDecimal;
import java.util.Random;

import org.springframework.stereotype.Component;

import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;

@Component
public class LotteryCashbackStrategy implements CashbackStrategy {

    private final ObjectMapper objectMapper = new ObjectMapper();
    private final Random random = new Random();

    @Override
    public BigDecimal calculateCashback(BigDecimal amount, String ruleConfig) {

        try {
            JsonNode node = objectMapper.readTree(ruleConfig);

            int chance = node.get("chance").asInt();
            BigDecimal reward = node.get("reward").decimalValue();

            // random number between 1 and chance
            int draw = random.nextInt(chance) + 1;

            if (draw == 1) {
                return reward; // winner 🎉
            }

            return BigDecimal.ZERO;

        } catch (Exception e) {
            throw new RuntimeException("Invalid LOTTERY cashback config");
        }
    }
}