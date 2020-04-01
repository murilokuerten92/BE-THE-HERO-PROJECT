import React, { Fragment } from 'react';

import './global.css';

import Routes from './routes';

//useState retorna um array com [valor, e a função que altera o valor]
function App() {
  return (
    <Fragment>
      <Routes />
    </Fragment>
  );
}

export default App;
