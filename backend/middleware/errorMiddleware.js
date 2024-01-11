import ErrorHandler from '../utils/ErrorHandler.js'

export default function errorMiddleware (err, req, res, next) {
  let error = {
    statusCode: err?.statusCode || 500,
    message: err?.message || 'Internal Server Error'
  }

  if (err?.name === 'CastError') {
    const message = `Couldn't find the product. Invalid ${err?.path}`
    error = new ErrorHandler(message, 404)
  }

  if (err?.name === 'ValidationError') {
    const message = Object.values(err.errors).map(value => value.message)
    error = new ErrorHandler(message, 400)
  }

  if (process.env.NODE_ENV === 'PRODUCTION') {
    res.status(error.statusCode).json({
      message: error.message
    })
  }

  if (process.env.NODE_ENV === 'DEVELOPMENT') {
    res.status(error.statusCode).json({
      message: error.message,
      error: err,
      stack: err?.stack
    })
  }
}
