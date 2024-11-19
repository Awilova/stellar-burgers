import { expect } from '@jest/globals';
import { initialState, userReducer } from './user-slice';
import {
  getUser,
  getUserOrders,
  logoutUser,
  updateUser,
  loginUser,
  regUser
} from '../thunk/user-thunk';

describe('Тест слайса user', () => {
  let store: any;

  const user = {
    user: {
      name: 'Anastasia',
      email: 'Anastasia@email.ru'
    }
  };

  const orders = [
    {
      name: 'test',
      status: 'test',
      number: 1,
      createdAt: 'test',
      updatedAt: 'test',
      _id: '1',
      ingredients: ['1', '2']
    },
    {
      name: 'test',
      status: 'test',
      number: 2,
      createdAt: 'test',
      updatedAt: 'test',
      _id: '2',
      ingredients: ['1', '2']
    }
  ];

  test('проверка fulfilled при регистрации нового пользователя', () => {
    const getUserFulfilled = {
      ...initialState,
      isAuth: true,
      isAuthChecked: true,
      user: user.user,
      error: ''
    };

    const action = {
      type: getUser.fulfilled.type,
      payload: user
    };

    expect(userReducer(initialState, action)).toStrictEqual(getUserFulfilled);
  });

  test('проверка fulfilled при авторизации пользователя', () => {
    const mockedPayload = {
      accessToken: 'testToken',
      refreshToken: 'testToken',
      user: user,
      success: true
    };

    const loginUserFulfilled = {
      ...initialState,
      isAuthChecked: true,
      isAuth: true,
      user: user,
      request: false,
      error: mockedPayload.success ? '' : 'Ошибка авторизации'
    };

    const action = {
      type: loginUser.fulfilled.type,
      payload: mockedPayload
    };

    expect(userReducer(initialState, action)).toStrictEqual(loginUserFulfilled);
  });

  test('проверка fulfilled при регистрации пользователя', () => {
    const mockedPayload = {
      accessToken: 'testToken',
      refreshToken: 'testToken',
      user: user,
      success: true
    };

    const regUserFulfilled = {
      ...initialState,
      isAuthChecked: true,
      isAuth: true,
      user: user,
      request: false,
      error: mockedPayload.success ? '' : 'Ошибка авторизации'
    };

    const action = {
      type: regUser.fulfilled.type,
      payload: mockedPayload
    };

    expect(userReducer(initialState, action)).toStrictEqual(regUserFulfilled);
  });

  test('проверка fulfilled при выходе пользователя из личного кабинета', () => {
    const mockedPayload = {
      success: true
    };

    const logoutUserFulfilled = {
      ...initialState,
      isAuth: mockedPayload.success ? false : initialState.isAuth,
      user: mockedPayload.success ? null : initialState.user,
      error: mockedPayload.success ? '' : 'Возникла ошибка. Повторите еще раз'
    };

    const action = {
      type: logoutUser.fulfilled.type,
      payload: mockedPayload
    };

    expect(userReducer(initialState, action)).toStrictEqual(
      logoutUserFulfilled
    );
  });

  test('проверка fulfilled при обновлении информации о пользователе', () => {
    const updateUserFulfilled = {
      ...initialState,
      isAuth: true,
      user: user.user
    };

    const action = {
      type: updateUser.fulfilled.type,
      payload: user
    };

    expect(userReducer(initialState, action)).toStrictEqual(
      updateUserFulfilled
    );
  });

  test('проверка fulfilled при получении информации о заказах пользователя', async () => {
    const getUserOrdersFulfilled = {
      ...initialState,
      userOrders: orders,
      request: false,
      error: ''
    };

    const action = {
      type: getUserOrders.fulfilled.type,
      payload: orders
    };

    expect(userReducer(initialState, action)).toStrictEqual(
      getUserOrdersFulfilled
    );
  });

  test('проверка pending при регистрации нового пользователя', () => {
    const getUserPending = {
      ...initialState,
      request: true,
      error: ''
    };

    const action = {
      type: getUser.pending.type,
      payload: user
    };

    expect(userReducer(initialState, action)).toStrictEqual(getUserPending);
  });

  test('проверка pending при регистрации нового пользователя', () => {
    const getUserPending = {
      ...initialState,
      request: true,
      error: ''
    };

    const action = {
      type: getUser.pending.type,
      payload: getUser
    };

    expect(userReducer(initialState, action)).toStrictEqual(getUserPending);
  });

  test('проверка pending при авторизации пользователя', () => {
    const loginUserPending = {
      ...initialState,
      request: true,
      error: ''
    };

    const action = {
      type: loginUser.pending.type,
      payload: loginUser
    };

    expect(userReducer(initialState, action)).toStrictEqual(loginUserPending);
  });

  test('проверка pending при регистрации пользователя', () => {
    const regUserPending = {
      ...initialState,
      request: true,
      error: ''
    };

    const action = {
      type: regUser.pending.type,
      payload: regUser
    };

    expect(userReducer(initialState, action)).toStrictEqual(regUserPending);
  });

  test('проверка pending при выходе пользователя из личного кабинета', () => {
    const logoutUserPending = {
      ...initialState,
      request: true,
      error: ''
    };

    const action = {
      type: logoutUser.pending.type,
      payload: logoutUser
    };

    expect(userReducer(initialState, action)).toStrictEqual(logoutUserPending);
  });

  test('проверка pending при обновлении информации о пользователе', () => {
    const updateUserPending = {
      ...initialState,
      request: true,
      error: ''
    };

    const action = {
      type: updateUser.pending.type,
      payload: updateUser
    };

    expect(userReducer(initialState, action)).toStrictEqual(updateUserPending);
  });

  test('проверка pending при получении информации о заказах пользователя', () => {
    const getUserOrdersPending = {
      ...initialState,
      request: true,
      error: ''
    };

    const action = {
      type: getUserOrders.pending.type,
      payload: getUserOrders
    };

    expect(userReducer(initialState, action)).toStrictEqual(
      getUserOrdersPending
    );
  });

  test('проверка rejected при регистрации нового пользователя', () => {
    const getUserRejected = {
      ...initialState,
      isAuthChecked: true,
      error: 'Ошибка',
      request: false
    };

    const action = {
      type: getUser.rejected.type,
      error: { message: 'Ошибка' }
    };

    expect(userReducer(initialState, action)).toStrictEqual(getUserRejected);
  });

  test('проверка rejected при авторизации пользователя', () => {
    const loginUserRejected = {
      ...initialState,
      isAuthChecked: true,
      error: 'Ошибка',
      request: false
    };

    const action = {
      type: loginUser.rejected.type,
      error: { message: 'Ошибка' }
    };

    expect(userReducer(initialState, action)).toStrictEqual(loginUserRejected);
  });

  test('проверка rejected при регистрации пользователя', () => {
    const regUserRejected = {
      ...initialState,
      isAuthChecked: true,
      error: 'Ошибка',
      request: false
    };

    const action = {
      type: regUser.rejected.type,
      error: { message: 'Ошибка' }
    };

    expect(userReducer(initialState, action)).toStrictEqual(regUserRejected);
  });

  test('проверка rejected при выходе пользователя из личного кабинета', () => {
    const logoutUserRejected = {
      ...initialState,
      isAuthChecked: true,
      error: 'Ошибка',
      request: false
    };

    const action = {
      type: logoutUser.rejected.type,
      error: { message: 'Ошибка' }
    };

    expect(userReducer(initialState, action)).toStrictEqual(logoutUserRejected);
  });

  test('проверка rejected при обновлении информации о пользователе', () => {
    const updateUserRejected = {
      ...initialState,
      isAuthChecked: true,
      error: 'Ошибка',
      request: false
    };

    const action = {
      type: updateUser.rejected.type,
      error: { message: 'Ошибка' }
    };

    expect(userReducer(initialState, action)).toStrictEqual(updateUserRejected);
  });

  test('проверка rejected при получении информации о заказах пользователя', () => {
    const getUserOrdersRejected = {
      ...initialState,
      isAuthChecked: true,
      error: 'Ошибка',
      request: false
    };

    const action = {
      type: getUserOrders.rejected.type,
      error: { message: 'Ошибка' }
    };

    expect(userReducer(initialState, action)).toStrictEqual(
      getUserOrdersRejected
    );
  });
});
