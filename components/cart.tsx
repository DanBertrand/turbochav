import React from 'react';
import { useSelector } from 'react-redux';
import { TStore } from 'store';

const Cart = () => {
  const { items } = useSelector((state: TStore) => state.cartReducer);
  console.log('Items from cart', items);
  return <span>Cart: {items.length} </span>;
};

export default Cart;
