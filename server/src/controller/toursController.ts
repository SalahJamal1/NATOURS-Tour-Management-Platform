import { Tours } from '../models/tours';
import { getDoc, getDocs } from './factory';

export const getTours = getDocs(Tours);
export const getTour = getDoc(Tours);
