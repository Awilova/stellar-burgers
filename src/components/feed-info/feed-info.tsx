import { FC } from 'react';

import { TOrder } from '@utils-types';
import { FeedInfoUI } from '../ui/feed-info';

import { useAppSelector } from '@hooks';
import { selectOrders } from '@slices';

const getOrders = (orders: TOrder[], status: string): number[] =>
  orders
    .filter((item) => item.status === status)
    .map((item) => item.number)
    .slice(0, 20);

type TFeed = { total?: number; totalToday?: number };

export const FeedInfo: FC = () => {
  const orderData = useAppSelector(selectOrders);

  const orders: TOrder[] = orderData.feeds.orders;
  const feed: TFeed = {};

  const readyOrders = getOrders(orders, 'done');

  const pendingOrders = getOrders(orders, 'pending');

  feed.total = orderData.feeds.total;
  feed.totalToday = orderData.feeds.totalToday;

  return (
    <FeedInfoUI
      readyOrders={readyOrders}
      pendingOrders={pendingOrders}
      feed={feed}
    />
  );
};
