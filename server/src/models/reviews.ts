import { Document, model, Schema } from 'mongoose';

export interface IReview extends Document {
  review: string;
  rating: number;
  user: Schema.Types.ObjectId;
  tour: Schema.Types.ObjectId;
}

const reviewSchema = new Schema<IReview>(
  {
    review: String,
    rating: {
      type: Number,
      max: [5, 'The max value is 5'],
      min: [1, 'The min value is 1'],
    },
    user: {
      type: Schema.Types.ObjectId,

      ref: 'User',
      required: true,
    },
    tour: {
      type: Schema.Types.ObjectId,
      ref: 'Tours',
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

reviewSchema.index({ user: 1, tour: 1 }, { unique: true });

reviewSchema.pre(/^find/, function (next) {
  (this as any).populate({
    path: 'user',
    select: 'photo name _id role',
  });
  next();
});
export const Reviews = model<IReview>('Reviews', reviewSchema);
