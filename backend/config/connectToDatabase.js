import mongoose from 'mongoose';

export default async function connectToDatabase() {
  await mongoose.connect(process.env.MONGODB_URI).catch((err) => console.log(err));
}
