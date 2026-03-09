package com.jai.merchantcashbacksystem.entity;

import jakarta.persistence.*;
import lombok.*;

import java.time.LocalDateTime;

@Entity
@Table(name = "cashback_rules")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class CashbackRule {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    // Rule belongs to a merchant
    @ManyToOne
    @JoinColumn(name = "merchant_id", nullable = false)
    private Merchant merchant;

    // FLAT / TIERED / LOTTERY
    @Enumerated(EnumType.STRING)
    private CashbackType type;

    // JSON configuration stored as string
    @Column(columnDefinition = "TEXT")
    private String ruleConfig;

    // only one active rule per merchant
    private boolean active;

    private LocalDateTime createdAt;

    @PrePersist
    public void onCreate() {
        this.createdAt = LocalDateTime.now();
    }
}