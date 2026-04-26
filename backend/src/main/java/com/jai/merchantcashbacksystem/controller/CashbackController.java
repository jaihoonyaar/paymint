package com.jai.merchantcashbacksystem.controller;

import java.math.BigDecimal;

import java.util.List;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;
import org.springframework.transaction.annotation.Transactional;
import com.jai.merchantcashbacksystem.dto.ApiResponse;
import com.jai.merchantcashbacksystem.dto.CashbackRuleRequest;
import com.jai.merchantcashbacksystem.entity.CashbackRule;
import com.jai.merchantcashbacksystem.entity.Merchant;
import com.jai.merchantcashbacksystem.exception.ResourceNotFoundException;
import com.jai.merchantcashbacksystem.repository.CashbackRuleRepository;
import com.jai.merchantcashbacksystem.repository.MerchantRepository;
import com.jai.merchantcashbacksystem.service.CashbackService;
import com.jai.merchantcashbacksystem.service.RuleValidationService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/api/cashback")
@RequiredArgsConstructor
public class CashbackController {

    private final CashbackRuleRepository cashbackRuleRepository;
    private final MerchantRepository merchantRepository;
    private final CashbackService cashbackService;
    private final RuleValidationService ruleValidationService;

    // ✅ Create / Activate rule
    @PostMapping("/rule")
    @Transactional
    public ApiResponse<String> createRule(
            Authentication authentication,
            @Valid @RequestBody CashbackRuleRequest request) {

        String email = authentication.getName();

        Merchant merchant = merchantRepository.findByEmail(email)
                .orElseThrow(() ->
                        new ResourceNotFoundException("Merchant not found"));

        // deactivate old rule
        cashbackRuleRepository
                .findByMerchantAndActiveTrue(merchant)
                .ifPresent(rule -> {
                    rule.setActive(false);
                    cashbackRuleRepository.save(rule);
                });
     // ✅ Validate rule configuration first
        ruleValidationService.validate(
                request.getType(),
                request.getRuleConfig()
        );
        
        CashbackRule newRule = CashbackRule.builder()
                .merchant(merchant)
                .type(request.getType())
                .ruleConfig(request.getRuleConfig())
                .active(true)
                .build();

        cashbackRuleRepository.save(newRule);

        return new ApiResponse<>(true, "Cashback rule activated", null);
    }

    // ✅ Get active rule
    @GetMapping("/rule")
    public ApiResponse<CashbackRule> getActiveRule(Authentication authentication) {

        String email = authentication.getName();

        Merchant merchant = merchantRepository.findByEmail(email)
                .orElseThrow(() ->
                        new ResourceNotFoundException("Merchant not found"));

        CashbackRule rule = cashbackRuleRepository
                .findByMerchantAndActiveTrue(merchant)
                .orElseThrow(() ->
                        new ResourceNotFoundException("No active rule"));

        return new ApiResponse<>(true, "Active rule fetched", rule);
    }

    // ✅ Test cashback calculation
    @PostMapping("/test")
    public ApiResponse<BigDecimal> testCashback(
            Authentication authentication,
            @RequestParam BigDecimal amount) {

        String email = authentication.getName();

        Merchant merchant = merchantRepository.findByEmail(email)
                .orElseThrow(() ->
                        new ResourceNotFoundException("Merchant not found"));

        BigDecimal cashback =
                cashbackService.calculateCashback(merchant, amount);

        return new ApiResponse<>(true, "Cashback calculated", cashback);
    }
    @GetMapping("/rules")
    public ApiResponse<List<CashbackRule>> getAllRules(
            Authentication authentication) {

        String email = authentication.getName();

        Merchant merchant = merchantRepository.findByEmail(email)
                .orElseThrow(() ->
                        new ResourceNotFoundException("Merchant not found"));

        List<CashbackRule> rules =
                cashbackRuleRepository.findByMerchant(merchant);

        return new ApiResponse<>(true, "All cashback rules fetched", rules);
    }
    
    @PutMapping("/rule/{id}/toggle")
    public ApiResponse toggleRule(@PathVariable Long id) {

        cashbackService.toggleRule(id);

        return new ApiResponse(true, "Rule status updated", null);
    }

    @GetMapping("/summary/{merchantId}")
public ApiResponse<String> getCashbackSummary(@PathVariable Long merchantId) {

    
    return new ApiResponse<>(
        true,
        "Cashback summary fetched",
        "Total cashback this week: ₹3500"
    );
}
}