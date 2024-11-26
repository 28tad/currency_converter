export interface Currency {
  id: string;
  symbol: string;
  currencySymbol: string;
  type: string;
  rateUsd: string;
  name: string;
}

export interface PaginationState {
  page: number;
  perPage: number;
}

export interface SortState {
  field: string | null;
  direction: 'asc' | 'desc' | null;
}

export interface CurrenciesState {
  currencies: Currency[];
  status: 'idle' | 'loading' | 'succeeded' | 'failed';
  error: string | null;
  pagination: PaginationState;
  sort: SortState;
  lastUpdated: number | null;
}

export interface AuthState {
  isAuthenticated: boolean;
  user: { username: string } | null;
  error: string | null;
}

export interface StateSchema {
  currencies: CurrenciesState;
  auth: AuthState;
}

export type StateSchemaKey = keyof StateSchema;
