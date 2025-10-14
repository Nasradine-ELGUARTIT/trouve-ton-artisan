import express from 'express';
import helmet from 'helmet';
import cors from 'cors';
import pino from 'pino';
import pinoHttp from 'pino-http';
import { env } from '../config/env.js';

import apiKey from '../middleware/apiKeys.js'; // vérifie le nom exact du fichier
import { errorHandler, notFound } from '../middleware/error.js';

import { router as categories } from '../routes/categories.js';
import { router as specialties } from '../routes/specialties.js';
import { router as artisans } from '../routes/artisan.js';
import { router as featured } from '../routes/featured.js';
import { router as contact } from '../routes/contact.js';

const app = express(); // ✅ manquait probablement cette ligne

const logger = pino({ level: 'info' });

app.use(pinoHttp({ logger }));
app.use(helmet());
app.use(cors({ origin: env.corsOrigin, credentials: true }));
app.use(express.json({ limit: '1mb' }));

app.get('/health', (req, res) => res.json({ ok: true, uptime: process.uptime() }));

app.use('/api', apiKey);
app.use('/api/categories', categories);
app.use('/api/specialties', specialties);
app.use('/api/artisans', artisans);
app.use('/api/featured', featured);
app.use('/api/contact', contact);

app.use(notFound);
app.use(errorHandler);

export default app; 
