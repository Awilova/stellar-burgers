import { createAppAsyncThunk } from '../hooks/index';
import { getFeedsApi } from '../../utils/burger-api';

export const getFeed = createAppAsyncThunk(`feed/fetch`, async () =>
  getFeedsApi()
);
