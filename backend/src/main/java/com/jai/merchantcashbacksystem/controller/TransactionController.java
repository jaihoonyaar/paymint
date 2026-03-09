package com.jai.merchantcashbacksystem.controller;

import java.util.List;
import java.util.stream.Collectors;

import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;

import com.jai.merchantcashbacksystem.dto.ApiResponse;
import com.jai.merchantcashbacksystem.dto.TransactionResponse;
import com.jai.merchantcashbacksystem.entity.Merchant;
import com.jai.merchantcashbacksystem.exception.ResourceNotFoundException;
import com.jai.merchantcashbacksystem.repository.MerchantRepository;
import com.jai.merchantcashbacksystem.repository.TransactionRepository;

import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/api/transactions")
@RequiredArgsConstructor
public class TransactionController {

    private final TransactionRepository transactionRepository;
    private final MerchantRepository merchantRepository;

    @GetMapping
    public ApiResponse<Page<TransactionResponse>> getTransactions(
            Authentication authentication,
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "5") int size) {

        String email = authentication.getName();

        Merchant merchant = merchantRepository.findByEmail(email)
                .orElseThrow(() ->
                        new ResourceNotFoundException("Merchant not found"));

        Pageable pageable = PageRequest.of(page, size, Sort.by("createdAt").descending());

        Page<TransactionResponse> transactions =
                transactionRepository.findByMerchant(merchant, pageable)
                        .map(tx -> TransactionResponse.builder()
                                .id(tx.getId())
                                .amount(tx.getAmount())
                                .cashback(tx.getCashback())
                                .status(tx.getStatus())
                                .createdAt(tx.getCreatedAt())
                                .build());

        return new ApiResponse<>(true,
                "Transactions fetched",
                transactions);
    }
}