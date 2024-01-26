import express from 'express'
import { getProducts, addProduct, getProductDetails, updateProductDetails, deleteProduct, createReview, getReviews, deleteReview } from '../controllers/productsController.js'
import { isUserAuthenticated, authorizeRoles } from '../middleware/auth.js'

const router = express.Router()

router.route('/products').get(getProducts)
router.route('/products/:id').get(getProductDetails)

router.route('/admin/products').post(isUserAuthenticated, authorizeRoles('admin'), addProduct)
router.route('/admin/products/:id').put(isUserAuthenticated, authorizeRoles('admin'), updateProductDetails)
router.route('/admin/products/:id').delete(isUserAuthenticated, authorizeRoles('admin'), deleteProduct)

router.route('/reviews')
  .get(isUserAuthenticated, getReviews)
  .put(isUserAuthenticated, createReview)

router.route('/admin/reviews').delete(isUserAuthenticated, authorizeRoles('admin'), deleteReview)

export default router
