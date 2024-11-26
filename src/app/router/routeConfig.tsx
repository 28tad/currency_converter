import { RouteProps } from 'react-router-dom';
import { RatesPageAsync as RatesPage } from '@/pages/Rates/RatesPage.async';
import { ConvertPageAsync as ConvertPage } from '@/pages/Convert/ConvertPage.async';
import { NotFoundPage } from '@/pages/NotFound/NotFoundPage';
import { LoginPage } from '@/pages/Login/LoginPage';

export enum AppRoutes {
  RATES = 'rates',
  CONVERT = 'convert',
  LOGIN = 'login',
  NOT_FOUND = 'not_found',
}

export const RoutePath: Record<AppRoutes, string> = {
  [AppRoutes.RATES]: '/',
  [AppRoutes.CONVERT]: '/convert',
  [AppRoutes.LOGIN]: '/login',
  [AppRoutes.NOT_FOUND]: '*',
};

export const routeConfig: Record<AppRoutes, RouteProps> = {
  [AppRoutes.RATES]: {
    path: RoutePath.rates,
    element: <RatesPage />,
  },
  [AppRoutes.CONVERT]: {
    path: RoutePath.convert,
    element: <ConvertPage />,
  },
  [AppRoutes.LOGIN]: {
    path: RoutePath.login,
    element: <LoginPage />,
  },
  [AppRoutes.NOT_FOUND]: {
    path: RoutePath.not_found,
    element: <NotFoundPage />,
  },
};
