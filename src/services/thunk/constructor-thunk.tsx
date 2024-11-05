import { createAppAsyncThunk } from '@hooks';
import { getOrderByNumberApi, orderBurgerApi } from '@api';

export const getOrderByNumber = createAppAsyncThunk(
  'constructorIngredient/getOrderByNumber',
  async (number: number) => await getOrderByNumberApi(number)
);

export const postOrderBurgers = createAppAsyncThunk(
  'constructorIngredient/postOrderBurgers',
  async (ingredients: string[]) => await orderBurgerApi(ingredients)
);
