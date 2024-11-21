import { createAppAsyncThunk } from '../hooks/index';
import { getOrderByNumberApi, orderBurgerApi } from '../../utils/burger-api';

export const getOrderByNumber = createAppAsyncThunk(
  'constructorIngredient/getOrderByNumber',
  async (number: number) => await getOrderByNumberApi(number)
);

export const postOrderBurgers = createAppAsyncThunk(
  'constructorIngredient/postOrderBurgers',
  async (ingredients: string[]) => await orderBurgerApi(ingredients)
);
