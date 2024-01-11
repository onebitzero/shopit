import dotenv from 'dotenv'
import express from 'express'
import connectToDatabase from './config/connectToDatabase.js'
import productRouter from './routes/products.js'
import errorMiddleware from './middleware/errorMiddleware.js'

// Handle uncaught exceptions
process.on('uncaughtException', (err, origin) => {
  console.log(`Caught exception: ${err}\n` + `Exception origin: ${origin}`)
  process.exit(1)
})

dotenv.config({ path: 'backend/config/config.env' })

const app = express()
app.use(express.json())

connectToDatabase()

app.use('/api/v1', productRouter)

app.use(errorMiddleware)

const server = app.listen(process.env.PORT, () => {
  console.log(`shopit listening on port ${process.env.PORT} in ${process.env.NODE_ENV} mode.`)
})

// Handle promise rejection
process.on('unhandledRejection', (reason) => {
  console.log(reason)
  server.close(() => {
    process.exit(1)
  })
})
