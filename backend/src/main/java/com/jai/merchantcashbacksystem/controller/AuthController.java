package com.jai.merchantcashbacksystem.controller;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.jai.merchantcashbacksystem.dto.LoginRequest;
import com.jai.merchantcashbacksystem.dto.RegisterRequest;
import com.jai.merchantcashbacksystem.service.AuthService;
import com.jai.merchantcashbacksystem.dto.ApiResponse;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;



@RestController
@RequestMapping("/api/auth")
@RequiredArgsConstructor
public class AuthController {

    private final AuthService authService;

    @PostMapping("/register")
    public ResponseEntity<ApiResponse<?>> register(@Valid @RequestBody RegisterRequest request) {

        String message = authService.register(request);

        return ResponseEntity.ok(
                new ApiResponse<>(true, message, null)
        );
    }

    @PostMapping("/login")
    public ResponseEntity<ApiResponse<?>> login(@Valid @RequestBody LoginRequest request) {

        String token = authService.login(request);

        return ResponseEntity.ok(
                new ApiResponse<>(true, "Login successful", token)
        );
    }
}
