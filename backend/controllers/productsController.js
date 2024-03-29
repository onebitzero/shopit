import catchAsyncErrors from '../middleware/catchAsyncErrors.js';
import ApiFilters from '../utils/ApiFilters.js';
import Product from '../models/product.js';
import Order from '../models/order.js';
import ErrorHandler from '../utils/ErrorHandler.js';

// Get details of all products /api/v1/products
export const getProducts = catchAsyncErrors(async (req, res) => {
  const resultsPerPage = 4;

  const apiFilters = new ApiFilters(Product, req.query).search().filter();

  let products = await apiFilters.query;
  const productsCount = products.length;

  apiFilters.pagination(resultsPerPage);

  products = await apiFilters.query.clone();

  res.status(200).json({
    resultsPerPage,
    productsCount,
    products,
  });
});

// Add new products /api/v1/admin/products
export const addProduct = catchAsyncErrors(async (req, res) => {
  req.body.user = req.user._id;

  const product = await Product.create(req.body);

  res.status(200).json({
    product,
  });
});

// Get details of a single product /api/v1/products/:id
export const getProductDetails = catchAsyncErrors(async (req, res, next) => {
  const product = await Product.findById(req.params.id).exec();

  if (!product) {
    next(new ErrorHandler('Couldn\'t find the product.', 404));
  }

  res.status(200).json({
    product,
  });
});

// Update details of a single product /api/v1/products/:id
export const updateProductDetails = catchAsyncErrors(async (req, res, next) => {
  const product = await Product.findByIdAndUpdate(req.params.id, req.body, { new: true });

  if (!product) {
    next(new ErrorHandler('Couldn\'t find the product.', 404));
  }

  res.status(200).json({
    product,
  });
});

// Delete a single product /api/v1/products/:id
export const deleteProduct = catchAsyncErrors(async (req, res, next) => {
  const product = await Product.findById(req.params.id).exec();

  if (!product) {
    next(new ErrorHandler('Couldn\'t find the product.', 404));
  }

  await product.deleteOne();

  res.status(200).json({
    product,
  });
});

// Can the user review the product api/v1/can_review
export const canReview = catchAsyncErrors(async (req, res, next) => {
  const orders = await Order.find({ user: req.user._id, 'orderItems.productId': req.query.productId }).exec();

  if (orders.length === 0) {
    return res.status(200).json({
      canReview: false,
    });
  }

  res.status(200).json({
    canReview: true,
  });
});

// Create or Update user review /api/v1/reviews
export const createReview = catchAsyncErrors(async (req, res, next) => {
  const { rating, comment, productId } = req.body;

  const review = {
    user: req.user.id,
    rating: Number(rating),
    comment,
  };

  const product = await Product.findById(productId).exec();

  if (!product) {
    next(new ErrorHandler('Couldn\'t find the product.', 404));
  }

  const isReviewed = product.reviews.find(
    (review) => review.user.toString() === req.user._id.toString(),
  );

  if (isReviewed) {
    isReviewed.rating = rating;
    isReviewed.comment = comment;
  } else {
    product.reviews.push(review);
    product.numOfReviews = product.reviews.length;
  }

  product.ratings = product.reviews.reduce((accumulator, review) => review.rating + accumulator, 0)
  / product.numOfReviews;

  await product.save({ validateBeforeSave: false });

  res.status(200).json({
    success: true,
  });
});

// Get all reviews of a product api/v1/reviews
export const getReviews = catchAsyncErrors(async (req, res, next) => {
  const product = await Product.findById(req.query.productId).populate('reviews.user').exec();

  if (!product) {
    return next(new ErrorHandler('Couldn\'t find the product.', 404));
  }

  res.status(200).json({
    reviews: product.reviews,
  });
});

// ADMIN Delete a review of a product api/v1/admin/reviews
export const deleteReview = catchAsyncErrors(async (req, res, next) => {
  const product = await Product.findById(req.query.productId).exec();

  if (!product) {
    return next(new ErrorHandler('Couldn\'t find the product.', 404));
  }

  product.reviews = product.reviews.filter((review) => review._id.toString() !== req.query.id.toString());

  product.numOfReviews = product.reviews.length;
  product.ratings = product.numOfReviews && product.reviews.reduce((accumulator, review) => review.rating + accumulator, 0) / product.numOfReviews;

  await product.save({ validateBeforeSave: false });

  res.status(200).json({
    success: true,
  });
});
