import './index.css';
import React from 'react';
import ReactDOM from 'react-dom';
import { App } from './App';
import { ContractsProvider } from './context/ContractsProvider';

ReactDOM.render(
  <React.StrictMode>
    <ContractsProvider>
      <App />
    </ContractsProvider>
  </React.StrictMode>,
  document.getElementById('root')
);
