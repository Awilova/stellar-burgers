import { FC } from 'react';
import { Preloader } from '../ui/preloader';
import { IngredientDetailsUI } from '../ui/ingredient-details';

import { selectIngredients } from '@slices';
import { useAppSelector } from '@hooks';
import { useParams } from 'react-router-dom';
export const IngredientDetails: FC = () => {
  const { id } = useParams();

  const ingredientData = useAppSelector((state) =>
    selectIngredients(state).find((i) => id === i._id)
  );

  if (!ingredientData) {
    return <Preloader />;
  }

  return <IngredientDetailsUI ingredientData={ingredientData} />;
};
