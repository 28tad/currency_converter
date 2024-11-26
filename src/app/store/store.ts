import { configureStore } from '@reduxjs/toolkit';
import currenciesReducer from './currenciesSlice';
import { StateSchema } from './types';

export function createReduxStore(initalState?: StateSchema) {
  return configureStore<StateSchema>({
    reducer: {
      currencies: currenciesReducer,
    },
    devTools: __IS_DEV__,
    preloadedState: initalState,
  });
}

export type AppDispatch = ReturnType<typeof createReduxStore>['dispatch'];
