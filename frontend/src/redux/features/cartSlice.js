import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  cart: localStorage.getItem('cart')
    ? JSON.parse(localStorage.getItem('cart'))
    : [],
  shippingInfo: localStorage.getItem('shippingInfo')
    ? JSON.parse(localStorage.getItem('shippingInfo'))
    : {},
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

      return { cart: newCart, ...state };
    },
    removeCartItem(state, action) {
      const item = action.payload;

      const newCart = state.cart.filter(
        (element) => element.productId !== item.productId,
      );

      localStorage.setItem('cart', JSON.stringify(newCart));

      return { cart: newCart, ...state };
    },
    setShippingInfo(state, action) {
      localStorage.setItem('shippingInfo', JSON.stringify(action.payload));

      return { ...state, shippingInfo: action.payload };
    },
  },
});

export default cartSlice.reducer;

export const { setCartItem, removeCartItem, setShippingInfo } = cartSlice.actions;
