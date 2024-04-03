import React from 'react';
import ProtectedRoute from '../auth/ProtectedRoute';
import Dashboard from '../admin/Dashboard';
import NewProduct from '../admin/NewProduct';
import Products from '../admin/Products';
import UpdateProduct from '../admin/UpdateProduct';
import UploadImages from '../admin/UploadImages';
import Orders from '../admin/Orders';
import UpdateOrder from '../admin/UpdateOrder';
import Users from '../admin/Users';
import UpdateUser from '../admin/UpdateUser';
import Reviews from '../admin/Reviews';

const adminRoutes = [
  {
    path: 'admin/dashboard',
    element: (
      <ProtectedRoute admin>
        <Dashboard />
      </ProtectedRoute>
    ),
  },
  {
    path: 'admin/product/new',
    element: (
      <ProtectedRoute admin>
        <NewProduct />
      </ProtectedRoute>
    ),
  },
  {
    path: 'admin/products',
    element: (
      <ProtectedRoute admin>
        <Products />
      </ProtectedRoute>
    ),
  },
  {
    path: 'admin/products/update/:id',
    element: (
      <ProtectedRoute admin>
        <UpdateProduct />
      </ProtectedRoute>
    ),
  },
  {
    path: 'admin/products/upload_images/:id',
    element: (
      <ProtectedRoute admin>
        <UploadImages />
      </ProtectedRoute>
    ),
  },
  {
    path: 'admin/orders',
    element: (
      <ProtectedRoute admin>
        <Orders />
      </ProtectedRoute>
    ),
  },
  {
    path: 'admin/orders/update/:id',
    element: (
      <ProtectedRoute admin>
        <UpdateOrder />
      </ProtectedRoute>
    ),
  },
  {
    path: 'admin/users',
    element: (
      <ProtectedRoute admin>
        <Users />
      </ProtectedRoute>
    ),
  },
  {
    path: 'admin/users/update/:id',
    element: (
      <ProtectedRoute admin>
        <UpdateUser />
      </ProtectedRoute>
    ),
  },
  {
    path: 'admin/reviews',
    element: (
      <ProtectedRoute admin>
        <Reviews />
      </ProtectedRoute>
    ),
  },
];

export default adminRoutes;
