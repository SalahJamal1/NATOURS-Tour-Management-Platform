import express from 'express';
import { createBooking } from '../controller/bookingController';
import { protect } from '../controller/auth';
const router = express.Router();

router.route('/:tourId').post(protect, createBooking);

export default router;
