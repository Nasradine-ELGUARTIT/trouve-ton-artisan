import { env } from '../config/env.js';


export default function apiKey(req, res, next) {
const key = req.get('x-api-key');
if (!key || key !== env.apiKey) {
return res.status(401).json({ error: 'Unauthorized' });
}
return next();
}