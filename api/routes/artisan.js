import { Router } from 'express';
import { Op } from 'sequelize';
import { Category, Specialty, Artisan } from '../models/index.js';
import { searchQuery } from '../services/validators.js';
import { paginate } from '../services/pagination.js';


export const router = Router();


router.get('/', async (req, res, next) => {
try {
const { value, error } = searchQuery.validate(req.query);
if (error) return res.status(422).json({ error: error.message });
const { q, category, specialty, page, limit } = value;
const where = {};
if (q) where.name = { [Op.like]: `%${q}%` };


if (specialty) {
const sp = await Specialty.findOne({ where: { slug: specialty } });
if (!sp) return res.json({ total: 0, items: [] });
where.specialty_id = sp.id;
} else if (category) {
const cat = await Category.findOne({ where: { slug: category } });
if (!cat) return res.json({ total: 0, items: [] });
const sps = await Specialty.findAll({ where: { category_id: cat.id }, attributes: ['id'] });
where.specialty_id = sps.map(s => s.id);
}


const { limit: l, offset } = paginate(page, limit);
const { count, rows } = await Artisan.findAndCountAll({
where,
include: [{ model: Specialty, include: [Category] }],
limit: l,
offset,
order: [['name', 'ASC']]
});


res.json({ total: count, items: rows });
} catch (e) { next(e); }
});


router.get('/:id', async (req, res, next) => {
try {
const id = parseInt(req.params.id, 10);
if (!Number.isInteger(id) || id <= 0) return res.status(422).json({ error: 'Invalid id' });
const row = await Artisan.findByPk(id, { include: [{ model: Specialty, include: [Category] }] });
if (!row) return res.status(404).json({ error: 'Not Found' });
res.json(row);
} catch (e) { next(e); }
});