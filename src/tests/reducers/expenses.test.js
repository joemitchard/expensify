import expensesReducer from '../../reducers/expenses';
import expenses from '../fixtures/expenses';

test('should set default state', () => {
  const state = expensesReducer(undefined, { type: '@@INIT' });
  expect(state).toEqual([]);
});

test('should remove expense by id', () => {
  const action = {
    type: 'REMOVE_EXPENSE',
    id: expenses[1].id
  };
  const state = expensesReducer(expenses, action);
  expect(state).toEqual([
    expenses[0],
    expenses[2]
  ]);
});

test('should not remove anything with invalid id', () => {
  const action = {
    type: 'REMOVE_EXPENSE',
    id: 'not-an-id'
  };
  const state = expensesReducer(expenses, action);
  expect(state).toEqual(expenses);
});

test('should add an expense', () => {
  const newExpense = {
    description: 'New Expense',
    note: '',
    amount: 27000,
    createdAt: 0
  };
  const action = {
    type: 'ADD_EXPENSE',
    expense: newExpense
  };
  const state = expensesReducer(expenses, action);
  expect(state).toEqual([
    ...expenses,
    newExpense
  ]);
});

test('should edit an expense', () => {
  const amount = 320301931;
  const action = {
    type: 'EDIT_EXPENSE',
    id: expenses[0].id,
    updates: {
      amount: amount
    }
  };
  const state = expensesReducer(expenses, action);
  expect(state[0].amount).toBe(amount);
});

test('should not edit expense if not found', () => {
  const action = {
    type: 'EDIT_EXPENSE',
    id: 'not-an-id',
    updates: {
      amount: 101010101
    }
  };
  const state = expensesReducer(expenses, action);
  expect(state).toEqual(expenses);
});

test('should set expenses', () => {
  const action = {
    type: 'SET_EXPENSES',
    expenses: [expenses[1]]
  };
  const state = expensesReducer(expenses, action);
  expect(state).toEqual([expenses[1]]);
});
