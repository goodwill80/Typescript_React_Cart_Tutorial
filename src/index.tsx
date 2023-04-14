import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
// Import React-query
import { QueryClient, QueryClientProvider } from 'react-query';

// Initite react-query client
const client = new QueryClient();

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <QueryClientProvider client={client}>
    <App />
  </QueryClientProvider>
);
