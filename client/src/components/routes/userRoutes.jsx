import React from 'react';
import Home from '../Home';
import ProductDetails from '../product/ProductDetails';
import Login from '../auth/Login';
import Register from '../auth/Register';
import ProtectedRoute from '../auth/ProtectedRoute';
import Profile from '../user/Profile';
import UpdateProfile from '../user/UpdateProfile';
import UploadAvatar from '../user/UploadAvatar';
import UpdatePassword from '../user/UpdatePassword';
import ForgotPassword from '../auth/ForgotPassword';
import ResetPassword from '../auth/ResetPassword';
import Cart from '../cart/Cart';
import Shipping from '../cart/Shipping';
import ConfirmOrder from '../cart/ConfirmOrder';
import PaymentMethod from '../cart/PaymentMethod';
import MyOrders from '../order/MyOrders';
import OrderDetails from '../order/OrderDetails';
import Invoice from '../invoice/Invoice';

const userRoutes = [
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
];

export default userRoutes;
