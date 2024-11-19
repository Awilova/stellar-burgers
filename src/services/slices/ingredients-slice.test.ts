import {
  ingredientReducer,
  selectIngredients,
  selectIsLoading
} from './ingredients-slice';
import { getIngredients } from '../thunk/ingredient-thunk';
import { getIngredientsApi } from '../../utils/burger-api';
import { configureStore } from '@reduxjs/toolkit';
import { TIngredient } from '@utils-types';

jest.mock('../../utils/burger-api');

describe('тест слайса ingredient', () => {
  let store: any;

  beforeEach(() => {
    store = configureStore({
      reducer: {
        ingredient: ingredientReducer
      }
    });
    jest.clearAllMocks();
  });

  test('проверка обработки getIngredients.fulfilled', async () => {
    (getIngredientsApi as jest.Mock).mockResolvedValue([
      {
        _id: '1',
        name: 'test',
        type: 'test',
        proteins: 1,
        fat: 1,
        carbohydrates: 1,
        calories: 1,
        price: 1,
        image: 'test',
        image_mobile: 'test',
        image_large: 'test',
        __v: 1
      } as TIngredient
    ]);
    await store.dispatch(getIngredients());
    expect(selectIsLoading(store.getState())).toBe(false);
    expect(selectIngredients(store.getState())).toEqual([
      {
        _id: '1',
        name: 'test',
        type: 'test',
        proteins: 1,
        fat: 1,
        carbohydrates: 1,
        calories: 1,
        price: 1,
        image: 'test',
        image_mobile: 'test',
        image_large: 'test',
        __v: 1
      } as TIngredient
    ]);
  });

  test('проверка корректности работы selectIngredients', () => {
    store.dispatch(
      getIngredients.fulfilled(
        [
          {
            _id: '1',
            name: 'test',
            type: 'test',
            proteins: 1,
            fat: 1,
            carbohydrates: 1,
            calories: 1,
            price: 1,
            image: 'test',
            image_mobile: 'test',
            image_large: 'test',
            __v: 1
          } as TIngredient
        ],
        ''
      )
    );

    expect(selectIngredients(store.getState())).toEqual([
      {
        _id: '1',
        name: 'test',
        type: 'test',
        proteins: 1,
        fat: 1,
        carbohydrates: 1,
        calories: 1,
        price: 1,
        image: 'test',
        image_mobile: 'test',
        image_large: 'test',
        __v: 1
      } as TIngredient
    ]);
  });

  test('проверка обработки getIngredients.rejected', async () => {
    (getIngredientsApi as jest.Mock).mockRejectedValue({
      message: 'error'
    });
    await store.dispatch(getIngredients());
    expect(selectIsLoading(store.getState())).toBe(false);
    expect(store.getState().ingredient.error).toBe('error');
    expect(selectIngredients(store.getState())).toEqual([]);
  });

  test('проверка корректности работы selectIsLoading', () => {
    store.dispatch(getIngredients.fulfilled([], ''));
    expect(selectIsLoading(store.getState())).toBe(false);
    store.dispatch(getIngredients.pending(''));
    expect(selectIsLoading(store.getState())).toBe(true);
  });
});
