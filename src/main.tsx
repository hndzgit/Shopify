import {StrictMode} from 'react';
import {createRoot} from 'react-dom/client';
import App from './App.tsx';
import './index.css';
import { Navbar, CartDrawer } from './components/layout/Navigation';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <Navbar />
    <App />
    <CartDrawer />
  </StrictMode>,
);
