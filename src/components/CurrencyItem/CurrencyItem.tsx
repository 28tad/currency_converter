import { Currency } from '@/app/store/types';
import cls from './CurrencyItem.module.scss';

interface CurrencyItemProps {
  currency: Currency;
}

export function CurrencyItem({ currency }: CurrencyItemProps) {
  return (
    <tr className={cls.currencyRow}>
      <td>{currency.symbol}</td>
      <td>{Number(currency.rateUsd).toFixed(18)}</td>
    </tr>
  );
}
