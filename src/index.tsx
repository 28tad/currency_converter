import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import App from './app/App';
import { StoreProvider } from './app/store/StoreProvider';
import './index.scss';

const rootElement = document.getElementById('root');

if (!rootElement) {
  throw new Error('Root element not found');
}

const root = ReactDOM.createRoot(rootElement);

root.render(
  <StoreProvider>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </StoreProvider>,
);
