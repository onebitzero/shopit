import express from 'express';
import {
  getProducts,
  addProduct,
  getProductDetails,
  getAdminProducts,
  updateProductDetails,
  deleteProduct,
  canReview,
  createReview,
  getReviews,
  deleteReview,
  uploadProductImages,
  deleteProductImage,
} from '../controllers/productsController.js';
import { isUserAuthenticated, authorizeRoles } from '../middleware/auth.js';

const router = express.Router();

router.route('/products').get(getProducts);
router.route('/products/:id').get(getProductDetails);

router
  .route('/admin/products')
  .get(isUserAuthenticated, authorizeRoles('admin'), getAdminProducts)
  .put(isUserAuthenticated, authorizeRoles('admin'), addProduct);
router
  .route('/admin/products/:id')
  .put(isUserAuthenticated, authorizeRoles('admin'), updateProductDetails);
router
  .route('/admin/products/:id')
  .delete(isUserAuthenticated, authorizeRoles('admin'), deleteProduct);

router
  .route('/admin/product/upload_images/:id')
  .put(isUserAuthenticated, authorizeRoles('admin'), uploadProductImages);
router
  .route('/admin/product/delete_image/')
  .put(isUserAuthenticated, authorizeRoles('admin'), deleteProductImage);

router.route('/can_review').get(isUserAuthenticated, canReview);
router.route('/reviews').get(getReviews).put(isUserAuthenticated, createReview);

router
  .route('/admin/review')
  .delete(isUserAuthenticated, authorizeRoles('admin'), deleteReview);

export default router;
