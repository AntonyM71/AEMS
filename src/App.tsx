import React from 'react';
import './App.css';
import Router from './components/routes/Router';
import { BrowserRouter } from 'react-router-dom';

function App() {
  return (
    <BrowserRouter>
    <Router />
    </BrowserRouter>
  );
}

export default App;
