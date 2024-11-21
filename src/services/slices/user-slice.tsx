import { setCookie, deleteCookie } from '../../utils/cookie';
import { TUser, TOrder } from '@utils-types';
import {
  createSlice,
  PayloadAction,
  isRejected,
  isFulfilled,
  isPending
} from '@reduxjs/toolkit';
import {
  loginUser,
  logoutUser,
  getUser,
  regUser,
  updateUser,
  getUserOrders
} from '../thunk/user-thunk';

interface TUserSlice {
  isAuth: boolean;
  isAuthChecked: boolean;
  user: TUser | null;
  error: string | null;
  request: boolean;
  userOrders: TOrder[];
}

export const initialState: TUserSlice = {
  isAuth: false,
  isAuthChecked: false,
  user: null,
  error: '',
  request: false,
  userOrders: []
};

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUser: (state, action: PayloadAction<TUser | null>) => {
      state.user = action.payload;
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(getUserOrders.fulfilled, (state, action) => {
        state.userOrders = action.payload;
        state.request = false;
        state.error = '';
      })
      .addCase(updateUser.fulfilled, (state, action) => {
        state.user = action.payload.user;
        state.isAuth = true;
      })
      .addCase(getUser.fulfilled, (state, action) => {
        state.isAuthChecked = true;
        state.user = action.payload.user;
        state.isAuth = true;
      })
      .addCase(logoutUser.fulfilled, (state, action) => {
        if (action.payload.success) {
          localStorage.clear();
          deleteCookie('accessToken');
          state.user = null;
          state.isAuth = false;
        } else {
          state.error = 'Возникла ошибка. Повторите еще раз';
        }
      })
      .addMatcher(isFulfilled(loginUser, regUser), (state, action) => {
        state.error = action.payload.success ? '' : 'Ошибка авторизации';
        state.request = false;
        setCookie('accessToken', action.payload.accessToken);
        localStorage.setItem('refreshToken', action.payload.refreshToken);
        state.user = action.payload.user;
        state.isAuth = true;
        state.isAuthChecked = true;
      })
      .addMatcher(
        isPending(
          loginUser,
          regUser,
          logoutUser,
          getUser,
          updateUser,
          getUserOrders
        ),
        (state) => {
          state.request = true;
          state.error = '';
        }
      )
      .addMatcher(
        isRejected(
          loginUser,
          regUser,
          logoutUser,
          getUser,
          updateUser,
          getUserOrders
        ),
        (state, action) => {
          state.request = false;
          state.error = action.error.message || '';
          state.isAuthChecked = true;
        }
      );
  },
  selectors: {
    selectUser: (sliceState) => sliceState.user,
    selectIsAuth: (sliceState) => sliceState.isAuth,
    selectIsAuthChecked: (sliceState) => sliceState.isAuthChecked,
    selectUserOrders: (sliceState) => sliceState.userOrders
  }
});

export const userReducer = userSlice.reducer;
export const {
  selectUser,
  selectIsAuth,
  selectIsAuthChecked,
  selectUserOrders
} = userSlice.selectors;
