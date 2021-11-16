import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Product } from '../../types';
import Cookies from 'js-cookie';

const initialState = {
  items: [] as Product[],
};

type TPayload = {
  item: Product;
};

const cartSlice = createSlice({
  name: 'cartSlice',
  initialState: initialState,
  reducers: {
    addItemToCart: (state, { payload }: PayloadAction<TPayload>) => {
      state.items = [...state.items, payload.item];
      Cookies.set('cartItems', JSON.stringify(state.items));
    },
    removeItemFromCart: (state, { payload }: PayloadAction<TPayload>) => {
      state.items = state.items.filter(
        (product) => product.id != payload.item.id
      );
      Cookies.set('cartItems', JSON.stringify(state.items));
    },
    emptyCart: (state) => {
      state.items = [];
      Cookies.set('cartItems', JSON.stringify(state.items));
    },
  },
});

export const cartReducer = cartSlice.reducer;
export const { addItemToCart, removeItemFromCart, emptyCart } =
  cartSlice.actions;
