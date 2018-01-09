import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';

import database from '../../firebase/firebase';
import {
  addExpense,
  editExpense,
  removeExpense,
  setExpenses,
  startAddExpense,
  startSetExpenses,
  startRemoveExpense,
  startEditExpense
} from '../../actions/expenses';
import expenses from '../fixtures/expenses';

const createMockStore = configureMockStore([thunk]);

beforeEach((done) => {
  const expensesData = {};
  expenses.forEach(({ id, description, note, amount, createdAt }) => {
    expensesData[id] = { id, description, note, amount, createdAt }
  });
  database.ref('expenses').set(expensesData).then(() => {
    done();
  })
});

test('should setup add expense action object with provided values', () => {
  const action = addExpense(expenses[2]);
  expect(action).toEqual({
    type: 'ADD_EXPENSE',
    expense: expenses[2],
  });
});

test('should add expense to database and store', (done) => {
  const store = createMockStore({});
  const expenseData = {
    description: 'Mouse',
    amount: 3000,
    note: 'This one is better',
    createdAt: 1000
  };
  store.dispatch(startAddExpense(expenseData)).then(() => {
    const actions = store.getActions();
    const action = actions[0];
    expect(action).toEqual({
      type: 'ADD_EXPENSE',
      expense: {
        id: expect.any(String),
        ...expenseData
      }
    });
    // returns a promise
    return database.ref(`expenses/${action.expense.id}`).once('value');
  }).then((snapshot) => {
    expect(snapshot.val()).toEqual(expenseData);
    // tell jest that async test is done
    done();
  });
});

test('should add expense with defaults to database and store', (done) => {
  const store = createMockStore({});
  const expenseDefaults = {
    description: '',
    note: '',
    amount: 0,
    createdAt: 0
  };
  store.dispatch(startAddExpense()).then(() => {
    const actions = store.getActions({});
    const action = actions[0];
    expect(action).toEqual({
      type: 'ADD_EXPENSE',
      expense: {
        id: expect.any(String),
        ...expenseDefaults
      }
    });
    // returns a promise
    return database.ref(`expenses/${action.expense.id}`).once('value');
  }).then((snapshot) => {
    expect(snapshot.val()).toEqual(expenseDefaults);
    // tell jest that async test is done
    done();
  });
});

test('should setup edit expense action object', () => {
  const action = editExpense('123abc', { note: 'new note value' });
  expect(action).toEqual({
    type: 'EDIT_EXPENSE',
    id: '123abc',
    updates: {
      note: 'new note value'
    }
  });
});

test('should setup on firebase', (done) => {
  const store = createMockStore();
  const expense = expenses[0];
  const updates = { note: 'this is new' };
  store.dispatch(startEditExpense(expense.id, updates)).then(() => {
    const actions = store.getActions();
    expect(actions[0]).toEqual({
      type: 'EDIT_EXPENSE',
      id: expense.id,
      updates: updates
    });
    return database.ref(`expenses/${expense.id}`).once('value');
  }).then((snapshot) => {
    expect(snapshot.val()).toEqual({
      ...expense,
      ...updates
    });
    done();
  });
});

test('should setup remove expense action object', () => {
  const action = removeExpense({ id: '123abc' });
  expect(action).toEqual({
    type: 'REMOVE_EXPENSE',
    id: '123abc'
  });
});

test('should remove expense from firebase', (done) => {
  const store = createMockStore();
  const id = expenses[2].id;
  store.dispatch(startRemoveExpense({ id })).then(() => {
    const actions = store.getActions();
    expect(actions[0]).toEqual({
      type: 'REMOVE_EXPENSE',
      id: id
    });
    return database.ref(`expenses/${id}`).once('value');
  }).then((snapshot) => {
    expect(snapshot.val()).toBeFalsy();
    done();
  });
});

test('should setup set expenses action object with data', () => {
  const action = setExpenses(expenses);
  expect(action).toEqual({
    type: 'SET_EXPENSES',
    expenses: expenses
  });
});

test('should fetch expenses from firebase', (done) => {
  const store = createMockStore({});
  store.dispatch(startSetExpenses()).then(() => {
    const actions = store.getActions();
    expect(actions[0]).toEqual({
      type: 'SET_EXPENSES',
      expenses
    });
    done();
  });
});
