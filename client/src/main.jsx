import 'bootstrap/dist/css/bootstrap.min.css';
import './index.css'
build.chunkSizeWarningLimit = 1000;
// import Payment from './payment';
import React from 'react'
import ReactDOM from 'react-dom/client'

import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import {store, newStore} from './store';

import App from './App.jsx'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Provider store={store} >
      <PersistGate loading={null} persistor={newStore} >

    <App />
    {/* <Payment/> */}
    </PersistGate>
    </Provider>
  </React.StrictMode>
);
