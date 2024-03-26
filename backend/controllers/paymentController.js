import Stripe from 'stripe';
import catchAsyncErrors from '../middleware/catchAsyncErrors.js';
import Order from '../models/order.js';

const stripe = Stripe(process.env.STRIPE_SECRET_KEY);

// Create stripe checkout session api/v1/payment/checkout_session
export const stripeCheckoutSession = catchAsyncErrors(async (req, res, next) => {
  const shippingRate = req.body.itemsPrice >= 200 ? 'shr_1Oycr3SHMk5wFlWnsk3yf8DE' : 'shr_1OycsBSHMk5wFlWnJhWNvdeP';

  const lineItems = req.body.orderItems.map((item) => ({
    price_data: {
      currency: 'usd',
      product_data: {
        name: item.name,
        images: [item.image],
        metadata: { productId: item.productId },
      },
      unit_amount: item.price * 100,
    },
    quantity: item.quantity,
    tax_rates: ['txr_1OycsqSHMk5wFlWnXQoI7GOv'],
  }));

  const session = await stripe.checkout.sessions.create({
    client_reference_id: req.user._id.toString(),
    customer_email: req.user.email,
    payment_method_types: ['card'],
    success_url: `${process.env.FRONTEND_URL}/me/orders`,
    cancel_url: `${process.env.FRONTEND_URL}`,
    mode: 'payment',
    metadata: { ...req.body.shippingDetails, itemsPrice: req.body.itemsPrice },
    shipping_options: [
      {
        shipping_rate: shippingRate,
      },
    ],
    line_items: lineItems,
  });

  res.status(200).json({
    url: session.url,
  });
});

async function getOrderItems(lineItems) {
  return new Promise((resolve, reject) => {
    const cartItems = [];

    lineItems.data.forEach(async (item) => {
      const product = await stripe.products.retrieve(item.price.product);
      const { productId } = product.metadata;

      cartItems.push({
        productId,
        name: product.name,
        price: item.price.unit_amount_decimal / 100,
        quantity: item.quantity,
        image: product.images[0],
      });

      if (cartItems.length === lineItems.data.length) {
        resolve(cartItems);
      }
    });
  });
}
// Stripe webhook api/v1/payment/webhook
export const stripeWebhook = catchAsyncErrors(async (req, res, next) => {
  try {
    const signature = req.headers['stripe-signature'];

    const event = stripe.webhooks.constructEvent(
      req.rawBody,
      signature,
      process.env.STRIPE_WEBHOOK_SECRET,
    );

    if (event.type === 'checkout.session.completed') {
      const session = event.data.object;

      const lineItems = await stripe.checkout.sessions.listLineItems(session.id);

      const orderItems = await getOrderItems(lineItems);

      const user = session.client_reference_id;

      const totalAmount = session.amount_total / 100;
      const taxAmount = session.total_details.amount_tax / 100;
      const shippingAmount = session.total_details.amount_shipping / 100;
      const { itemsPrice } = session.metadata;

      const {
        address, mobileNumber, city, pincode, country,
      } = session.metadata;
      const shippingDetails = {
        address, mobileNumber, city, pincode, country,
      };

      const paymentInfo = {
        id: session.payment_intent,
        status: session.payment_status,
      };

      const orderData = {
        shippingDetails,
        user,
        orderItems,
        paymentMethod: 'Online',
        paymentInfo,
        itemsPrice,
        taxAmount,
        totalAmount,
      };

      await Order.create(orderData);

      res.status(200).json({
        success: true,
      });
    }
  } catch (error) {
    console.log(error);
  }
});
