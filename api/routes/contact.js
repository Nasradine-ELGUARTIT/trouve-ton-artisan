import { Router } from 'express';
import contactLimiter from '../middleware/rateLimit.js';
import { contactBody } from '../services/validators.js';
import { ContactLog, Artisan } from '../models/index.js';
import { sendContactMail } from '../services/mailer.js';

export const router = Router();

router.post('/', contactLimiter, async (req, res, next) => {
  try {
    const { value, error } = contactBody.validate(req.body);
    if (error) return res.status(422).json({ error: error.message });

    // simple honeypot
    if (value.hpt) return res.status(202).json({ ok: true });

    const artisan = await Artisan.findByPk(value.artisanId);
    if (!artisan) return res.status(404).json({ error: 'Artisan not found' });

    await ContactLog.create({
      artisan_id: value.artisanId,
      name: value.name,
      email: value.email,
      subject: value.subject,
      message: value.message,
      ip: req.ip,
      user_agent: req.get('user-agent')
    });

    await sendContactMail({
      to: artisan.email_contact,
      name: value.name,
      email: value.email,
      subject: value.subject,
      message: value.message,
    });

    res.status(200).json({ ok: true });
  } catch (err) {
    next(err);
  }
});
