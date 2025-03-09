import './index.css';

import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { App } from './app';
import { AuthProvider } from './contexts/auth-context/provider';
import { QueryProvider } from './contexts/query-context/provider';
import { Toaster } from './components/common/sonner';

// eslint-disable-next-line @typescript-eslint/no-non-null-assertion -- root exist in html
const rootElement = document.getElementById('root')!;
if (!rootElement.innerHTML) {
  const root = createRoot(rootElement);
  root.render(
    <StrictMode>
      <AuthProvider>
        <QueryProvider>
          <App />
          <Toaster richColors />
        </QueryProvider>
      </AuthProvider>
    </StrictMode>,
  );
}
