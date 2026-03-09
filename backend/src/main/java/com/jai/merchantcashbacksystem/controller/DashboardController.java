package com.jai.merchantcashbacksystem.controller;

import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import com.jai.merchantcashbacksystem.dto.ApiResponse;
import com.jai.merchantcashbacksystem.dto.DashboardSummary;
import com.jai.merchantcashbacksystem.entity.Merchant;
import com.jai.merchantcashbacksystem.exception.ResourceNotFoundException;
import com.jai.merchantcashbacksystem.repository.MerchantRepository;
import com.jai.merchantcashbacksystem.service.DashboardService;

import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/api/dashboard")
@RequiredArgsConstructor
public class DashboardController {

    private final DashboardService dashboardService;
    private final MerchantRepository merchantRepository;

    @GetMapping("/summary")
    public ApiResponse<DashboardSummary> getSummary(
            Authentication authentication) {

        String email = authentication.getName();

        Merchant merchant = merchantRepository.findByEmail(email)
                .orElseThrow(() ->
                        new ResourceNotFoundException("Merchant not found"));

        DashboardSummary summary =
                dashboardService.getSummary(merchant);

        return new ApiResponse<>(true,
                "Dashboard summary fetched",
                summary);
    }
}