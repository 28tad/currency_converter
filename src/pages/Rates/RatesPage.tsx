import { useEffect, useMemo } from 'react';
import { useSelector } from 'react-redux';
import { useAppDispatch } from '@/app/store/hooks';
import {
  fetchCurrencies,
  selectAllCurrencies,
  selectCurrenciesStatus,
  selectCurrenciesError,
  selectPagination,
  setPagination,
  selectSort,
  setSort,
} from '@/app/store/currenciesSlice';
import { Currency } from '@/app/store/types';
import { Loader } from '@/components/common/Loader/Loader';
import { CurrencyItem } from '@/components/CurrencyItem/CurrencyItem';
import Pagination from '@/components/common/Pagination/Pagination';
import cls from './RatesPage.module.scss';

const Home = () => {
  const dispatch = useAppDispatch();

  const currencies = useSelector(selectAllCurrencies);
  const status = useSelector(selectCurrenciesStatus);
  const error = useSelector(selectCurrenciesError);
  const pagination = useSelector(selectPagination);
  const sort = useSelector(selectSort);

  useEffect(() => {
    if (status === 'idle') {
      dispatch(fetchCurrencies());
    }

    const intervalId = setInterval(() => {
      dispatch(fetchCurrencies());
    }, 30000);

    return () => clearInterval(intervalId);
  }, [status, dispatch]);

  const displayedCurrencies = useMemo(() => {
    const data = [...currencies];

    if (sort.field) {
      data.sort((a: Currency, b: Currency) => {
        const fieldA = parseFloat(a[sort.field as keyof Currency] as string);
        const fieldB = parseFloat(b[sort.field as keyof Currency] as string);
        if (sort.direction === 'asc') {
          return fieldA - fieldB;
        }
        return fieldB - fieldA;
      });
    }

    return data;
  }, [currencies, sort]);

  const { page, perPage } = pagination;
  const startIndex = (page - 1) * perPage;
  const endIndex = startIndex + perPage;
  const paginatedCurrencies = displayedCurrencies.slice(startIndex, endIndex);

  const handlePerPageChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const newPerPage = parseInt(e.target.value, 10);
    dispatch(setPagination({ page: 1, perPage: newPerPage }));
    localStorage.setItem('perPage', newPerPage.toString());
  };

  const handleSortChange = (field: string) => {
    let direction: 'asc' | 'desc' = 'asc';
    if (sort.field === field && sort.direction === 'asc') {
      direction = 'desc';
    }
    dispatch(setSort({ field, direction }));
  };

  useEffect(() => {
    const savedPerPage = parseInt(localStorage.getItem('perPage') || '10', 10);
    dispatch(setPagination({ ...pagination, perPage: savedPerPage }));
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dispatch]);

  let arrow = '';

  if (sort.field === 'rateUsd') {
    if (sort.direction === 'asc') {
      arrow = '↑';
    } else {
      arrow = '↓';
    }
  }

  return (
    <div className={cls.home}>
      {status === 'loading' && <Loader />}
      {status === 'failed' && (
      <p>
        Ошибка:
        {error}
      </p>
      )}
      {status === 'succeeded' && (
        <>
          <div className={cls.controls}>
            <select value={pagination.perPage} onChange={handlePerPageChange}>
              <option value={10}>10</option>
              <option value={25}>25</option>
              <option value={50}>50</option>
              <option value={100}>100</option>
            </select>
            <button type="button" onClick={() => dispatch(fetchCurrencies())}>
              Обновить данные
            </button>
          </div>
          <table className={cls.table}>
            <thead>
              <tr>
                <th>Валюта</th>
                <th onClick={() => handleSortChange('rateUsd')}>
                  Курс (USD)
                  {' '}
                  {arrow}
                </th>
              </tr>
            </thead>
            <tbody>
              {paginatedCurrencies.map((currency) => (
                <CurrencyItem key={currency.id} currency={currency} />
              ))}
            </tbody>
          </table>
          <Pagination
            totalItems={displayedCurrencies.length}
            currentPage={pagination.page}
            perPage={pagination.perPage}
            onPageChange={(newPage) => dispatch(setPagination({ ...pagination, page: newPage }))}
          />
        </>
      )}
    </div>
  );
};

export default Home;
