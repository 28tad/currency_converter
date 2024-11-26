import { RouteProps } from 'react-router-dom';
import { RatesPageAsync as RatesPage } from '@/pages/Rates/RatesPage.async';
import { ConvertPage } from '@/pages/Convert/ConvertPage';
import { NotFoundPage } from '@/pages/NotFound/NotFoundPage';

export enum AppRoutes {
  RATES = 'rates',
  CONVERT = 'convert',
  NOT_FOUND = 'not_found',
}

export const RoutePath: Record<AppRoutes, string> = {
  [AppRoutes.RATES]: '/rates',
  [AppRoutes.CONVERT]: '/convert',
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
  [AppRoutes.NOT_FOUND]: {
    path: RoutePath.not_found,
    element: <NotFoundPage />,
  },
};
