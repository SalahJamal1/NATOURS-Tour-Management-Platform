import { Document, model, models, Schema } from 'mongoose';
import validator from 'validator';
import bcryptjs from 'bcryptjs';
export interface IUser extends Document {
  name: string;
  email: string;
  role: 'admin' | 'user' | 'guide' | 'lead-guide';
  active: boolean;
  photo: string;
  password: string;
  passwordConfirm?: string | undefined;
}

const userSchema = new Schema<IUser>(
  {
    name: {
      type: String,
      required: [true, 'please enter the name'],
    },
    email: {
      type: String,
      validate: [validator.isEmail, 'Please provide a valid email address.'],
      unique: true,
      lowercase: true,
      required: [true, 'please enter the email'],
    },
    role: {
      type: String,
      enum: {
        values: ['admin', 'user', 'guide', 'lead-guide'],
        message: 'The {VALUE} is not defin',
      },
      default: 'user',
    },
    active: {
      type: Boolean,
      default: true,
    },
    photo: {
      type: String,
      default: 'default.jpg',
    },
    password: {
      type: String,
      required: [true, 'please enter the password'],
      min: [8, 'the min number is 8'],
    },
    passwordConfirm: {
      type: String,
      required: [true, 'please confirm the password'],
      validate: {
        validator: function (value) {
          return value === this.password;
        },
        message: 'Passwords do not match.',
      },
    },
  },
  {
    timestamps: true,
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);

userSchema.virtual('bookings', {
  ref: 'Bookings',
  foreignField: 'user',
  localField: '_id',
});

userSchema.pre('findOne', function (next) {
  this.populate('bookings');
  next();
});
userSchema.pre('save', async function (next) {
  if (!this.isModified('password')) return next();
  this.password = await bcryptjs.hash(this.password, 12);
  this.passwordConfirm = undefined;
  next();
});
userSchema.methods.authProvider = async function (
  password: string,
  passwordHash: string
): Promise<boolean> {
  return await bcryptjs.compare(password, passwordHash);
};

export const Users = models.User || model<IUser>('User', userSchema);
