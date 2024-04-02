import catchAsyncError from '../middleware/catchAsyncErrors.js';
import Order from '../models/order.js';
import Product from '../models/product.js';
import ErrorHandler from '../utils/ErrorHandler.js';

// Create new order api/v1/orders/new
export const newOrder = catchAsyncError(async (req, res, next) => {
  const {
    orderItems,
    shippingDetails,
    itemsPrice,
    taxAmount,
    totalAmount,
    paymentMethod,
    paymentInfo,
  } = req.body;

  orderItems.forEach(async (item) => {
    const product = await Product.findById(item.productId.toString());

    if (!product) {
      return next(new ErrorHandler('Couldn\'t find the product.', 404));
    }

    product.stock -= item.quantity;

    await product.save({ validateBeforeSave: false });
  });

  const order = await Order.create({
    orderItems,
    shippingDetails,
    itemsPrice,
    taxAmount,
    totalAmount,
    paymentMethod,
    paymentInfo,
    user: req.user._id,
  });

  res.status(200).json({
    order,
  });
});

// Get details of an order api/v1/orders/:id
export const getOrderDetails = catchAsyncError(async (req, res, next) => {
  const order = await Order.findById(req.params.id).populate('user').exec();

  if (!order) {
    return next(new ErrorHandler('Couldn\'t find the order.', 404));
  }

  res.status(200).json({
    order,
  });
});

// Get details of all orders of current user /api/v1/me/orders
export const myOrders = catchAsyncError(async (req, res, next) => {
  const orders = await Order.find({ user: req.user._id }).populate('user', 'name email').exec();

  res.status(200).json({
    orders,
  });
});

// ADMIN Get details of all orders /api/v1/admin/orders
export const getAllOrders = catchAsyncError(async (req, res) => {
  const orders = await Order.find().exec();

  res.status(200).json({
    orders,
  });
});

// ADMIN Update details of an order /api/v1/admin/orders/
export const updateOrder = catchAsyncError(async (req, res, next) => {
  const order = await Order.findById(req.body.orderId).exec();

  if (!order) {
    return next(new ErrorHandler('Couldn\'t find the order.', 404));
  }

  if (order.orderStatus === 'Delivered') {
    return next(new ErrorHandler('You have already delivered this order.', 400));
  }

  order.orderStatus = req.body.orderStatus;

  if (req.body.orderStatus === 'Delivered') {
    order.paymentInfo.status = 'paid';
    order.deliveredAt = Date.now();
  }

  await order.save();

  return res.status(200).json({
    success: true,
  });
});

// ADMIN Delete an order /api/v1/admin/orders/
export const deleteOrder = catchAsyncError(async (req, res, next) => {
  const order = await Order.findById(req.body.orderId).exec();

  if (!order) {
    return next(new ErrorHandler('Couldn\'t find the order.', 404));
  }

  await order.deleteOne();

  res.status(200).json({
    success: true,
  });
});

// ADMIN Get orders and sales data /api/v1/admin/orders_and_sales
export const getOrdersAndSalesData = catchAsyncError(async (req, res, next) => {
  const startDate = new Date(req.query.startDate);
  const endDate = new Date(req.query.endDate);

  startDate.setUTCHours(0, 0, 0, 0);
  endDate.setUTCHours(23, 59, 59, 999);

  const ordersAndSalesData = await Order.aggregate([
    // Stage 1: Filter order documents by date
    {
      $match: { createdAt: { $gte: startDate, $lte: endDate } },
    },

    // Stage 2: Group remaining documents by date name and calculate total sales
    {
      $group: {
        _id: {
          $dateToString: {
            date: '$createdAt',
            format: '%Y-%m-%d',
          },
        },
        totalOrders: { $sum: 1 },
        totalSales: { $sum: '$itemsPrice' },
      },
    },
  ]);

  const salesAndOrderMap = new Map();

  let totalOrders = 0;
  let totalSales = 0;

  ordersAndSalesData.forEach((orderAndSaleData) => {
    const date = new Date(orderAndSaleData._id).toISOString().split('T')[0];
    const orders = orderAndSaleData.totalOrders;
    const sales = orderAndSaleData.totalSales;

    salesAndOrderMap.set(date, { orders, sales });

    totalOrders += orders;
    totalSales += sales;
  });

  const dates = [];
  const currentDate = startDate;
  while (currentDate <= endDate) {
    dates.push(currentDate.toISOString().split('T')[0]);

    currentDate.setDate(currentDate.getDate() + 1);
  }

  const finalOrderAndSalesData = dates.map((date) => ({
    date,
    orders: (salesAndOrderMap.get(date) || { orders: 0 }).orders,
    sales: (salesAndOrderMap.get(date) || { sales: 0 }).sales,
  }));

  res.status(200).json({
    finalOrderAndSalesData,
    totalSales,
    totalOrders,
  });
});
