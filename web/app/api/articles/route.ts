import pool from '@/lib/db';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const query = searchParams.get('query');

  if (!query) {
    return Response.json({ error: 'query param required' }, { status: 400 });
  }

  try {
    const result = await pool.query(
      `SELECT id, title, source, author, description, url, published_at, url_to_image
       FROM articles
       WHERE query = $1
       ORDER BY published_at DESC`,
      [query]
    );
    return Response.json(result.rows);
  } catch (err) {
    console.error('articles query failed', err);
    return Response.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
