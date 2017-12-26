import React from 'react';
import { shallow } from 'enzyme';
import moment from 'moment';

import { ExpenseListFilters } from '../../components/ExpenseListFilters';
import { filters, altFilters } from '../fixtures/filters';

let wrapper, setTextFilter, sortByDate, sortByAmount, setStartDate, setEndDate;

beforeEach(() => {
  setTextFilter = jest.fn();
  sortByDate = jest.fn();
  sortByAmount = jest.fn();
  setStartDate = jest.fn();
  setEndDate = jest.fn();
  wrapper = shallow(
    <ExpenseListFilters
      filters={filters}
      setTextFilter={setTextFilter}
      sortByDate={sortByDate}
      sortByAmount={sortByAmount}
      setStartDate={setStartDate}
      setEndDate={setEndDate}
    />
  );
});

test('should render ExpenseListFilters correctly', () => {
  expect(wrapper).toMatchSnapshot();
});

test('should render ExpenseListFilters with alt data correctly', () => {
  wrapper.setProps({ 'filters': altFilters })
  expect(wrapper).toMatchSnapshot();
});

test('should handle text change', () => {
  const value = 'test';
  wrapper.find('input').at(0).simulate('change', {
    target: { value: value }
  });
  expect(setTextFilter).toHaveBeenLastCalledWith(value);
});

test('should handle text change', () => {
  const value = 'test';
  wrapper.find('input').at(0).simulate('change', {
    target: { value: value }
  });
  expect(setTextFilter).toHaveBeenLastCalledWith(value);
});

test('should sort by date', () => {
  const sortBy = 'date';
  wrapper.setProps({ filters: altFilters });
  wrapper.find('select').simulate('change', {
    target: { value: sortBy }
  });
  expect(sortByDate).toHaveBeenCalled();
});

test('should sort by amount', () => {
  const sortBy = 'amount';
  wrapper.find('select').simulate('change', {
    target: { value: sortBy }
  });
  expect(sortByAmount).toHaveBeenCalled();
});

test('should handle date changes', () => {
  const startDate = moment();
  const endDate = moment().add(1, 'months');
  wrapper.find('DateRangePicker').prop('onDatesChange')({ startDate, endDate });
  expect(setStartDate).toHaveBeenLastCalledWith(startDate);
  expect(setEndDate).toHaveBeenLastCalledWith(endDate);
});

test('should handle focus changes', () => {
  const startDateFocused = 'startDate';
  wrapper.find('DateRangePicker').prop('onFocusChange')(startDateFocused);
  expect(wrapper.state('calenderFocused')).toBe(startDateFocused);

  const endDateFocused = 'endDate';
  wrapper.find('DateRangePicker').prop('onFocusChange')(endDateFocused);
  expect(wrapper.state('calenderFocused')).toBe(endDateFocused);
});
