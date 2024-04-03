import express from 'express';
import { isUserAuthenticated, authorizeRoles } from '../middleware/auth.js';
import {
  newOrder,
  getOrderDetails,
  myOrders,
  getAllOrders,
  updateOrder,
  deleteOrder,
  getOrdersAndSalesData,
} from '../controllers/orderCotroller.js';

const router = express.Router();

router.route('/order/new').put(isUserAuthenticated, newOrder);
router.route('/order/:id').get(isUserAuthenticated, getOrderDetails);

router.route('/me/orders').get(isUserAuthenticated, myOrders);

router
  .route('/admin/orders')
  .get(isUserAuthenticated, authorizeRoles('admin'), getAllOrders);

router
  .route('/admin/orders/update')
  .put(isUserAuthenticated, authorizeRoles('admin'), updateOrder);

router
  .route('/admin/orders/delete')
  .delete(isUserAuthenticated, authorizeRoles('admin'), deleteOrder);

router.route('/admin/orders_and_sales').get(isUserAuthenticated, authorizeRoles('admin'), getOrdersAndSalesData);

export default router;
