import crypto from 'crypto';
import catchAsyncErrors from '../middleware/catchAsyncErrors.js';
import User from '../models/user.js';
import sendToken from '../utils/sendToken.js';
import ErrorHandler from '../utils/ErrorHandler.js';
import { getResetPasswordEmailTemplate } from '../utils/emailTemplates.js';
import sendEmail from '../utils/sendEmail.js';
import { uploadFile, deleteFile } from '../utils/cloudinary.js';

export const registerUser = catchAsyncErrors(async (req, res, next) => {
  const { name, email, password } = req.body;

  const user = await User.create({
    name,
    email,
    password,
  });

  sendToken(user, 201, res);
});

// Login user /api/v1/login
export const loginUser = catchAsyncErrors(async (req, res, next) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return next(new ErrorHandler('Please enter your Email and Password.', 400));
  }

  const user = await User.findOne({ email }).select('+password');

  if (!user) {
    return next(new ErrorHandler('Email doesn\'t exist.', 401));
  }

  const isPasswordValid = await user.validatePassword(password);

  if (!isPasswordValid) {
    return next(new ErrorHandler('Invalid password.', 401));
  }

  sendToken(user, 200, res);
});

// Logout user /api/v1/logout
export const logoutUser = catchAsyncErrors(async (req, res, next) => {
  res.cookie('token', null, {
    expires: new Date(Date.now()),
    httpOnly: true,
  });

  res.status(200).json({
    message: 'Logged out.',
  });
});

// Upload user avatar /api/v1/me/upload_avatar
export const uploadAvatar = catchAsyncErrors(async (req, res, next) => {
  const { public_id: publicId, url } = await uploadFile(req.body.avatar, 'shopIT/avatars');

  if (req.user.avatar.url) {
    await deleteFile(req.user.avatar.public_id);
  }

  const user = await User.findByIdAndUpdate(req.user._id, {
    avatar: { public_id: publicId, url },
  });

  res.status(200).json({
    user,
  });
});

// Forgot password /api/v1/password/forgot
export const forgotPassword = catchAsyncErrors(async (req, res, next) => {
  const user = await User.findOne({ email: req.body.email });

  if (!user) {
    return next(new ErrorHandler('User doesnot exist.', 404));
  }

  const resetPasswordToken = user.generateResetPasswordToken();

  await user.save();

  const resetUrl = `${process.env.FRONTEND_URL}/password/reset/${resetPasswordToken}`;

  const message = getResetPasswordEmailTemplate(user.name, resetUrl);

  try {
    await sendEmail({
      email: user.email,
      subject: 'ShopIt password recovery.',
      message,
    });

    res.status(200).json({
      message: `Email sent to ${user.email}`,
    });
  } catch (err) {
    user.resetPasswordToken = undefined;
    user.resetPasswordTokenExpiryDate = undefined;

    await user.save();

    return next(new ErrorHandler(err.message, 500));
  }
});

// Reset password /api/v1/password/reset/:resetPasswordToen
export const resetPassword = catchAsyncErrors(async (req, res, next) => {
  const resetPasswordToken = crypto.createHash('sha256').update(req.params.token).digest('hex');

  const user = await User.findOne({
    resetPasswordToken,
    resetPasswordTokenExpiryDate: { $gt: Date.now() },
  }).exec();

  if (!user) {
    return next(new Error('Reset link expired.', 400));
  }

  if (req.body.password !== req.body.confirmPassword) {
    return next(new Error('Passwords don\'t match.', 400));
  }

  user.password = req.body.password;

  user.resetPasswordToken = undefined;
  user.resetPasswordTokenExpiryDate = undefined;

  await user.save();

  sendToken(user, 200, res);
});

// Get user profile
export const getUserProfile = catchAsyncErrors(async (req, res, next) => {
  const user = await User.findById(req.user._id).exec();

  res.status(200).json({
    user,
  });
});

// Update password
export const updatePassword = catchAsyncErrors(async (req, res, next) => {
  const user = await User.findById(req.user._id).select('+password').exec();

  const isPasswordValid = await user.validatePassword(req.body.oldPassword);

  if (!isPasswordValid) {
    return next(new ErrorHandler('Incorrect old password.', 400));
  }

  user.password = req.body.newPassword;
  await user.save();

  res.status(200).json({
    success: true,
  });
});

// Update user profile
export const updateUserProfile = catchAsyncErrors(async (req, res, next) => {
  const newUserData = {
    name: req.body.name,
    email: req.body.email,
  };

  const user = await User.findByIdAndUpdate(req.user._id, newUserData, { new: true });

  res.status(200).json({
    user,
  });
});

// Admin Get details of all users /admin/users
export const getUsers = catchAsyncErrors(async (req, res) => {
  const users = await User.find();

  res.status(200).json({
    users,
  });
});

// Get details of a single user /admin/user
export const getUserDetails = catchAsyncErrors(async (req, res, next) => {
  const user = await User.findById(req.query.userId).exec();

  if (!user) {
    return next(new ErrorHandler('User doesn\'t exist.', 404));
  }

  res.status(200).json({
    user,
  });
});

// Admin Update user /admin/user
export const updateUser = catchAsyncErrors(async (req, res, next) => {
  const newUserData = {
    name: req.body.name,
    email: req.body.email,
    role: req.body.role,
  };

  const user = await User.findByIdAndUpdate(req.body.userId, newUserData);

  res.status(200).json({
    user,
  });
});

// Admin Delete user /admin/user
export const deleteUser = catchAsyncErrors(async (req, res, next) => {
  const user = await User.findById(req.body.userId).exec();

  if (!user) {
    return next(new ErrorHandler('User doesn\'t exist.', 404));
  }

  if (user.role === 'admin') {
    return next(new ErrorHandler('Can\'t delete Admin', 400));
  }

  if (user.avatar.public_id) {
    await deleteFile(user.avatar.public_id);
  }

  await User.findByIdAndDelete(req.body.userId);

  res.status(200).json({
    response: 'User deleted',
  });
});
