import { Router } from 'express';
import { Artisan, ArtisanMonth } from '../models/index.js';


export const router = Router();


router.get('/month', async (req, res, next) => {
try {
const rows = await ArtisanMonth.findAll({
include: [{ model: Artisan }],
order: [['year', 'DESC'], ['month', 'DESC']],
limit: 3
});
res.json(rows.map(r => r.artisan));
} catch (e) { next(e); }
});