package com.jai.merchantcashbacksystem.repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.jai.merchantcashbacksystem.entity.Merchant;
import com.jai.merchantcashbacksystem.entity.MerchantWallet;

@Repository
public interface MerchantWalletRepository
        extends JpaRepository<MerchantWallet, Long> {

    Optional<MerchantWallet> findByMerchant(Merchant merchant);
}