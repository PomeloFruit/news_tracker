import { Pool } from 'pg';

if (!process.env.DATABASE_URL) {
  throw new Error('DATABASE_URL environment variable is not set');
}

declare global {
  // eslint-disable-next-line no-var
  var _pgPool: Pool | undefined;
}

const pool =
  global._pgPool ??
  (global._pgPool = new Pool({
    connectionString: process.env.DATABASE_URL,
  }));

pool.on('error', (err) => {
  console.error('Unexpected idle client error', err);
});

export default pool;
