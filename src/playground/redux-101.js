import { createStore } from 'redux';

// Action Generators -> functions that return action objects

// Destructure payload and default it to 1
const incrementCount = ({ incrementBy = 1 } = {}) => ({
  type: 'INCREMENT',
  incrementBy
});

const decrementCount = ({ decrementBy = 1 } = {}) => ({
  type: 'DECREMENT',
  decrementBy
});

const resetCount = () => ({
  type: 'RESET'
});

const setCount = ({ count }) => ({
  type: 'SET',
  count
});

// Reducer
// 1 -> Reducers are pure functions. No side effects.
// 2 -> Never change the state or action. Readonly args.
const countReducer = (state = { count: 0 }, action) => {
  switch (action.type) {
    case 'INCREMENT':
      return {
        count: state.count + action.incrementBy
      };

    case 'DECREMENT':
      return {
        count: state.count - action.decrementBy
      };

    case 'SET':
      return {
        count: action.count
      };

    case 'RESET':
      return {
        count: 0
      };

    default:
      return state;
  }
};

// create store function takes a function with default state
// this returns the state
// is called every time an action is dispatched with new state
const store = createStore(countReducer);

// Subsribe to the store and trigger callback on change
// this returns a function you can call when you want to unsubscribe
const unsubscribe = store.subscribe(() => {
  console.log(store.getState());
})

// Action - an object that gets sent to the store 

// I'd like to increment the count
store.dispatch(incrementCount({ incrementBy: 5 }));

store.dispatch(incrementCount());

// I'd like to reset the count
store.dispatch(resetCount());

// I'd like to decrement the count
store.dispatch(decrementCount());
store.dispatch(decrementCount({ decrementBy: 10 }));


store.dispatch(setCount({ count: 101 }))

unsubscribe();
