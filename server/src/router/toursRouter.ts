import express from 'express';
import { getTour, getTours } from '../controller/toursController';
const router = express.Router();

router.route('/').get(getTours);
router.route('/:id').get(getTour);

export default router;
