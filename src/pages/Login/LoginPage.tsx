import React, { useState, FormEvent } from 'react';
import { useAppDispatch, useAppSelector } from '@/app/store/hooks';
import { login, selectAuthError, clearError } from '@/app/store/authSlice';
import { useNavigate } from 'react-router-dom';
import { RoutePath } from '@/app/router/routeConfig';
import cls from './Login.module.scss';

export const LoginPage: React.FC = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const error = useAppSelector(selectAuthError);

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    dispatch(login({ username, password }));
  };

  const handleInputChange = () => {
    if (error) {
      dispatch(clearError());
    }
  };

  const isAuthenticated = useAppSelector((state) => state.auth.isAuthenticated);
  if (isAuthenticated) {
    navigate(RoutePath.rates);
  }

  return (
    <div className={cls.login}>
      <form onSubmit={handleSubmit} className={cls.form}>
        <h2>Login</h2>
        {error && <p className={cls.error}>{error}</p>}
        <div className={cls.inputGroup}>
          <label htmlFor="username">Username:</label>
          <input
            type="text"
            id="username"
            value={username}
            onChange={(e) => {
              setUsername(e.target.value);
              handleInputChange();
            }}
            required
          />
        </div>
        <div className={cls.inputGroup}>
          <label htmlFor="password">Password:</label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => {
              setPassword(e.target.value);
              handleInputChange();
            }}
            required
          />
        </div>
        <button type="submit">Login</button>
      </form>
    </div>
  );
};
