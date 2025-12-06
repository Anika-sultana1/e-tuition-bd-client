import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { RouterProvider } from "react-router/dom";
import { router } from './Routes/Router.jsx';
import AuthProvider from './Pages/Auth/AuthProvider/AuthProvider.jsx';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

const queryClient = new QueryClient()

createRoot(document.getElementById('root')).render(

  <StrictMode>
  <QueryClientProvider client={queryClient}>
        <AuthProvider>
        <RouterProvider router={router} />
      </AuthProvider>
  </QueryClientProvider>
  </StrictMode>,
)
