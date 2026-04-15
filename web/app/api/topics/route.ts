import pool from '@/lib/db';

export async function GET() {
  const result = await pool.query(
    'SELECT DISTINCT query, category FROM articles ORDER BY category'
  );
  return Response.json(result.rows);
}
