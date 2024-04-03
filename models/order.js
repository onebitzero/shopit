import mongoose from 'mongoose';

const orderSchema = new mongoose.Schema(
  {
    shippingDetails: {
      address: {
        type: String,
        required: true,
      },
      city: {
        type: String,
        required: true,
      },
      mobileNumber: {
        type: String,
        required: true,
      },
      pincode: {
        type: String,
        required: true,
      },
      country: {
        type: String,
        required: true,
      },
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: 'User',
    },
    orderItems: [{
      name: {
        type: String,
        required: true,
      },
      quantity: {
        type: String,
        required: true,
      },
      image: {
        type: String,
        required: true,
      },
      price: {
        type: String,
        required: true,
      },
      productId: {
        type: mongoose.Schema.Types.ObjectId,
        require: true,
        ref: 'Product',
      },
    }],
    paymentMethod: {
      type: String,
      required: [true, 'Please choose a payment method'],
      enum: {
        values: ['Pay on delivery', 'Online'],
        message: 'Please choose from one of these payment methods: Pay on delivery or Online.',
      },
    },
    paymentInfo: {
      id: String,
      status: String,
    },
    itemsPrice: {
      type: Number,
      required: true,
    },
    taxAmount: {
      type: Number,
      required: true,
    },
    totalAmount: {
      type: Number,
      required: true,
    },
    orderStatus: {
      type: String,
      enum: {
        values: ['Processing', 'Shipped', 'Delivered'],
        message: 'Please choose from one of these status: Processing, Shipped and Delivered.',
      },
      default: 'Processing',
    },
    deliveredAt: Date,
  },
  { timestamps: true },
);

const Order = mongoose.model('Order', orderSchema);

export default Order;
