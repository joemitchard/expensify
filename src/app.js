import React from 'react';
import ReactDOM, { render } from 'react-dom';
import { Provider } from 'react-redux';

import AppRouter, { history } from './routers/AppRouter';
import configureStore from './store/configureStore';
import * as ExpensesActions from './actions/expenses';
import * as FiltersActions from './actions/filters';
import { startSetExpenses } from './actions/expenses';
import { login, logout } from './actions/auth';

import 'normalize.css/normalize.css';
import './styles/styles.scss';
import 'react-dates/lib/css/_datepicker.css';

import { firebase } from './firebase/firebase';

const store = configureStore();

const appRoot = document.getElementById('app');

const jsx = (
  <Provider store={store} >
    <AppRouter />
  </Provider>
);

let hasRendered = false;
const renderApp = () => {
  if (!hasRendered) {
    ReactDOM.render(jsx, appRoot);
    hasRendered = true;
  }
};

ReactDOM.render(<p>Loading...</p>, appRoot);

firebase.auth().onAuthStateChanged((user) => {
  if (user) {
    store.dispatch(login(user.uid));
    store.dispatch(startSetExpenses()).then(() => {
      renderApp();
      if (history.location.pathname === '/') {
        // came from login screen.
        history.push('/dashboard');
      }
    });
  } else {
    store.dispatch(logout());
    history.push('/');
    renderApp();
  }
});
