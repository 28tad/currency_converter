import React, { useEffect, useMemo, useCallback } from 'react';
import { useAppDispatch, useAppSelector } from '@/app/store/hooks';
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
import { Currency, SortState } from '@/app/store/types';
import { Loader } from '@/components/common/Loader/Loader';
import CurrencyItem from '@/components/CurrencyItem/CurrencyItem';
import Pagination from '@/components/common/Pagination/Pagination';
import Big from 'big.js';
import cls from './RatesPage.module.scss';

const SORT_FIELD_RATE_USD = 'rateUsd';

throw new Error();

const Rates: React.FC = () => {
  const dispatch = useAppDispatch();

  const currencies = useAppSelector(selectAllCurrencies);
  const status = useAppSelector(selectCurrenciesStatus);
  const error = useAppSelector(selectCurrenciesError);
  const pagination = useAppSelector(selectPagination);
  const sort = useAppSelector(selectSort);

  const sortCurrencies = useCallback((data: Currency[], sortState: SortState): Currency[] => {
    if (sortState.field) {
      return data.sort((a, b) => {
        const fieldA = new Big(a[sortState.field as keyof Currency] as string);
        const fieldB = new Big(b[sortState.field as keyof Currency] as string);
        if (sortState.direction === 'asc') {
          return fieldA.cmp(fieldB);
        }
        return fieldB.cmp(fieldA);
      });
    }
    return data;
  }, []);

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
    return sortCurrencies(data, sort);
  }, [currencies, sort, sortCurrencies]);

  const { page, perPage } = pagination;
  const startIndex = (page - 1) * perPage;
  const endIndex = startIndex + perPage;

  const paginatedCurrencies = useMemo(
    () => displayedCurrencies.slice(startIndex, endIndex),
    [displayedCurrencies, startIndex, endIndex],
  );

  const handlePerPageChange = useCallback((e: React.ChangeEvent<HTMLSelectElement>) => {
    const newPerPage = parseInt(e.target.value, 10);
    dispatch(setPagination({ page: 1, perPage: newPerPage }));
    localStorage.setItem('perPage', newPerPage.toString());
  }, [dispatch]);

  const handleSortChange = useCallback((field: string) => {
    let direction: 'asc' | 'desc' = 'asc';
    if (sort.field === field && sort.direction === 'asc') {
      direction = 'desc';
    }
    dispatch(setSort({ field, direction }));
  }, [dispatch, sort.field, sort.direction]);

  const handlePageChange = useCallback((newPage: number) => {
    dispatch(setPagination({ ...pagination, page: newPage }));
  }, [dispatch, pagination]);

  useEffect(() => {
    const savedPerPage = parseInt(localStorage.getItem('perPage') || '10', 10);
    if (savedPerPage !== perPage) {
      dispatch(setPagination({ ...pagination, perPage: savedPerPage }));
    }
  }, [dispatch, pagination, perPage]);

  const sortArrow = useMemo(() => {
    if (sort.field === SORT_FIELD_RATE_USD) {
      return sort.direction === 'asc' ? '↑' : '↓';
    }
    return '';
  }, [sort.field, sort.direction]);

  return (
    <div className={cls.home}>
      <h1>Список курсов валют</h1>
      {status === 'loading' && <Loader />}
      {status === 'failed' && (
        <p>
          Ошибка:
          {' '}
          {error}
        </p>
      )}
      {status === 'succeeded' && (
        <>
          <div className={cls.controls}>
            <select value={perPage} onChange={handlePerPageChange}>
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
                <th onClick={() => handleSortChange(SORT_FIELD_RATE_USD)}>
                  Курс (USD)
                  {' '}
                  {sortArrow}
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
            currentPage={page}
            perPage={perPage}
            onPageChange={handlePageChange}
          />
        </>
      )}
    </div>
  );
};

export default Rates;
