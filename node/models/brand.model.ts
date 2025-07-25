import mongoose, { Document, Model, Schema } from 'mongoose';

export interface Brand extends Document {
  name: string;
  description: string;
  logoUrl: string;
  createdAt: Date;
  updatedAt: Date;
}

const brandSchema = new Schema<Brand>(
  {
    name: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },
    description: {
      type: String,
      default: 'Без описания',
    },
    logoUrl: {
      type: String,
      default: 'https://www.svgrepo.com/show/443484/brand-thingiverse.svg',
    },
  },
  { timestamps: true },
);

export const BrandModel: Model<Brand> =
  mongoose.models.Brand || mongoose.model<Brand>('Brand', brandSchema);
