import React, { useCallback } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { useAppSelector, useAppDispatch } from '@/app/store/hooks';
import { selectIsAuthenticated, logout } from '@/app/store/authSlice';
import { RoutePath } from '@/app/router/routeConfig';
import cls from './Navbar.module.scss';

const Navbar: React.FC = () => {
  const isAuthenticated = useAppSelector(selectIsAuthenticated);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const handleLogout = useCallback(() => {
    dispatch(logout());
    navigate(RoutePath.login);
  }, [dispatch, navigate]);

  return (
    <nav className={cls.navbar}>
      <div className={cls.logo}>
        <NavLink to={RoutePath.rates}>Currency Converter</NavLink>
      </div>
      <ul className={cls.navLinks}>
        {isAuthenticated && (
          <>
            <li>
              <NavLink to={RoutePath.rates} className={({ isActive }) => (isActive ? cls.active : '')}>
                Rates
              </NavLink>
            </li>
            <li>
              <NavLink to={RoutePath.convert} className={({ isActive }) => (isActive ? cls.active : '')}>
                Convert
              </NavLink>
            </li>
          </>
        )}
      </ul>
      <div className={cls.authButton}>
        {isAuthenticated ? (
          <button type="button" onClick={handleLogout}>Logout</button>
        ) : (
          <NavLink to={RoutePath.login}>
            <button type="button">Login</button>
          </NavLink>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
