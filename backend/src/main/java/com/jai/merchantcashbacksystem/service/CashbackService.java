package com.jai.merchantcashbacksystem.service;

import java.math.BigDecimal;

import org.springframework.stereotype.Service;

import com.jai.merchantcashbacksystem.entity.CashbackRule;
import com.jai.merchantcashbacksystem.entity.Merchant;
import com.jai.merchantcashbacksystem.exception.ResourceNotFoundException;
import com.jai.merchantcashbacksystem.factory.CashbackStrategyFactory;
import com.jai.merchantcashbacksystem.repository.CashbackRuleRepository;
import com.jai.merchantcashbacksystem.strategy.CashbackStrategy;

import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class CashbackService {

    private final CashbackRuleRepository cashbackRuleRepository;
    private final CashbackStrategyFactory strategyFactory;

    public BigDecimal calculateCashback(Merchant merchant,
                                         BigDecimal amount) {

        // 1️⃣ Fetch active rule
        CashbackRule rule = cashbackRuleRepository
                .findByMerchantAndActiveTrue(merchant)
                .orElseThrow(() ->
                        new ResourceNotFoundException("No active cashback rule"));

        // 2️⃣ Get strategy
        CashbackStrategy strategy =
                strategyFactory.getStrategy(rule.getType());

        // 3️⃣ Calculate cashback
        return strategy.calculateCashback(
                amount,
                rule.getRuleConfig()
        );
    }
    
    @Transactional
    public void toggleRule(Long ruleId) {

        CashbackRule rule = cashbackRuleRepository.findById(ruleId)
                .orElseThrow(() -> new ResourceNotFoundException("Rule not found"));

        if (!rule.isActive()) {

            // deactivate all rules first
            cashbackRuleRepository.deactivateAllRules();

            rule.setActive(true);

        } else {

            rule.setActive(false);
        }

        cashbackRuleRepository.save(rule);
    }
}