import catchAsyncErrors from '../middleware/catchAsyncErrors.js'
import ErrorHandler from '../utils/ErrorHandler.js'
import jwt from 'jsonwebtoken'
import User from '../models/user.js'

export const isUserAuthenticated = catchAsyncErrors(async (req, res, next) => {
  const { token } = req.cookies

  if (!token) {
    return next(new ErrorHandler('Please login to access this resource.', 401))
  }

  const decoded = jwt.verify(token, process.env.JWT_SECRET)

  req.user = await User.findById(decoded.id).exec()

  next()
})

export const authorizeRoles = (...roles) => {
  return async (req, res, next) => {
    if (!roles.includes(req.user.role)) {
      return next(new ErrorHandler(`${req.user.role} Role is not authorized to access this resource.`, 403))
    }

    next()
  }
}
