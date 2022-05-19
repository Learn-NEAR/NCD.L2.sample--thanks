import './App.css';
import React from 'react';
import { HomePage } from './pages/HomePage';
import { ToastProvider } from 'react-toast-notifications';

export const App = () => {
  return (
    <ToastProvider>
      <HomePage />
    </ToastProvider>
  );
};
