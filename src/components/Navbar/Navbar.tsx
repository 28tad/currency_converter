import React from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { useAppSelector, useAppDispatch } from '@/app/store/hooks';
import { selectIsAuthenticated, logout } from '@/app/store/authSlice';
import cls from './Navbar.module.scss';

const Navbar: React.FC = () => {
  const isAuthenticated = useAppSelector(selectIsAuthenticated);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const handleLogout = () => {
    dispatch(logout());
    navigate('/login');
  };

  return (
    <nav className={cls.navbar}>
      <div className={cls.logo}>
        <NavLink to="/rates">Currency Converter</NavLink>
      </div>
      <ul className={cls.navLinks}>
        {isAuthenticated && (
          <>
            <li>
              <NavLink to="/rates" className={({ isActive }) => (isActive ? cls.active : '')}>
                Rates
              </NavLink>
            </li>
            <li>
              <NavLink to="/convert" className={({ isActive }) => (isActive ? cls.active : '')}>
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
          <NavLink to="/login">
            <button type="button">Login</button>
          </NavLink>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
