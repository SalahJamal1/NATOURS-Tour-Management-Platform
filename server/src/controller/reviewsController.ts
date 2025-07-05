import { Reviews } from '../models/reviews';
import { Users } from '../models/users';
import { getDoc, getDocs } from './factory';

export const getReviews = getDocs(Reviews);
export const getUsers = getDocs(Users);
export const getReview = getDoc(Reviews);
