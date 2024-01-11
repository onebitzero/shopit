import mongoose from 'mongoose'
import Product from '../models/product.js'
import products from './data.js'

async function seedProducts () {
  try {
    await mongoose.connect(process.env.MONGODB_URI)

    await Product.insertMany(products)
    console.log('Products are added successfully.')

    process.exit()
  } catch (error) {
    console.log(error.message)
    process.exit()
  }
}

seedProducts()
