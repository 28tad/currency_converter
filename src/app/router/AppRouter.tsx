import React, { Suspense } from 'react';
import { Route, Routes } from 'react-router-dom';
import { PageLoader } from '@/components/common/PageLoader/PageLoader';
import { routeConfig } from './routeConfig';

function AppRouter() {
  return (
    <Routes>
      {Object.values(routeConfig).map(({ element, path }) => (
        <Route
          key={path}
          path={path}
          element={(
            <Suspense fallback={<PageLoader />}>
              <div className="page-wrapper">{element}</div>
            </Suspense>
          )}
        />
      ))}
    </Routes>
  );
}

export default AppRouter;
