import React from 'react';
import { classNames } from '@/lib/classNames';
import cls from './Pagination.module.scss';

interface PaginationProps {
  totalItems: number;
  currentPage: number;
  perPage: number;
  onPageChange: (newPage: number) => void;
}

const Pagination: React.FC<PaginationProps> = ({
  totalItems,
  currentPage,
  perPage,
  onPageChange,
}) => {
  const totalPages = Math.ceil(totalItems / perPage);

  const pages: number[] = [];
  for (let i = 1; i <= totalPages; i++) {
    pages.push(i);
  }

  return (
    <div className={cls.pagination}>
      {pages.map((pageNumber) => (
        <button
          type="button"
          key={pageNumber}
          className={classNames(cls.pageButton, {
            [cls.active]: pageNumber === currentPage,
          })}
          onClick={() => onPageChange(pageNumber)}
        >
          {pageNumber}
        </button>
      ))}
    </div>
  );
};

export default Pagination;
