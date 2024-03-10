import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  cart: localStorage.getItem('cart')
    ? JSON.parse(localStorage.getItem('cart'))
    : [],
};

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    setCartItem(state, action) {
      const item = action.payload;

      const itemExists = state.cart.find(
        (element) => element.productId === item.productId,
      );

      let newCart;

      if (itemExists) {
        newCart = state.cart.map(
          (element) => (element.productId === itemExists.productId ? item : element),
        );
      } else {
        newCart = [...state.cart, item];
      }

      localStorage.setItem('cart', JSON.stringify(newCart));

      return { cart: newCart };
    },
    removeCartItem(state, action) {
      const item = action.payload;

      const newCart = state.cart.filter(
        (element) => element.productId !== item.productId,
      );

      localStorage.setItem('cart', JSON.stringify(newCart));

      return { cart: newCart };
    },
  },
});

export default cartSlice.reducer;

export const { setCartItem, removeCartItem } = cartSlice.actions;
