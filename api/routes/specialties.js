import { Router } from 'express';
import { Category, Specialty } from '../models/index.js';


export const router = Router();


router.get('/', async (req, res, next) => {
try {
const { categorySlug } = req.query;
const where = {};
if (categorySlug) {
const cat = await Category.findOne({ where: { slug: categorySlug } });
if (!cat) return res.json([]);
where.category_id = cat.id;
}
const rows = await Specialty.findAll({ where, order: [['name', 'ASC']] });
res.json(rows);
} catch (e) { next(e); }
});