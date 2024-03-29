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

      if (itemExists) {
        state.cart = state.cart.map(
          (element) => (element.productId === itemExists.productId ? item : element),
        );
      } else {
        state.cart = [...state.cart, item];
      }

      // Update local storage
      localStorage.setItem('cart', JSON.stringify(state.cart));
    },
    removeCartItem(state, action) {
      const item = action.payload;

      state.cart = state.cart.filter(
        (element) => element.productId !== item.productId,
      );

      // Update local storage
      localStorage.setItem('cart', JSON.stringify(state.cart));
    },
    clearCart(state, action) {
      state.cart = [];

      // Update local storage
      localStorage.removeItem('cart');
    },
    setShippingInfo(state, action) {
      state.shippingInfo = action.payload;

      // Update local storage
      localStorage.setItem('shippingInfo', JSON.stringify(action.payload));
    },
  },
});

export default cartSlice.reducer;

export const {
  setCartItem, removeCartItem, clearCart, setShippingInfo,
} = cartSlice.actions;
