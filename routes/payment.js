import express from 'express';
import { isUserAuthenticated } from '../middleware/auth.js';
import { stripeCheckoutSession, stripeWebhook } from '../controllers/paymentController.js';

const router = express.Router();

router.route('/payment/checkout_session').post(isUserAuthenticated, stripeCheckoutSession);
router.route('/payment/webhook').post(stripeWebhook);

export default router;
