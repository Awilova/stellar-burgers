import { FC, useMemo } from 'react';
import { TConstructorIngredient } from '@utils-types';
import { BurgerConstructorUI } from '@ui';

import { useNavigate } from 'react-router-dom';
import {
  selectConstructorItems,
  selectOrderModalData,
  selectOrderRequest,
  setOrdersModal, selectUser, selectIsAuth
} from '@slices';
import { useAppDispatch, useAppSelector } from '@hooks';
import { postOrderBurgers} from '@thunk';

export const BurgerConstructor: FC = () => {
  const constructorItems = useAppSelector(selectConstructorItems);
  const orderRequest = useAppSelector(selectOrderRequest);
  const orderModalData = useAppSelector(selectOrderModalData);

  const navigate = useNavigate();
  const user = useAppSelector(selectUser);
  const isAuth = useAppSelector(selectIsAuth);
  const dispatch = useAppDispatch();

  const initialBurger = (bunId: string, ingredients: TConstructorIngredient[]) =>
    [bunId, ...ingredients.map(({ _id }) => _id), bunId];

  const onOrderClick = () => {
    if (!constructorItems.bun || orderRequest) return;
    if (user && isAuth
    ) {
    dispatch(
      postOrderBurgers(
        initialBurger(constructorItems.bun!._id, constructorItems.ingredients)
      )
    );
    } else {
      navigate('/login', { state: { from: '/' } });
    };
  };

  const closeOrderModal = () => {
    dispatch(setOrdersModal(null));
  };

  const price = useMemo(
    () =>
      (constructorItems.bun ? constructorItems.bun.price * 2 : 0) +
      constructorItems.ingredients.reduce(
        (s: number, v: TConstructorIngredient) => s + v.price,
        0
      ),
    [constructorItems]
  );

  return (
    <BurgerConstructorUI
      price={price}
      orderRequest={orderRequest}
      constructorItems={constructorItems}
      orderModalData={orderModalData}
      onOrderClick={onOrderClick}
      closeOrderModal={closeOrderModal}
    />
  );
};
