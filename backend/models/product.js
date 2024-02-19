import mongoose from 'mongoose';

const productSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'Please enter the name of the product.'],
      maxLength: [200, 'Length of the name of the product cannot exceed 200 characters.'],
    },
    price: {
      type: Number,
      required: [true, 'Please enter the price of the product.'],
    },
    description: {
      type: String,
      required: [true, 'Please enter description for the product.'],
    },
    ratings: {
      type: Number,
      default: 0,
    },
    images: [
      {
        public_id: {
          type: String,
          required: true,
        },
        url: {
          type: String,
          required: true,
        },
      },
    ],
    category: {
      type: String,
      required: [true, 'Please assign a category to the product.'],
      enum: {
        values: ['Electronics', 'Camera', 'Laptop', 'Accessories', 'Headphone', 'Food', 'Book', 'Sports', 'Outdoor', 'Home'],
        message: 'Please assign a correct category to the product.',
      },
    },
    seller: {
      type: String,
      required: [true, 'Please enter seller of the product.'],
    },
    numOfReviews: {
      type: Number,
      default: 0,
    },
    reviews: [
      {
        user: {
          type: mongoose.Schema.Types.ObjectId,
          ref: 'User',
          required: true,
        },
        rating: {
          type: Number,
          required: true,
        },
        comment: {
          type: String,
          required: true,
        },
      },
    ],
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
  },
  { timestamps: true },
);

const Product = mongoose.model('Product', productSchema);
export default Product;
