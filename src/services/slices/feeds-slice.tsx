import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { TOrdersData } from '@utils-types';
import { getFeed } from '@thunk';

interface TFeedsState {
  feeds: TOrdersData;
  error: string | null | undefined;
}

const initialState: TFeedsState = {
  feeds: { orders: [], total: 0, totalToday: 0 },
  error: null
};

export const feedsSlice = createSlice({
  name: 'feed',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(
        getFeed.fulfilled,
        (state, action: PayloadAction<TOrdersData>) => {
          state.feeds.total = action.payload.total;
          state.feeds.totalToday = action.payload.totalToday;
          state.feeds.orders = action.payload.orders;
        }
      )
      .addCase(getFeed.rejected, (state, action) => {
        state.error = action.error.message;
      });
  },
  selectors: {
    selectOrders: (sliceState) => sliceState
  }
});

export const feedReducer = feedsSlice.reducer;
export const { selectOrders } = feedsSlice.selectors;
