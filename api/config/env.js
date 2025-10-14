import 'dotenv/config';

export const env = {
  node: process.env.NODE_ENV || 'development',
  port: parseInt(process.env.PORT || '4000', 10),
  corsOrigin: process.env.CORS_ORIGIN || 'http://localhost:5173',
  apiKey: process.env.API_KEY,

  db: {
    host: process.env.DB_HOST || '127.0.0.1',
    port: parseInt(process.env.DB_PORT || '3306', 10),
    name: process.env.DB_NAME || 'tta',
    user: process.env.DB_USER || 'tta_user',
    pass: process.env.DB_PASS || 'tta_password',
  },

  smtp: {
    host: process.env.SMTP_HOST || '127.0.0.1',
    port: parseInt(process.env.SMTP_PORT || '1025', 10),
    user: process.env.SMTP_USER || '',
    pass: process.env.SMTP_PASS || '',
    from: process.env.SMTP_FROM || 'Trouve ton artisan <no-reply@tta.local>',
  }
};
