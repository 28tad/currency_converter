import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import axios from 'axios';
import {
  Currency,
  CurrenciesState,
  StateSchema,
  PaginationState,
  SortState,
} from './types';

export const fetchCurrencies = createAsyncThunk<
Currency[],
void,
{ rejectValue: string }
>('currencies/fetchCurrencies', async (_, { rejectWithValue }) => {
  try {
    const response = await axios.get('https://api.coincap.io/v2/rates');
    return response.data.data;
  } catch (error: unknown) {
    let errorMessage = 'Unknown error';

    if (axios.isAxiosError(error) && error.response) {
      errorMessage = error.response.data?.message || error.message;
    } else if (error instanceof Error) {
      errorMessage = error.message;
    }

    return rejectWithValue(errorMessage);
  }
});

const initialState: CurrenciesState = {
  currencies: [],
  status: 'idle',
  error: null,
  pagination: {
    page: 1,
    perPage: 10,
  },
  sort: {
    field: 'rateUsd',
    direction: 'desc',
  },
  lastUpdated: null,
};

const currenciesSlice = createSlice({
  name: 'currencies',
  initialState,
  reducers: {
    setPagination(state, action: PayloadAction<PaginationState>) {
      state.pagination = action.payload;
    },
    setSort(state, action: PayloadAction<SortState>) {
      state.sort = action.payload;
    },
    updateCurrency(state, action: PayloadAction<Currency>) {
      const updatedCurrency = action.payload;
      const index = state.currencies.findIndex(
        (currency) => currency.id === updatedCurrency.id,
      );
      if (index !== -1) {
        state.currencies[index] = updatedCurrency;
      }
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchCurrencies.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(
        fetchCurrencies.fulfilled,
        (state, action: PayloadAction<Currency[]>) => {
          state.status = 'succeeded';
          state.currencies = action.payload;
          state.lastUpdated = Date.now();
        },
      )
      .addCase(fetchCurrencies.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload || 'Ошибка при загрузке валют';
      });
  },
});

export const { setPagination, setSort, updateCurrency } = currenciesSlice.actions;

export const selectAllCurrencies = (state: StateSchema) => state.currencies.currencies;
export const selectCurrenciesStatus = (state: StateSchema) => state.currencies.status;
export const selectCurrenciesError = (state: StateSchema) => state.currencies.error;
export const selectPagination = (state: StateSchema) => state.currencies.pagination;
export const selectSort = (state: StateSchema) => state.currencies.sort;
export const selectLastUpdated = (state: StateSchema) => state.currencies.lastUpdated;

export default currenciesSlice.reducer;
