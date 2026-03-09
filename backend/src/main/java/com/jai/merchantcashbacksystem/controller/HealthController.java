package com.jai.merchantcashbacksystem.controller;


import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api")
public class HealthController {

    @GetMapping("/health")
    public String health() {
        return "Merchant Cashback System Running";
    }
}