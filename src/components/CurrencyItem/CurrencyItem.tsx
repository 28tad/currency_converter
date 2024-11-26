import { Currency } from '@/app/store/types';
import { memo } from 'react';
import cls from './CurrencyItem.module.scss';

interface CurrencyItemProps {
  currency: Currency;
}

const CurrencyItem: React.FC<CurrencyItemProps> = ({ currency }) => (
  <tr className={cls.currencyRow}>
    <td>{currency.symbol}</td>
    <td>{Number(currency.rateUsd).toFixed(18)}</td>
  </tr>
);

export default memo(CurrencyItem);
