import { createAppAsyncThunk } from '@hooks';
import { getIngredientsApi } from '@api';

export const getIngredients = createAppAsyncThunk(`ingredient/fetch`, async () =>
    getIngredientsApi()
  );
