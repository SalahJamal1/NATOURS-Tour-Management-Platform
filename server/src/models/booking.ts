import { Document, model, Schema } from 'mongoose';

export interface IBooking extends Document {
  tour: Schema.Types.ObjectId;
  user: Schema.Types.ObjectId;
  price: number;
}

const bookingSchema = new Schema<IBooking>(
  {
    tour: {
      type: Schema.Types.ObjectId,
      ref: 'Tours',
    },
    user: {
      type: Schema.Types.ObjectId,
      ref: 'User',
    },
    price: Number,
  },
  {
    timestamps: true,
  }
);

bookingSchema.pre(/^find/, function (next) {
  (this as any).populate('tour');
  next();
});

export const Booking = model('Bookings', bookingSchema);
