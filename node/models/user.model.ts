import mongoose, { Document, Model, Schema } from 'mongoose';

export interface User extends Document {
  fullName: string;
  email: string;
  passwordHash: string;
  createdAt: Date;
  updatedAt: Date;
}

const userSchema = new Schema<User>(
  {
    fullName: {
      type: String,
      trim: true,
    },
    email: {
      type: String,
      unique: true,
      lowercase: true,
      trim: true,
    },
    passwordHash: {
      type: String,
      required: true,
    },
  },
  { timestamps: true },
);

export const UserModel: Model<User> =
  mongoose.models.User || mongoose.model<User>('User', userSchema);
