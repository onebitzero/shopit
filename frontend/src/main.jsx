import React from 'react';
import ReactDOM from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { Provider } from 'react-redux';
import store from './redux/store';
import App from './App';
import Home from './components/Home';
import ProductDetails from './components/product/ProductDetails';
import Login from './components/auth/Login';
import Register from './components/auth/Register';
import ProtectedRoute from './components/auth/ProtectedRoute';
import Profile from './components/user/Profile';
import UpdateProfile from './components/user/UpdateProfile';
import UploadAvatar from './components/user/UploadAvatar';
import UpdatePassword from './components/user/UpdatePassword';
import ForgotPassword from './components/auth/ForgotPassword';
import ResetPassword from './components/auth/ResetPassword';
import Cart from './components/cart/Cart';
import Shipping from './components/cart/Shipping';
import ConfirmOrder from './components/cart/ConfirmOrder';
import PaymentMethod from './components/cart/PaymentMethod';
import MyOrders from './components/order/MyOrders';
import OrderDetails from './components/order/OrderDetails';
import Invoice from './components/invoice/Invoice';

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    children: [
      {
        path: '',
        element: <Home />,
      },
      {
        path: 'products/:id',
        element: <ProductDetails />,
      },
      {
        path: 'login',
        element: <Login />,
      },
      {
        path: 'register',
        element: <Register />,
      },
      {
        path: 'me/profile',
        element: (
          <ProtectedRoute>
            <Profile />
          </ProtectedRoute>
        ),
      },
      {
        path: 'me/update_profile',
        element: (
          <ProtectedRoute>
            <UpdateProfile />
          </ProtectedRoute>
        ),
      },
      {
        path: 'me/upload_avatar',
        element: (
          <ProtectedRoute>
            <UploadAvatar />
          </ProtectedRoute>
        ),
      },
      {
        path: 'me/update_password',
        element: (
          <ProtectedRoute>
            <UpdatePassword />
          </ProtectedRoute>
        ),
      },
      {
        path: 'password/forgot',
        element: <ForgotPassword />,
      },
      {
        path: 'password/reset/:token',
        element: <ResetPassword />,
      },
      {
        path: 'cart',
        element: <Cart />,
      },
      {
        path: 'shipping',
        element: (
          <ProtectedRoute>
            <Shipping />
          </ProtectedRoute>
        ),
      },
      {
        path: 'confirm_order',
        element: (
          <ProtectedRoute>
            <ConfirmOrder />
          </ProtectedRoute>
        ),
      },
      {
        path: 'payment_method',
        element: (
          <ProtectedRoute>
            <PaymentMethod />
          </ProtectedRoute>
        ),
      },
      {
        path: 'me/orders',
        element: (
          <ProtectedRoute>
            <MyOrders />
          </ProtectedRoute>
        ),
      },
      {
        path: 'me/orders/:id',
        element: (
          <ProtectedRoute>
            <OrderDetails />
          </ProtectedRoute>
        ),
      },
      {
        path: 'invoice/:id',
        element: (
          <ProtectedRoute>
            <Invoice />
          </ProtectedRoute>
        ),
      },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Provider store={store}>
      <RouterProvider router={router} />
    </Provider>
  </React.StrictMode>,
);
