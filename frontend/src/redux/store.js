import { configureStore } from '@reduxjs/toolkit';
import userReducer from './features/userSlice';
import { productsApi } from './api/productsApi';
import { authApi } from './api/authApi';
import { userApi } from './api/userApi';

const store = configureStore({
  reducer: {
    auth: userReducer,
    [productsApi.reducerPath]: productsApi.reducer,
    [authApi.reducerPath]: authApi.reducer,
    [userApi.reducerPath]: userApi.reducer,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware()
    .concat(productsApi.middleware, authApi.middleware, userApi.middleware),
});

export default store;
