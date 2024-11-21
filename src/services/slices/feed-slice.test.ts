import { feedReducer, selectOrders } from './feeds-slice';
import { getFeed } from '../thunk/feeds-thunk';
import { configureStore } from '@reduxjs/toolkit';
import { TOrdersData } from '@utils-types';
import { getFeedsApi } from '../../utils/burger-api';

jest.mock('../../utils/burger-api');

describe('Тест слайса feed', () => {
  let store: any;

  beforeEach(() => {
    store = configureStore({
      reducer: {
        feed: feedReducer
      }
    });
    jest.clearAllMocks();
  });

  test('проверка обработки getFeed.fulfilled', async () => {
    (getFeedsApi as jest.Mock).mockResolvedValue({
      orders: [],
      total: 5,
      totalToday: 2
    } as TOrdersData);

    await store.dispatch(getFeed());

    expect(getFeedsApi).toHaveBeenCalledTimes(1);
    expect(store.getState().feed.feeds.orders).toEqual([]);
    expect(store.getState().feed.feeds.total).toBe(5);
    expect(store.getState().feed.feeds.totalToday).toBe(2);
  });

  test('проверка обработки getFeed.rejected', async () => {
    (getFeedsApi as jest.Mock).mockRejectedValue({
      message: 'error'
    } as Error);

    await store.dispatch(getFeed());

    expect(getFeedsApi).toHaveBeenCalledTimes(1);
    expect(store.getState().feed.error).toBe('error');
    expect(store.getState().feed.feeds.orders).toEqual([]);
    expect(store.getState().feed.feeds.total).toBe(0);
    expect(store.getState().feed.feeds.totalToday).toBe(0);
  });

  test('проверка корректности работы selectOrders', async () => {
    (getFeedsApi as jest.Mock).mockResolvedValue({
      orders: [],
      total: 5,
      totalToday: 2
    } as TOrdersData);

    await store.dispatch(getFeed());
    expect(getFeedsApi).toHaveBeenCalledTimes(1);
    expect(selectOrders(store.getState())).toEqual(store.getState().feed);
  });
});
