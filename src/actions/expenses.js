import database from '../firebase/firebase';

// ADD_EXPENSE
export const addExpense = (expense) => ({
  type: 'ADD_EXPENSE',
  expense
});

// START_ADD_EXPENSE
// thunk
export const startAddExpense = (expenseData = {}) => {
  return (dispatch) => {
    // setup defaults
    const {
      description = '',
      note = '',
      amount = 0,
      createdAt = 0
    } = expenseData;

    const expense = { description, note, amount, createdAt };

    // Push data to database then dispatch event to add to store
    return database.ref('expenses').push(expense).then((ref) => {
      dispatch(addExpense({
        id: ref.key,
        ...expense
      }));
    });
  };
};

// REMOVE_EXPENSE
export const removeExpense = ({ id }) => ({
  type: 'REMOVE_EXPENSE',
  id: id
});

// EDIT_EXPENSE
export const editExpense = (id, updates) => ({
  type: 'EDIT_EXPENSE',
  id,
  updates
});
