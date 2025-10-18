import { Schema, model, Document, Model } from 'mongoose';
import { Users } from './users';
type location = {
  description: string;
  type: 'Point';
  coordinates: [number, number];
  address: string;
  day?: number;
};
export interface IToure extends Document {
  startLocation: location;
  ratingsAverage: number;
  ratingsQuantity: number;
  images: string[];
  startDates: Date[];
  name: string;
  duration: number;
  maxGroupSize: number;
  difficulty: 'medium' | 'easy' | 'difficult';

  guides: Schema.Types.ObjectId[];
  price: number;
  summary: string;
  description: string;
  imageCover: string;
  locations: location[];
}

const tourSchema = new Schema<IToure>(
  {
    startLocation: {
      description: String,
      type: {
        type: String,
        enum: ['Point'],
      },
      coordinates: [Number],
      address: String,
    },
    ratingsAverage: {
      type: Number,
      max: [5, 'The max value is 5'],
      min: [1, 'The min value is 1'],
      set: (value: number) => {
        return Math.round(value * 10) / 10;
      },
    },
    ratingsQuantity: Number,
    images: [String],
    startDates: [Date],
    name: String,
    duration: Number,
    maxGroupSize: Number,
    difficulty: {
      type: String,
      enum: {
        values: ['medium', 'easy', 'difficult'],
        message: 'The {VALUE} is not defin',
      },
    },
    guides: [
      {
        type: Schema.Types.ObjectId,
        ref: 'User',
      },
    ],
    price: Number,
    summary: String,
    description: String,
    imageCover: String,
    locations: [
      {
        description: String,
        type: {
          type: String,
          enum: ['Point'],
        },
        coordinates: [Number],
        day: Number,
      },
    ],
  },
  {
    timestamps: true,
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);

tourSchema.index({ name: 1 }, { unique: true });
tourSchema.virtual('reviews', {
  ref: 'Reviews',
  foreignField: 'tour',
  localField: '_id',
});

tourSchema.pre(/^find/, function (next) {
  (this as any).populate('reviews').populate('guides');
  next();
});

export const Tours = model<IToure>('Tours', tourSchema);
