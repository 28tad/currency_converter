import { ReactNode } from 'react';
import { Provider } from 'react-redux';
import { createReduxStore } from './store';
import { StateSchema } from './types';

interface StoreProviderProps {
  children: ReactNode;
  initialState?: StateSchema;
}

export function StoreProvider(props: StoreProviderProps) {
  const { children, initialState } = props;

  const store = createReduxStore(initialState);

  return <Provider store={store}>{children}</Provider>;
}
