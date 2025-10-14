import { env } from '../config/env.js';
import app from './app.js';
import { testConnection } from '../config/db.js';
import '../models/index.js';

const start = async () => {
  try {
    await testConnection();
    app.listen(env.port, () => {
      console.log(`API running on http://localhost:${env.port}`);
    });
  } catch (err) {
    console.error('Failed to start server:', err);
    process.exit(1);
  }
};
start();
