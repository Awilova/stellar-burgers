import {
  addIngredient,
  changeBun,
  removeIngredient,
  moveIngredient,
  constructorReducer,
  TConstructorState
} from './constructor-slice';
import { getOrderByNumberApi, orderBurgerApi } from '../../utils/burger-api';
import { getOrderByNumber, postOrderBurgers } from '../thunk/constructor-thunk';
import { configureStore } from '@reduxjs/toolkit';
import { TIngredient } from '@utils-types';

jest.mock('../../utils/burger-api');

beforeEach(() => {
  constructorReducer(undefined, { type: '@@INIT' });
});

describe('Тест слайса constructor', () => {
  let store: any;

  beforeEach(() => {
    store = configureStore({
      reducer: {
        constructorIngredient: constructorReducer
      }
    });
    jest.clearAllMocks();
  });

  test('проверка обработки addIngredient', () => {
    const initialStateConstructor: TConstructorState = {
      constructorIngredients: {
        ingredients: []
      },
      ordersRequest: false,
      ordersModal: null,
      error: null
    };

    const testIngredient: TIngredient = {
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
      image_large: 'test'
    };

    expect(
      constructorReducer(initialStateConstructor, addIngredient(testIngredient))
        .constructorIngredients.ingredients[0]
    ).toEqual(expect.objectContaining(testIngredient));
  });

  test('проверка обработки removeIngredient', () => {
    const initialStateConstructor: TConstructorState = {
      constructorIngredients: {
        ingredients: []
      },
      ordersRequest: false,
      ordersModal: null,
      error: null
    };
    const testIngredient: TIngredient = {
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
      image_large: 'test'
    };

    expect(
      constructorReducer(initialStateConstructor, removeIngredient(''))
        .constructorIngredients.ingredients.length
    ).toBe(0);
  });

  test('проверка обработки changeBun', () => {
    const initialStateConstructor: TConstructorState = {
      constructorIngredients: {
        ingredients: []
      },
      ordersRequest: false,
      ordersModal: null,
      error: null
    };
    const testIngredient: TIngredient = {
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
      image_large: 'test'
    };

    expect(
      constructorReducer(initialStateConstructor, changeBun(testIngredient))
        .constructorIngredients.bun
    ).toEqual(testIngredient);
  });

  describe('проверка обработки moveIngredient', () => {
    const initialStateConstructor: TConstructorState = {
      constructorIngredients: {
        ingredients: [
          {
            id: '1',
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
            image_large: 'test'
          },
          {
            id: '2',
            _id: '2',
            name: 'test',
            type: 'test',
            proteins: 1,
            fat: 1,
            carbohydrates: 1,
            calories: 1,
            price: 1,
            image: 'test',
            image_mobile: 'test',
            image_large: 'test'
          }
        ]
      },
      ordersRequest: false,
      ordersModal: null,
      error: null
    };
    it('перемещение ингрединта вниз', () => {
      const action = moveIngredient({
        id: initialStateConstructor.constructorIngredients.ingredients[0]._id,
        move: 0 - 1
      });

      const state = constructorReducer(initialStateConstructor, action);

      expect(state.constructorIngredients.ingredients[0].id).toBe('2');
      expect(state.constructorIngredients.ingredients[1].id).toBe('1');
    });
    it('перемещение ингрединта вверх', () => {
      const action = moveIngredient({
        id: initialStateConstructor.constructorIngredients.ingredients[0]._id,
        move: 0 + 1
      });

      const state = constructorReducer(initialStateConstructor, action);

      expect(state.constructorIngredients.ingredients[0].id).toBe('2');
      expect(state.constructorIngredients.ingredients[1].id).toBe('1');
    });
  });

  describe('проверка обработки экшенов', () => {
    it('проверка обработки getOrderByNumber.fulfilled', async () => {
      const mockOrders = {
        orders: [
          {
            name: 'test',
            status: 'test',
            number: 1,
            createdAt: 'test',
            updatedAt: 'test',
            _id: '1',
            ingredients: ['1', '2']
          }
        ]
      };
      (getOrderByNumberApi as jest.Mock).mockResolvedValue(mockOrders);
      await store.dispatch(getOrderByNumber(12));
      expect(store.getState().constructorIngredient.ordersNumber).toEqual(
        mockOrders.orders[0]
      );
    });

    it('проверка обработки getOrderByNumber.rejected', async () => {
      (getOrderByNumberApi as jest.Mock).mockRejectedValue({
        message: 'error'
      });
      await store.dispatch(getOrderByNumber(12));
      expect(store.getState().constructorIngredient.ordersRequest).toBe(false);
      expect(store.getState().constructorIngredient.error).toBe('error');
    });

    it('проверка обработки getOrderByNumber.pending', async () => {
      await store.dispatch(getOrderByNumber.pending('', 0));
      expect(store.getState().constructorIngredient.ordersNumber).toBe(null);
      expect(store.getState().constructorIngredient.error).toBe(null);
    });

    it('проверка обработки postOrderBurgers.fulfilled', async () => {
      (orderBurgerApi as jest.Mock).mockResolvedValue({
        order: {
          name: 'test',
          status: 'test',
          number: 1,
          createdAt: 'test',
          updatedAt: 'test',
          _id: '1',
          ingredients: ['1', '2']
        }
      });
      await store.dispatch(postOrderBurgers(['mocked-ingredients']));
      expect(store.getState().constructorIngredient.ordersRequest).toBe(false);
      expect(orderBurgerApi).toHaveBeenCalledTimes(1);
      expect(orderBurgerApi).toHaveBeenCalledWith(['mocked-ingredients']);
      expect(store.getState().constructorIngredient.ordersModal).toEqual({
        name: 'test',
        status: 'test',
        number: 1,
        createdAt: 'test',
        updatedAt: 'test',
        _id: '1',
        ingredients: ['1', '2']
      });
      expect(
        store.getState().constructorIngredient.constructorIngredients
      ).toEqual({
        bun: undefined,
        ingredients: []
      });
      expect(store.getState().constructorIngredient.error).toBeNull();
    });
  });

  it('проверка обработки postOrderBurgers.rejected', async () => {
    (orderBurgerApi as jest.Mock).mockRejectedValue({
      message: 'error'
    });
    await store.dispatch(postOrderBurgers(['mocked-ingredients']));
    expect(store.getState().constructorIngredient.ordersRequest).toBe(false);
    expect(orderBurgerApi).toHaveBeenCalledTimes(1);
    expect(orderBurgerApi).toHaveBeenCalledWith(['mocked-ingredients']);
    expect(store.getState().constructorIngredient.ordersModal).toBeNull();
    expect(store.getState().constructorIngredient.error).toBe('error');
  });

  it('проверка обработки postOrderBurgers.pending', async () => {
    await store.dispatch(postOrderBurgers(['mocked-ingredients']));
    expect(store.getState().constructorIngredient.ordersRequest).toBe(false);
  });
});
