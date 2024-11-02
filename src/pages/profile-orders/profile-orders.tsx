import { ProfileOrdersUI } from '@ui-pages';
import { TOrder } from '@utils-types';
import { FC, useEffect } from 'react';

import { useAppDispatch, useAppSelector } from '@hooks';
import { selectUserOrders } from '@slices';
import {getUserOrders} from '@thunk';

export const ProfileOrders: FC = () => {
  
  const dispatch = useAppDispatch();
  const orders = useAppSelector(selectUserOrders);

  useEffect(() => {
      dispatch(getUserOrders());
  }, []);

  return <ProfileOrdersUI orders={orders} />;
};
