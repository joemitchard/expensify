import { login, logout } from '../../actions/auth';

test('should generate login action', () => {
  const uid = '3494901f40a92a019';
  const action = login(uid);
  expect(action).toEqual({
    type: 'LOGIN',
    uid: uid
  });
});

test('should generate logout action', () => {
  const action = logout();
  expect(action).toEqual({
    type: 'LOGOUT'
  });
});
