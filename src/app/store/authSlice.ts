import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { StateSchema } from './types';

interface LoginCredentials {
  username: string;
  password: string;
}

interface AuthState {
  isAuthenticated: boolean;
  user: { username: string } | null;
  error: string | null;
}

const initialState: AuthState = {
  isAuthenticated: !!localStorage.getItem('isAuthenticated'),
  user: localStorage.getItem('isAuthenticated') ? { username: 'deno' } : null,
  error: null,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    login(state, action: PayloadAction<LoginCredentials>) {
      const { username, password } = action.payload;
      if (username === 'deno' && password === 'deno') {
        state.isAuthenticated = true;
        state.user = { username };
        state.error = null;
        localStorage.setItem('isAuthenticated', 'true');
      } else {
        state.isAuthenticated = false;
        state.user = null;
        state.error = 'Неправильный логин или пароль';
      }
    },
    logout(state) {
      state.isAuthenticated = false;
      state.user = null;
      state.error = null;
      localStorage.removeItem('isAuthenticated');
    },
    clearError(state) {
      state.error = null;
    },
  },
});

export const { login, logout, clearError } = authSlice.actions;

export const selectIsAuthenticated = (state: StateSchema) => state.auth.isAuthenticated;
export const selectAuthError = (state: StateSchema) => state.auth.error;

export default authSlice.reducer;
