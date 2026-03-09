package com.jai.merchantcashbacksystem.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.jai.merchantcashbacksystem.entity.MerchantWallet;
import com.jai.merchantcashbacksystem.entity.WalletLedger;

@Repository
public interface WalletLedgerRepository
        extends JpaRepository<WalletLedger, Long> {

	List<WalletLedger> findByWalletOrderByCreatedAtDesc(MerchantWallet wallet);
	}