package com.jai.merchantcashbacksystem.service;

import org.springframework.stereotype.Service;

import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.jai.merchantcashbacksystem.entity.CashbackType;
import com.jai.merchantcashbacksystem.exception.InvalidRuleConfigException;

@Service
public class RuleValidationService {

    private final ObjectMapper objectMapper = new ObjectMapper();

    public void validate(CashbackType type, String ruleConfig) {

        try {
            JsonNode node = objectMapper.readTree(ruleConfig);

            switch (type) {

                case FLAT:
                    validateFlat(node);
                    break;

                case TIERED:
                    validateTiered(node);
                    break;

                case LOTTERY:
                    validateLottery(node);
                    break;

                default:
                    throw new InvalidRuleConfigException("Unsupported cashback type");
            }

        } catch (Exception e) {
            throw new InvalidRuleConfigException(e.getMessage());
        }
    }

    private void validateFlat(JsonNode node) {
        if (!node.has("percentage")) {
            throw new InvalidRuleConfigException("FLAT rule requires 'percentage'");
        }
    }

    private void validateTiered(JsonNode node) {
        if (!node.has("tiers") || !node.get("tiers").isArray()) {
            throw new InvalidRuleConfigException("TIERED rule requires 'tiers' array");
        }
    }

    private void validateLottery(JsonNode node) {
        if (!node.has("chance") || !node.has("reward")) {
            throw new InvalidRuleConfigException("LOTTERY rule requires 'chance' and 'reward'");
        }
    }
}