import React from 'react';
import { connect } from 'react-redux';
import numeral from 'numeral';

import selectExpenses from '../selectors/expenses';
import getExpensesTotal from '../selectors/expenses-total';

export const ExpensesSummary = (props) => {
  const expensesWord = props.expensesCount === 1 ? 'expense' : 'expenses';
  const formattedTotal = numeral(props.expensesTotal / 100).format('$0,0.00')
  return (
    <div>
      <h1>Viewing {props.expensesCount} {expensesWord} totaling {formattedTotal}.</h1>
    </div>
  )
};

const mapStateToProps = (state) => {
  const selectedExpenses = selectExpenses(state.expenses, state.filters);

  return {
    expensesCount: selectedExpenses.length,
    expensesTotal: getExpensesTotal(selectedExpenses)
  };
}

export default connect(mapStateToProps)(ExpensesSummary);
