import { createStore, combineReducers } from 'redux';

import ExpensesReducer from '../reducers/expenses';
import FiltersReducer from '../reducers/filters';

export default () => {
  const store = createStore(
    combineReducers({
      expenses: ExpensesReducer,
      filters: FiltersReducer
    }),
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
  );

  return store;
};
