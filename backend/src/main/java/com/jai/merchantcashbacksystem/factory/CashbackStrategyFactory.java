package com.jai.merchantcashbacksystem.factory;

import java.util.Map;

import org.springframework.stereotype.Component;

import com.jai.merchantcashbacksystem.entity.CashbackType;
import com.jai.merchantcashbacksystem.strategy.CashbackStrategy;
import com.jai.merchantcashbacksystem.strategy.FlatCashbackStrategy;
import com.jai.merchantcashbacksystem.strategy.TieredCashbackStrategy;
import com.jai.merchantcashbacksystem.strategy.LotteryCashbackStrategy;

@Component
public class CashbackStrategyFactory {

    private final Map<CashbackType, CashbackStrategy> strategies;

    public CashbackStrategyFactory(
            FlatCashbackStrategy flat,
            TieredCashbackStrategy tiered,
            LotteryCashbackStrategy lottery) {

        strategies = Map.of(
                CashbackType.FLAT, flat,
                CashbackType.TIERED, tiered,
                CashbackType.LOTTERY, lottery
        );
    }

    public CashbackStrategy getStrategy(CashbackType type) {

        CashbackStrategy strategy = strategies.get(type);

        if (strategy == null) {
            throw new RuntimeException("Unsupported cashback type");
        }

        return strategy;
    }
}