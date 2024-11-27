import React, {
  useState,
  useEffect,
  ChangeEvent,
  useCallback,
  useMemo,
} from 'react';
import { useAppDispatch, useAppSelector } from '@/app/store/hooks';
import {
  fetchCurrencies, selectAllCurrencies, selectCurrenciesError, selectCurrenciesStatus,
} from '@/app/store/currenciesSlice';
import Big from 'big.js';
import StatusHandler from '@/components/StatusHandler/StatusHandler';
import cls from './ConvertPage.module.scss';

const ConvertPage: React.FC = () => {
  const currencies = useAppSelector(selectAllCurrencies);
  const currenciesStatus = useAppSelector(selectCurrenciesStatus);
  const error = useAppSelector(selectCurrenciesError);

  const dispatch = useAppDispatch();

  const [fromCurrency, setFromCurrency] = useState<string>(() => localStorage.getItem('fromCurrency') || 'BTC');
  const [toCurrency, setToCurrency] = useState<string>(() => localStorage.getItem('toCurrency') || 'RUB');
  const [amount, setAmount] = useState<string>(() => localStorage.getItem('amount') || '');
  const [result, setResult] = useState<string>('');

  const handleFromCurrencyChange = useCallback(
    (e: ChangeEvent<HTMLSelectElement>) => {
      setFromCurrency(e.target.value);
    },
    [],
  );

  const handleToCurrencyChange = useCallback(
    (e: ChangeEvent<HTMLSelectElement>) => {
      setToCurrency(e.target.value);
    },
    [],
  );

  const handleAmountChange = useCallback(
    (e: ChangeEvent<HTMLInputElement>) => {
      const { value } = e.target;
      // Допускаем только числа и точку
      if (/^\d*\.?\d*$/.test(value)) {
        setAmount(value);
      }
    },
    [],
  );

  const currencyOptions = useMemo(() => currencies.map((currency) => (
    <option key={currency.id} value={currency.symbol}>
      {currency.symbol}
      {currency.name ? ` - ${currency.name}` : ''}
    </option>
  )), [currencies]);

  useEffect(() => {
    if (currenciesStatus === 'idle') {
      dispatch(fetchCurrencies());
    }
  }, [currenciesStatus, dispatch]);

  useEffect(() => {
    localStorage.setItem('fromCurrency', fromCurrency);
  }, [fromCurrency]);

  useEffect(() => {
    localStorage.setItem('toCurrency', toCurrency);
  }, [toCurrency]);

  useEffect(() => {
    localStorage.setItem('amount', amount);
  }, [amount]);

  useEffect(() => {
    if (fromCurrency === toCurrency || !amount) {
      setResult('');
      return;
    }

    const from = currencies.find(
      (currency) => currency.symbol === fromCurrency,
    );
    const to = currencies.find((currency) => currency.symbol === toCurrency);

    if (from && to) {
      const fromRate = new Big(from.rateUsd);
      const toRate = new Big(to.rateUsd);
      const usdAmount = new Big(amount).times(fromRate);
      const convertedAmount = usdAmount.div(toRate);
      const commission = convertedAmount.times(0.03);
      const total = convertedAmount.plus(commission);

      // Округляем для FIAT валют
      const isToFiat = to.type === 'fiat';
      const formattedTotal = isToFiat
        ? total.round(2, Big.roundDown).toFixed(2)
        : total.toFixed(2);

      setResult(
        `${amount} ${fromCurrency} → ${formattedTotal} ${toCurrency} (${convertedAmount
          .toFixed(2)
        } ${toCurrency} + 3%)`,
      );
    }
  }, [fromCurrency, toCurrency, amount, currencies]);

  return (
    <div className={cls.convertPage}>
      <h2>Конвертация валют</h2>
      <StatusHandler status={currenciesStatus} error={error}>
        <form className={cls.form}>
          <div className={cls.inputGroup}>
            <label htmlFor="from">From:</label>
            <select
              id="from"
              value={fromCurrency}
              onChange={handleFromCurrencyChange}
            >
              {currencyOptions}
            </select>
          </div>
          <div className={cls.inputGroup}>
            <label htmlFor="to">To:</label>
            <select
              id="to"
              value={toCurrency}
              onChange={handleToCurrencyChange}
            >
              {currencyOptions}
            </select>
          </div>
          <div className={cls.inputGroup}>
            <label htmlFor="amount">Amount:</label>
            <input
              type="text"
              id="amount"
              value={amount}
              onChange={handleAmountChange}
              placeholder="Enter amount"
            />
          </div>
        </form>
      </StatusHandler>
      {result && <p className={cls.result}>{result}</p>}
    </div>
  );
};

export default ConvertPage;
