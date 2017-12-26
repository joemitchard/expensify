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

// Test

store.subscribe(() => {
  const state = store.getState();
  // const visibleExpenses = getVisibleExpenses(state.expenses, state.filters);

  console.log(state);
});

store.dispatch(ExpensesActions.addExpense({
  description: 'Water Bill',
  amount: 4500,
}));

store.dispatch(ExpensesActions.addExpense({
  description: 'Gas Bill',
  createdAt: 1000
}));

store.dispatch(ExpensesActions.addExpense({
  description: 'Rent',
  amount: 109500,
}));

