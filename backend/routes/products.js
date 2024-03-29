import express from 'express';
import {
  getProducts,
  addProduct,
  getProductDetails,
  updateProductDetails,
  deleteProduct,
  createReview,
  getReviews,
  deleteReview,
  canReview,
} from '../controllers/productsController.js';
import { isUserAuthenticated, authorizeRoles } from '../middleware/auth.js';

const router = express.Router();

router.route('/products').get(getProducts);
router.route('/products/:id').get(getProductDetails);

router
  .route('/admin/products')
  .post(isUserAuthenticated, authorizeRoles('admin'), addProduct);
router
  .route('/admin/products/:id')
  .put(isUserAuthenticated, authorizeRoles('admin'), updateProductDetails);
router
  .route('/admin/products/:id')
  .delete(isUserAuthenticated, authorizeRoles('admin'), deleteProduct);

router.route('/can_review').get(isUserAuthenticated, canReview);
router.route('/reviews').get(getReviews).put(isUserAuthenticated, createReview);

router
  .route('/admin/reviews')
  .delete(isUserAuthenticated, authorizeRoles('admin'), deleteReview);

export default router;
