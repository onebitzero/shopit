import express from 'express';
import {
  registerUser,
  loginUser,
  logoutUser,
  forgotPassword,
  resetPassword,
  getUserProfile,
  uploadAvatar,
  updatePassword,
  updateUserProfile,
  getUsers,
  getUserDetails,
  updateUser,
  deleteUser,
} from '../controllers/authController.js';
import { isUserAuthenticated, authorizeRoles } from '../middleware/auth.js';

const router = express.Router();

router.route('/register').post(registerUser);
router.route('/login').post(loginUser);
router.route('/logout').get(logoutUser);

router.route('/password/forgot').post(forgotPassword);
router.route('/password/reset/:token').put(resetPassword);

router.route('/me').get(isUserAuthenticated, getUserProfile);
router.route('/me/update').put(isUserAuthenticated, updateUserProfile);
router.route('/me/upload_avatar').put(isUserAuthenticated, uploadAvatar);

router.route('/password/update').put(isUserAuthenticated, updatePassword);

router.route('/admin/users').get(isUserAuthenticated, authorizeRoles('admin'), getUsers);

router
  .route('/admin/user')
  .get(isUserAuthenticated, authorizeRoles('admin'), getUserDetails)
  .put(isUserAuthenticated, authorizeRoles('admin'), updateUser)
  .delete(isUserAuthenticated, authorizeRoles('admin'), deleteUser);

export default router;
