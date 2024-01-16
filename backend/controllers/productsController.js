import catchAsyncErrors from '../middleware/catchAsyncErrors.js'
import ApiFilters from '../utils/ApiFilters.js'
import Product from '../models/product.js'
import ErrorHandler from '../utils/ErrorHandler.js'

// Get details of all products /api/v1/products
export const getProducts = catchAsyncErrors(async (req, res) => {
  const resultsPerPage = 4

  const apiFilters = new ApiFilters(Product, req.query).search().filter()

  let products = await apiFilters.query
  const productsCount = products.length

  apiFilters.pagination(resultsPerPage)

  products = await apiFilters.query.clone()

  res.status(200).json({
    resultsPerPage,
    productsCount,
    products
  })
})

// Add new products /api/v1/admin/products
export const addProduct = catchAsyncErrors(async (req, res) => {
  const product = await Product.create(req?.body)

  res.status(200).json({
    product
  })
})

// Get details of a single product /api/v1/products/:id
export const getProductDetails = catchAsyncErrors(async (req, res, next) => {
  const product = await Product.findById(req?.params?.id).exec()

  if (product) {
    res.status(200).json({
      product
    })
  } else {
    next(new ErrorHandler('Couldn\'t find the product.', 404))
  }
})

// Update details of a single product /api/v1/products/:id
export const updateProductDetails = catchAsyncErrors(async (req, res, next) => {
  const product = await Product.findByIdAndUpdate(req?.params?.id, req?.body, { new: true })

  if (product) {
    res.status(200).json({
      product
    })
  } else {
    next(new ErrorHandler('Couldn\'t find the product.', 404))
  }
})

// Delete a single product /api/v1/products/:id
export const deleteProduct = catchAsyncErrors(async (req, res, next) => {
  const product = await Product.findById({ _id: req?.params?.id })

  if (product) {
    await product.deleteOne()
    res.status(200).json({
      product
    })
  } else {
    next(new ErrorHandler('Couldn\'t find the product.', 404))
  }
})
