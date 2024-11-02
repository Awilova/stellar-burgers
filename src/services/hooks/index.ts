import { useDispatch, useSelector, TypedUseSelectorHook } from 'react-redux';
import {AppDispatch, RootState} from '../store';
import { createAsyncThunk } from '@reduxjs/toolkit';
// import { TServerResponse } from '../../utils/burger-api';

export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
export const createAppAsyncThunk = createAsyncThunk.withTypes<{
    dispatch: AppDispatch;
    state: RootState;
}>();
