import express from 'express';
import { getReview, getReviews } from '../controller/reviewsController';
const router = express.Router();

router.route('/').get(getReviews);
router.route('/:id').get(getReview);

export default router;
