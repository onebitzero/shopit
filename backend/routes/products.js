import express from 'express'
import { getProducts, addProduct, getProductDetails, updateProductDetails, deleteProduct } from '../controllers/productsController.js'

const router = express.Router()

router.route('/products').get(getProducts)
router.route('/admin/products').post(addProduct)
router.route('/products/:id').get(getProductDetails)
router.route('/products/:id').put(updateProductDetails)
router.route('/products/:id').delete(deleteProduct)

export default router
