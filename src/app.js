import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';

import AppRouter from './routers/AppRouter';
import configureStore from './store/configureStore';
import * as ExpensesActions from './actions/expenses';
import * as FiltersActions from './actions/filters';
import getVisibleExpenses from './selectors/expenses';

import 'normalize.css/normalize.css';
import './styles/styles.scss';
import 'react-dates/lib/css/_datepicker.css';


const store = configureStore();

const appRoot = document.getElementById('app');

const jsx = (
  <Provider store={store} >
    <AppRouter />
  </Provider>
)

ReactDOM.render(jsx, appRoot);
