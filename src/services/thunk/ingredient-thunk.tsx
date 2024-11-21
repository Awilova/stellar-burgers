import { createAppAsyncThunk } from '../hooks/index';
import { getIngredientsApi } from '../../utils/burger-api';

export const getIngredients = createAppAsyncThunk(
  `ingredient/fetch`,
  async () => getIngredientsApi()
);
