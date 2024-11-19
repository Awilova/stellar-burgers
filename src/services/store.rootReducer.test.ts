import store, { RootState } from './store';
import { constructorReducer } from './slices/constructor-slice';
import { ingredientReducer } from './slices/ingredients-slice';
import { feedReducer } from './slices/feeds-slice';
import { userReducer } from './slices/user-slice';

describe('тестирование корневого редьюсера', () => {
  test('соответствие корневому редьюсеру', () => {
    const initialTestState: RootState = store.getState();
    const action = { type: '@@INIT' };

    expect(initialTestState.constructorIngredient).toEqual(
      constructorReducer(undefined, action)
    );

    expect(initialTestState.ingredient).toEqual(
      ingredientReducer(undefined, action)
    );

    expect(initialTestState.feed).toEqual(feedReducer(undefined, action));

    expect(initialTestState.user).toEqual(userReducer(undefined, action));
  });
});
