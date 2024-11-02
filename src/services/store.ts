import { combineSlices, configureStore } from '@reduxjs/toolkit';

import { constructorSlice } from './slices/constructor-slice';
import { ingredientsSlice } from './slices/ingredients-slice';
import { feedsSlice } from './slices/feeds-slice';
import {userSlice} from './slices/user-slice';

const rootReducer = combineSlices(
  constructorSlice,
  ingredientsSlice,
  feedsSlice,
  userSlice
);

const store = configureStore({
  reducer: rootReducer,
  devTools: process.env.NODE_ENV !== 'production'
});

export type RootState = ReturnType<typeof rootReducer>;

export type AppDispatch = typeof store.dispatch;

export default store;
