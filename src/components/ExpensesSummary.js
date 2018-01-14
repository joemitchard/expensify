import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import numeral from 'numeral';

import selectExpenses from '../selectors/expenses';
import getExpensesTotal from '../selectors/expenses-total';

export const ExpensesSummary = (props) => {
  const expensesWord = props.expensesCount === 1 ? 'expense' : 'expenses';
  const formattedTotal = numeral(props.expensesTotal / 100).format('$0,0.00')
  return (
    <div className="page-header">
      <div className="content-container">
        <h1 className="page-header__title">
          Viewing <span>{props.expensesCount}</span> {expensesWord} totaling <span>{formattedTotal}</span>.
        </h1>
        <div className="page-header__actions">
          <Link className="button" to="/create">Add Expense</Link>
        </div>
      </div>
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
