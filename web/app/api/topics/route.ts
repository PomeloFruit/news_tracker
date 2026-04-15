import pool from '@/lib/db';

export async function GET() {
  try {
    const result = await pool.query(
      'SELECT DISTINCT query, category FROM articles ORDER BY category'
    );
    return Response.json(result.rows);
  } catch (err) {
    console.error('topics query failed', err);
    return Response.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
