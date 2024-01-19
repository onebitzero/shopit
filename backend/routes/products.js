import express from 'express'
import { getProducts, addProduct, getProductDetails, updateProductDetails, deleteProduct } from '../controllers/productsController.js'
import { isUserAuthenticated, authorizeRoles } from '../middleware/auth.js'

const router = express.Router()

router.route('/products').get(getProducts)
router.route('/admin/products').post(isUserAuthenticated, authorizeRoles('admin'), addProduct)
router.route('/products/:id').get(getProductDetails)
router.route('/admin/products/:id').put(isUserAuthenticated, authorizeRoles('admin'), updateProductDetails)
router.route('/admin/products/:id').delete(isUserAuthenticated, authorizeRoles('admin'), deleteProduct)

export default router
