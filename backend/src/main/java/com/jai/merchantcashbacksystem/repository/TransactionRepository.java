package com.jai.merchantcashbacksystem.repository;

import java.math.BigDecimal;
import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.Query;

import com.jai.merchantcashbacksystem.entity.Merchant;
import com.jai.merchantcashbacksystem.entity.Transaction;
import com.jai.merchantcashbacksystem.entity.TransactionStatus;

@Repository
public interface TransactionRepository
        extends JpaRepository<Transaction, Long> {

    List<Transaction> findByMerchant(Merchant merchant);

    Optional<Transaction> findByReferenceId(String referenceId);
    
    Page<Transaction> findByMerchant(Merchant merchant, Pageable pageable);
    
    
    long countByMerchant(Merchant merchant);

    long countByMerchantAndStatus(
            Merchant merchant,
            TransactionStatus status);

    @Query("""
           SELECT COALESCE(SUM(t.cashback),0)
           FROM Transaction t
           WHERE t.merchant = :merchant
           AND t.status = 'SUCCESS'
           """)
    BigDecimal totalCashbackByMerchant(Merchant merchant);
}