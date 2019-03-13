import React from 'react';
import ReactDOM from 'react-dom';
import {Provider} from 'react-redux';
import AppRouter, {history} from './routers/AppRouter';
import numeral from 'numeral';
import 'normalize.css/normalize.css';
import './styles/styles.scss';
import 'react-dates/lib/css/_datepicker.css';
import configStore from './redux/store';
import {firebase} from './firebase/firebase';
import {login, logout} from './redux/action/auth';
import {startSetMovimentacoes, startSetContas, startSetCartoes} from './redux/action/actions';

// Numeral config
numeral.register('locale', 'br', {
  delimiters: {
    thousands: '.',
    decimal: ','
  },
  currency: {
    symbol: 'R$'
  }
});

numeral.locale('br');

//Load App
const store = configStore();

const jsx = (
  <Provider store={store}>
    <AppRouter />
  </Provider>
);

let hasRendered = false;
const renderApp = () => {
  if(!hasRendered) {
    ReactDOM.render(jsx, document.getElementById('app'));
    hasRendered = true;
  }
};

ReactDOM.render(<p>Loading...</p>, document.getElementById('app'));

firebase.auth().onAuthStateChanged((user) => {
  if(user) {
    store.dispatch(login(user.uid));
    store.dispatch(startSetCartoes()).then(() => {
      store.dispatch(startSetContas()).then(() => {
        store.dispatch(startSetMovimentacoes()).then(() => {
          renderApp();
          if(history.location.pathname === "/") {
            history.push('/dashboard');
          }
        });
      });
    });     
  } else {
    store.dispatch(logout());
    renderApp();
    history.push('/');
  }
});