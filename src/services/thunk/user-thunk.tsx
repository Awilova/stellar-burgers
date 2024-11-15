import { createAppAsyncThunk } from '../hooks/index';
import {
  getUserApi,
  registerUserApi,
  loginUserApi,
  logoutApi,
  getOrdersApi,
  updateUserApi,
  TRegisterData,
  TLoginData
} from '../../utils/burger-api';

export const getUser = createAppAsyncThunk('user/getUser', async () =>
  getUserApi()
);

export const regUser = createAppAsyncThunk(
  'user/register',
  async (data: TRegisterData) => registerUserApi(data)
);

export const loginUser = createAppAsyncThunk(
  'user/login',
  async (userData: TLoginData) => loginUserApi(userData)
);

export const logoutUser = createAppAsyncThunk('user/logout', async () =>
  logoutApi()
);

export const getUserOrders = createAppAsyncThunk(
  'user/getUserOrders',
  async () => await getOrdersApi()
);

export const updateUser = createAppAsyncThunk(
  'user/update',
  async (data: Partial<TRegisterData>) => await updateUserApi(data)
);
