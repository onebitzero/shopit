import catchAsyncError from '../middleware/catchAsyncErrors.js'
import Order from '../models/order.js'
import Product from '../models/product.js'
import ErrorHandler from '../utils/ErrorHandler.js'

// Create new order api/v1/orders/new
export const newOrder = catchAsyncError(async (req, res, next) => {
  const {
    orderItems,
    shippingDetails,
    itemsPrice,
    taxAmount,
    totalAmount,
    paymentMethod,
    paymentInfo
  } = req.body

  const order = await Order.create({
    orderItems,
    shippingDetails,
    itemsPrice,
    taxAmount,
    totalAmount,
    paymentMethod,
    paymentInfo,
    user: req.user._id
  })

  res.status(200).json({
    order
  })
})

// Get order details api/v1/orders/:id
export const getOrderDetails = catchAsyncError(async (req, res, next) => {
  const order = await Order.findById(req.params.id).exec()

  if (!order) {
    return next(new ErrorHandler('Couldn\'t find the order.', 404))
  }

  res.status(200).json({
    order
  })
})

// Get details of all orders of current user /api/v1/me/orders
export const myOrders = catchAsyncError(async (req, res, next) => {
  const orders = await Order.find({ user: req.user._id }).populate('user', 'name email').exec()

  res.status(200).json({
    orders
  })
})

// ADMIN Get details of all orders /api/v1/admin/orders
export const allOrders = catchAsyncError(async (req, res, next) => {
  const orders = await Order.find().exec()

  res.status(200).json({
    orders
  })
})

// ADMIN Update details of an order /api/v1/admin/orders/:id
export const updateOrder = catchAsyncError(async (req, res, next) => {
  const order = await Order.findById(req.params.id).exec()

  if (!order) {
    return next(new ErrorHandler('Couldn\'t find the order.', 404))
  }

  if (order.orderStatus === 'Delivered') {
    return next(new ErrorHandler('You have already delivered this order.', 400))
  }

  order.orderItems.forEach(async item => {
    const product = await Product.findById(item.product.toString())

    if (!product) {
      return next(new ErrorHandler('Couldn\'t find the product.', 404))
    }

    product.stock = product.stock - item.quantity

    await product.save()
  })

  order.orderStatus = req.body.orderStatus
  order.deliveredAt = Date.now()

  await order.save()

  res.status(200).json({
    success: true
  })
})

// ADMIN Delete an order /api/v1/admin/orders/:id
export const deleteOrder = catchAsyncError(async (req, res, next) => {
  const order = await Order.findById(req.params.id).exec()

  if (!order) {
    return next(new ErrorHandler('Couldn\'t find the order.', 404))
  }

  await order.deleteOne()

  res.status(200).json({
    success: true
  })
})
