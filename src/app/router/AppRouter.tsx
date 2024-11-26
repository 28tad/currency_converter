import { Suspense } from 'react';
import { Route, Routes } from 'react-router-dom';
import { PageLoader } from '@/components/common/PageLoader/PageLoader';
import PrivateRoute from '@/components/PrivateRoute/PrivateRoute';
import { routeConfig, AppRoutes } from './routeConfig';

function AppRouter() {
  return (
    <Routes>
      {Object.entries(routeConfig).map(([key, { element, path }]) => {
        if (key === AppRoutes.LOGIN || key === AppRoutes.NOT_FOUND) {
          return (
            <Route
              key={path}
              path={path}
              element={(
                <Suspense fallback={<PageLoader />}>
                  <div className="page-wrapper">{element}</div>
                </Suspense>
              )}
            />
          );
        }

        return (
          <Route
            key={path}
            path={path}
            element={(
              <PrivateRoute>
                <Suspense fallback={<PageLoader />}>
                  <div className="page-wrapper">{element}</div>
                </Suspense>
              </PrivateRoute>
            )}
          />
        );
      })}
    </Routes>
  );
}

export default AppRouter;
