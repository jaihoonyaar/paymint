package com.jai.merchantcashbacksystem.controller;

import java.math.BigDecimal;

import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import jakarta.validation.Valid;
import com.jai.merchantcashbacksystem.dto.CreditWalletRequest;
import com.jai.merchantcashbacksystem.entity.ReferenceType;

import java.util.List;
import java.util.stream.Collectors;
import com.jai.merchantcashbacksystem.dto.LedgerResponse;
import org.springframework.web.bind.annotation.GetMapping;

import com.jai.merchantcashbacksystem.dto.ApiResponse;
import com.jai.merchantcashbacksystem.entity.Merchant;
import com.jai.merchantcashbacksystem.entity.MerchantWallet;
import com.jai.merchantcashbacksystem.exception.ResourceNotFoundException;
import com.jai.merchantcashbacksystem.repository.MerchantRepository;
import com.jai.merchantcashbacksystem.service.WalletService;

import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/api/wallet")
@RequiredArgsConstructor
public class WalletController {

    private final WalletService walletService;
    private final MerchantRepository merchantRepository;

    @GetMapping("/balance")
    public ApiResponse<BigDecimal> getBalance(Authentication authentication) {

        String email = authentication.getName();

        Merchant merchant = merchantRepository.findByEmail(email)
                .orElseThrow(() ->
                        new ResourceNotFoundException("Merchant not found"));

        MerchantWallet wallet =
                walletService.getWalletByMerchant(merchant);

        BigDecimal balance =
                walletService.getWalletBalance(wallet);

        return new ApiResponse<>(true, "Wallet balance fetched", balance);
    }
    
    @PostMapping("/credit")
    public ApiResponse<String> creditWallet(
            Authentication authentication,
            @Valid @RequestBody CreditWalletRequest request) {

        String email = authentication.getName();

        Merchant merchant = merchantRepository.findByEmail(email)
                .orElseThrow(() ->
                        new ResourceNotFoundException("Merchant not found"));

        MerchantWallet wallet =
                walletService.getWalletByMerchant(merchant);

        walletService.creditWallet(
                wallet,
                request.getAmount(),
                ReferenceType.TOPUP,
                request.getDescription()
        );

        return new ApiResponse<>(true, "Wallet credited successfully", null);
    }
    
    @GetMapping("/ledger")
    public ApiResponse<List<LedgerResponse>> getLedger(Authentication authentication) {

        String email = authentication.getName();

        Merchant merchant = merchantRepository.findByEmail(email)
                .orElseThrow(() ->
                        new ResourceNotFoundException("Merchant not found"));

        MerchantWallet wallet =
                walletService.getWalletByMerchant(merchant);

        List<LedgerResponse> ledger = walletService.getLedgerHistory(wallet)
                .stream()
                .map(entry -> LedgerResponse.builder()
                        .amount(entry.getAmount())
                        .type(entry.getType())
                        .referenceType(entry.getReferenceType())
                        .description(entry.getDescription())
                        .createdAt(entry.getCreatedAt())
                        .build())
                .collect(Collectors.toList());

        return new ApiResponse<>(true, "Ledger fetched", ledger);
    }
}