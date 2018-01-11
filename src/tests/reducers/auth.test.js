import authReducer from '../../reducers/auth';

test('should set default state', () => {
  const state = authReducer(undefined, { type: '@@INIT' });
  expect(state).toEqual({});
});

test('should set id on login', () => {
  const uid = '3494901f40a92a019';
  const action = {
    type: 'LOGIN',
    uid: uid
  };
  const state = authReducer({}, action);
  expect(state).toEqual({
    uid: uid
  });
});

test('should remove id on logout', () => {
  let state = {
    uid: '3494901f40a92a019'
  };
  const action = { type: 'LOGOUT' };
  state = authReducer(state, action);
  expect(state).toEqual({});
});
