import React from 'react';
import { connect } from 'react-redux';
import ExpenseListItem from './ExpenseListItem';
import selectExpenses from '../selectors/expenses';

export const ExpenseList = (props) => (
  <div>
    {props.expenses.length === 0
      ? (<p>No expenses</p>)
      : (
        props.expenses.map((expense) => (
          <ExpenseListItem key={expense.id} {...expense} />
        ))
      )
    }
  </div>
);

// take a subset of the redux store for props
const mapStateToProps = (state) => {
  return {
    expenses: selectExpenses(state.expenses, state.filters)
  }
};

// Connect returns a function that takes the param of the child component
// returns connected component with selected subset of state
// rerendered every time the store is updated
export default connect(mapStateToProps)(ExpenseList);

