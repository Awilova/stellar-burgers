import { getIngredientsApi } from '@api';
import {
  createSlice,
  PayloadAction
} from '@reduxjs/toolkit';
import { TIngredient } from '@utils-types';
import { getIngredients } from '@thunk';


interface TIngredientsState {
  ingredients: TIngredient[];
  isLoading: boolean;
  error: null | undefined | string; 
};

const initialState: TIngredientsState = {
  ingredients: [],
  isLoading: true,
  error: null,
};

export const ingredientsSlice = createSlice({
  name: 'ingredient',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(
        getIngredients.fulfilled,
        (state, action: PayloadAction<TIngredient[]>) => {
          state.ingredients = action.payload;
          state.isLoading = false;
        }
      )
      .addCase(getIngredients.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(getIngredients.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message;
      });
  },
  selectors: {
    selectIsLoading: (sliceState) => sliceState.isLoading,
    selectIngredients: (sliceState) => sliceState.ingredients,
  }
});

export const ingredientReducer = ingredientsSlice.reducer;
export const { selectIngredients, selectIsLoading } =
  ingredientsSlice.selectors;
