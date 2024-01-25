import express from 'express'
import { isUserAuthenticated, authorizeRoles } from '../middleware/auth.js'
import { newOrder, getOrderDetails, myOrders, allOrders, updateOrder, deleteOrder } from '../controllers/orderCotroller.js'

const router = express.Router()

router.route('/order/new').post(isUserAuthenticated, newOrder)
router.route('/order/:id').get(isUserAuthenticated, getOrderDetails)

router.route('/me/orders').get(isUserAuthenticated, myOrders)

router.route('/admin/orders').get(isUserAuthenticated, authorizeRoles('admin'), allOrders)
router.route('/admin/orders/:id').put(isUserAuthenticated, authorizeRoles('admin'), updateOrder)
router.route('/admin/orders/:id').delete(isUserAuthenticated, authorizeRoles('admin'), deleteOrder)

export default router
