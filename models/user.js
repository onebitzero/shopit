import mongoose from 'mongoose'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import crypto from 'crypto'

const userSchema = mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Please enter your name.'],
    maxLength: [50, 'Your name cannot exceed 50 characters.']
  },
  email: {
    type: String,
    required: [true, 'Please enter your email.'],
    unique: true
  },
  password: {
    type: String,
    required: [true, 'Please enter your password.'],
    minLength: [6, 'Your password must be of atleast 6 characters.'],
    select: false
  },
  avatar: {
    public_id: String,
    url: String
  },
  role: {
    type: String,
    default: 'user'
  },
  resetPasswordToken: String,
  resetPasswordTokenExpiryDate: Date
},
{ timestamps: true }
)

// Encrypt password before saving user
userSchema.pre('save', async function (next) {
  if (!this.isModified('password')) {
    next()
  }

  this.password = await bcrypt.hash(this.password, 10)
})

// Return JWT Token
userSchema.methods.getJwtToken = function () {
  return jwt.sign({ id: this._id }, process.env.JWT_SECRET, { expiresIn: process.env.JWT_EXPIRE_TIME })
}

// Validate password
userSchema.methods.validatePassword = async function (password) {
  return await bcrypt.compare(password, this.password)
}

// Generate reset password token
userSchema.methods.generateResetPasswordToken = function () {
  const resetPasswordToken = crypto.randomBytes(20).toString('hex')

  this.resetPasswordToken = crypto.createHash('sha256').update(resetPasswordToken).digest('hex')

  this.resetPasswordTokenExpiryDate = Date.now() + 30 * 60 * 60

  return resetPasswordToken
}

const User = mongoose.model('User', userSchema)
export default User
