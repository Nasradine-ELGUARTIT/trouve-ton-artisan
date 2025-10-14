// api/services/validators.js
import Joi from 'joi';

// ── Requête de liste
export const searchQuery = Joi.object({
  q: Joi.string().trim().allow(''),           // texte recherche libre (nom)
  categorySlug: Joi.string().trim().alphanum().allow(''),
  specialtySlug: Joi.string().trim().allow(''),
  city: Joi.string().trim().allow(''),
  minRating: Joi.number().min(0).max(5).optional(),
  page: Joi.number().integer().min(1).default(1),
  limit: Joi.number().integer().min(1).max(50).default(12),
  sort: Joi.string().valid('rating', 'name').default('rating')
}).unknown(false);

// ── Paramètre fiche artisan
export const idParam = Joi.object({
  id: Joi.number().integer().required()
});

// ── Corps du formulaire de contact
export const contactBody = Joi.object({
  artisanId: Joi.number().integer().required(),
  name: Joi.string().min(2).max(120).required(),
  email: Joi.string().email().required(),
  subject: Joi.string().min(2).max(160).required(),
  message: Joi.string().min(5).max(5000).required(),
  hpt: Joi.string().allow('').optional() // honeypot
});
