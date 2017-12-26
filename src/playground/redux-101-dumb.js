import { createStore } from 'redux';

// dumb action creator
const incrementCount = ({ payload } = {}) => ({
  type: 'INCREMENT',
  incrementBy: typeof payload.incrementBy === 'number' ? payload.incrementBy : 1
});

// create store function takes a function with default state
// this returns the state
// is called every time an action is dispatched with new state
const store = createStore((state = { count: 0 }, action) => {

  switch (action.type) {
    case 'INCREMENT':
      const incrementBy =
        typeof action.incrementBy === 'number'
          ? action.incrementBy
          : 1;

      return {
        count: state.count + incrementBy
      };

    case 'DECREMENT':
      const decrementBy =
        typeof action.decrementBy === 'number'
          ? action.decrementBy
          : 1;

      return {
        count: state.count - decrementBy
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
});

// Subsribe to the store and trigger callback on change
// this returns a function you can call when you want to unsubscribe
const unsubscribe = store.subscribe(() => {
  console.log(store.getState());
})

// Action - an object that gets sent to the store 

// I'd like to increment the count
store.dispatch({
  type: 'INCREMENT',
  incrementBy: 5
});

store.dispatch({
  type: 'INCREMENT'
});

// I'd like to reset the count
store.dispatch({
  type: 'RESET'
});

// I'd like to decrement the count
store.dispatch({
  type: 'DECREMENT',
  decrementBy: 10
});

store.dispatch({
  type: 'DECREMENT'
});

store.dispatch({
  type: 'SET',
  count: 100
})

unsubscribe();
