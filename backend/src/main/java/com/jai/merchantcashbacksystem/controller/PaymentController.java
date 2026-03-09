package com.jai.merchantcashbacksystem.controller;

import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import com.jai.merchantcashbacksystem.dto.ApiResponse;
import com.jai.merchantcashbacksystem.dto.PaymentRequest;
import com.jai.merchantcashbacksystem.dto.PaymentResponse;
import com.jai.merchantcashbacksystem.entity.Merchant;
import com.jai.merchantcashbacksystem.exception.ResourceNotFoundException;
import com.jai.merchantcashbacksystem.repository.MerchantRepository;
import com.jai.merchantcashbacksystem.service.PaymentService;

import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/api/payment")
@RequiredArgsConstructor
public class PaymentController {

    private final PaymentService paymentService;
    private final MerchantRepository merchantRepository;

    @PostMapping("/process")
    public ApiResponse<PaymentResponse> processPayment(
            Authentication authentication,
            @RequestHeader("Idempotency-Key") String idempotencyKey,
            @Valid @RequestBody PaymentRequest request) {

        String email = authentication.getName();

        Merchant merchant = merchantRepository.findByEmail(email)
                .orElseThrow(() ->
                        new ResourceNotFoundException("Merchant not found"));

        PaymentResponse response =
        		paymentService.processPayment(
        		        merchant,
        		        request.getAmount(),
        		        idempotencyKey
        		);

        return new ApiResponse<>(
                true,
                "Payment processed successfully",
                response
        );
    }
    
    @PostMapping("/create")
    public ApiResponse<String> createPayment(
            Authentication authentication,
            @RequestHeader("Idempotency-Key") String idempotencyKey,
            @Valid @RequestBody PaymentRequest request) {

        String email = authentication.getName();

        Merchant merchant = merchantRepository.findByEmail(email)
                .orElseThrow(() ->
                        new ResourceNotFoundException("Merchant not found"));

        String referenceId =
                paymentService.createPayment(
                        merchant,
                        request.getAmount(),
                        idempotencyKey
                );

        return new ApiResponse<>(true,
                "Payment created (PENDING)",
                referenceId);
    }
    
    
    @PostMapping("/confirm/{referenceId}")
    public ApiResponse<PaymentResponse> confirmPayment(
            @PathVariable String referenceId) {

        PaymentResponse response =
                paymentService.confirmPayment(referenceId);

        return new ApiResponse<>(true,
                "Payment confirmed successfully",
                response);
    }
    
    
    @PostMapping("/fail/{referenceId}")
    public ApiResponse<String> failPayment(
            @PathVariable String referenceId) {

        String result = paymentService.failPayment(referenceId);

        return new ApiResponse<>(true, result, null);
    }
}