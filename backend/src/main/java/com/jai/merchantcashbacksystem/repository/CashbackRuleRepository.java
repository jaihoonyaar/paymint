package com.jai.merchantcashbacksystem.repository;

import java.util.Optional;
import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import com.jai.merchantcashbacksystem.entity.CashbackRule;
import com.jai.merchantcashbacksystem.entity.Merchant;

@Repository
public interface CashbackRuleRepository
        extends JpaRepository<CashbackRule, Long> {

    // Find active rule for merchant
    Optional<CashbackRule> findByMerchantAndActiveTrue(Merchant merchant);

    // Get all rules (history)
    List<CashbackRule> findByMerchant(Merchant merchant);
    
    @Modifying
    @Query("UPDATE CashbackRule r SET r.active = false")
    void deactivateAllRules();
}