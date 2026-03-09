package com.jai.merchantcashbacksystem.service;

import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import com.jai.merchantcashbacksystem.dto.LoginRequest;
import com.jai.merchantcashbacksystem.dto.RegisterRequest;
import com.jai.merchantcashbacksystem.entity.Merchant;
import com.jai.merchantcashbacksystem.repository.MerchantRepository;
import com.jai.merchantcashbacksystem.security.JwtUtil;
import com.jai.merchantcashbacksystem.exception.InvalidCredentialsException;
import com.jai.merchantcashbacksystem.exception.ResourceAlreadyExistsException;
import com.jai.merchantcashbacksystem.exception.ResourceNotFoundException;
import com.jai.merchantcashbacksystem.service.WalletService;
import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class AuthService {

    private final MerchantRepository merchantRepository;
    private final PasswordEncoder passwordEncoder;
    private final WalletService walletService;
    private final JwtUtil jwtUtil;


    // Register Merchant
    public String register(RegisterRequest request) {

        if (merchantRepository.findByEmail(request.getEmail()).isPresent()) {
            throw new ResourceAlreadyExistsException("Email already registered");
        }

        Merchant merchant = Merchant.builder()
                .name(request.getName())
                .email(request.getEmail())
                .password(passwordEncoder.encode(request.getPassword()))
                .businessName(request.getBusinessName())
                .build();

        Merchant savedMerchant = merchantRepository.save(merchant);

     // 🔥 auto create wallet
     walletService.createWallet(savedMerchant);;

        return "Merchant registered successfully";
    }

    // Login Merchant
    public String login(LoginRequest request) {

        Merchant merchant = merchantRepository.findByEmail(request.getEmail())
                .orElseThrow(() -> new ResourceNotFoundException("Invalid email or password"));

        if (!passwordEncoder.matches(request.getPassword(), merchant.getPassword())) {
            throw new InvalidCredentialsException("Invalid email or password");
        }

        return jwtUtil.generateToken(merchant.getEmail());
    }
}
