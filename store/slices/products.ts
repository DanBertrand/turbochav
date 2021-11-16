import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Product } from '../../types';

const initialState = { data: [] as Product[] };
type TPayload = { data: Product[] };

const productsSlice = createSlice({
  name: 'productsSlice',
  initialState: initialState,
  reducers: {
    setProducts: (state, { payload }: PayloadAction<TPayload>) => {
      state.data = payload.data;
    },
  },
});

export const productsReducer = productsSlice.reducer;
export const { setProducts } = productsSlice.actions;
