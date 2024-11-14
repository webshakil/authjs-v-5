import mongoose, { Schema, model, models, Document } from 'mongoose';

interface IUser extends Document {
  name: string;
  email: string;
  password: string;
  role: string;
  image: string; 
}

const userSchema = new Schema<IUser>({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  role: { type: String, default: 'user' },
  image: {
    type: String,
    default: '/images/default.png', 
  },
});

const User = models.User || model<IUser>('User', userSchema);

export default User;

