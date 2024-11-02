import { FC, memo } from 'react';
import { BurgerConstructorElementUI } from '@ui';
import { BurgerConstructorElementProps } from './type';

import { useAppDispatch } from '@hooks';
import {
  removeIngredient,
  moveIngredient
} from '@slices';

export const BurgerConstructorElement: FC<BurgerConstructorElementProps> = memo(
  ({ ingredient, index, totalItems }) => {
    const dispatch = useAppDispatch();
    
    const handleMoveUp = () => {
      dispatch(moveIngredient({ id: ingredient.id, move: -1 }));
    };
    const handleMoveDown = () => {
      dispatch(moveIngredient({ id: ingredient.id, move: 1 }));
    };

    const handleClose = () => {
      dispatch(removeIngredient(ingredient.id));
    };

    return (
      <BurgerConstructorElementUI
        ingredient={ingredient}
        index={index}
        totalItems={totalItems}
        handleMoveUp={handleMoveUp}
        handleMoveDown={handleMoveDown}
        handleClose={handleClose}
      />
    );
  }
);
