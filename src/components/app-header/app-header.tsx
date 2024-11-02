import { FC } from 'react';
import { AppHeaderUI } from '@ui';

import { selectUser } from '@slices';
import { useAppSelector } from '@hooks';

export const AppHeader: FC = () => (
  <AppHeaderUI userName={useAppSelector(selectUser)?.name || ''} />
);
