import { createSlice, nanoid, PayloadAction } from '@reduxjs/toolkit';
import { TConstructorIngredient, TIngredient, TOrder } from '@utils-types';
import { postOrderBurgers, getOrderByNumber } from '@thunk';

type TConstructorBuns = {
  price: number;
  _id: string;
};

type TConstructorBurger = {
  bun?: TConstructorBuns;
  ingredients: TConstructorIngredient[];
};

export interface TConstructorState {
  constructorIngredients: TConstructorBurger;
  ordersModal: TOrder | null;
  ordersRequest: boolean;
  ordersNumber?: TOrder | null;
  error: string | null;
}

const initialState: TConstructorState = {
  constructorIngredients: {
    ingredients: []
  },
  ordersRequest: false,
  ordersModal: null,
  error: null
};

export const constructorSlice = createSlice({
  name: 'constructorIngredient',
  initialState,
  reducers: {
    addIngredient: {
      reducer: (state, action: PayloadAction<TConstructorIngredient>) => {
        const constructorState = state.constructorIngredients;
        constructorState.ingredients.push(action.payload);
      },
      prepare(ingredient: TIngredient) {
        const id = nanoid();
        return { payload: { ...ingredient, id } };
      }
    },
    changeBun: (
      state: TConstructorState,
      action: PayloadAction<TIngredient>
    ) => {
      state.constructorIngredients.bun = action.payload;
    },
    removeIngredient: (
      state: TConstructorState,
      action: PayloadAction<string>
    ) => {
      state.constructorIngredients.ingredients =
        state.constructorIngredients.ingredients.filter(
          (ingredient) => ingredient.id !== action.payload
        );
    },
    setOrdersModal: (
      state: TConstructorState,
      action: PayloadAction<TOrder | null>
    ) => {
      state.ordersModal = action.payload;
    },
    moveIngredient: (
      state: TConstructorState,
      action: PayloadAction<{ id: string; move: number }>
    ) => {
      const index = state.constructorIngredients.ingredients.findIndex(
        (ing) => ing.id === action.payload.id
      );
      state.constructorIngredients.ingredients[index] =
        state.constructorIngredients.ingredients.splice(
          index + action.payload.move,
          1,
          state.constructorIngredients.ingredients[index]
        )[0];
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(postOrderBurgers.pending, (state) => {
        state.ordersRequest = true;
        state.error = null;
      })
      .addCase(postOrderBurgers.fulfilled, (state, action) => {
        state.ordersRequest = false;
        state.constructorIngredients = {
          bun: undefined,
          ingredients: []
        };
        state.ordersModal = action.payload.order;
      })
      .addCase(postOrderBurgers.rejected, (state, action) => {
        state.ordersRequest = false;
        state.error = action.error.message || null;
      })
      .addCase(getOrderByNumber.pending, (state) => {
        state.ordersNumber = null;
        state.error = null;
      })
      .addCase(getOrderByNumber.fulfilled, (state, action) => {
        state.ordersNumber = action.payload.orders[0];
      })
      .addCase(getOrderByNumber.rejected, (state, action) => {
        state.error = action.error.message || null;
      });
  },
  selectors: {
    selectConstructorItems: (state) => state.constructorIngredients,
    selectOrderRequest: (state) => state.ordersRequest,
    selectOrderByNumber: (state) => state.ordersNumber,
    selectOrderModalData: (state) => state.ordersModal
  }
});

export const constructorReducer = constructorSlice.reducer;
export const {
  addIngredient,
  changeBun,
  removeIngredient,
  setOrdersModal,
  moveIngredient
} = constructorSlice.actions;
export const {
  selectConstructorItems,
  selectOrderByNumber,
  selectOrderRequest,
  selectOrderModalData
} = constructorSlice.selectors;
