import mongoose from 'mongoose';

export default async function connectToDatabase() {
  await mongoose.connect(process.env.MONGODB_URI)
    .then(console.log('Connected to database'))
    .catch((err) => console.error(err));
}
