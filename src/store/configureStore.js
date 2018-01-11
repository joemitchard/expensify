import { createStore, combineReducers, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';

import ExpensesReducer from '../reducers/expenses';
import FiltersReducer from '../reducers/filters';
import AuthReducer from '../reducers/auth';

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

export default () => {
  const store = createStore(
    combineReducers({
      expenses: ExpensesReducer,
      filters: FiltersReducer,
      auth: AuthReducer
    }),
    composeEnhancers(applyMiddleware(thunk))
  );

  return store;
};
