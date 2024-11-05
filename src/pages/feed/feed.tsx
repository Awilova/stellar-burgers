import { Preloader } from '@ui';
import { FeedUI } from '@ui-pages';
import { useEffect, FC } from 'react';

import { useAppDispatch, useAppSelector } from '@hooks';
import { selectOrders } from '@slices';
import { getFeed } from '@thunk';

export const Feed: FC = () => {
  const dispatch = useAppDispatch();
  useEffect(() => {
    dispatch(getFeed());
  }, []);

  const orders = useAppSelector(selectOrders).feeds.orders;

  if (!orders.length) {
    return <Preloader />;
  }
  return (
    <FeedUI
      orders={orders}
      handleGetFeeds={() => {
        dispatch(getFeed());
      }}
    />
  );
};
