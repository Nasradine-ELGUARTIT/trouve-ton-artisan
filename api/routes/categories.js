import { Router } from 'express';
import { Category } from '../models/index.js';


export const router = Router();


router.get('/', async (req, res, next) => {
try {
const rows = await Category.findAll({ order: [['name', 'ASC']] });
res.json(rows);
} catch (e) { next(e); }
});