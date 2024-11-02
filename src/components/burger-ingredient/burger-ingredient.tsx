import { FC, memo, useState } from 'react';
import { useLocation } from 'react-router-dom';

import { BurgerIngredientUI } from '@ui';
import { TBurgerIngredientProps } from './type';

import { changeBun, addIngredient } from '@slices';
import { useAppDispatch } from '@hooks';

export const BurgerIngredient: FC<TBurgerIngredientProps> = memo(
  ({ ingredient, count }) => {
    const location = useLocation();
    const dispatch = useAppDispatch();
    const handleAdd = () =>
      dispatch(
        ingredient.type === 'bun'
          ? changeBun(ingredient)
          : addIngredient(ingredient)
      );

    return (
      <BurgerIngredientUI
        ingredient={ingredient}
        count={count}
        locationState={{ background: location }}
        handleAdd={handleAdd}
      />
    );
  }
);
