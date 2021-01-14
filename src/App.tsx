import React from 'react';
import Router from './components/routes/Router';
import { BrowserRouter } from 'react-router-dom';
import Theme from './components/Theme';
import Header from './components/header/Header';
import { Container } from '@material-ui/core';

function App() {
  return (
    <BrowserRouter>
      <Theme>
        <Header />
        <Container>
          <Router />
        </Container>
      </Theme>
    </BrowserRouter>

  );
}

export default App;
