import pool from '@/lib/db';

export interface Article {
  id: string;
  title: string;
  source: string;
  author: string | null;
  description: string | null;
  url: string;
  published_at: string;
  url_to_image: string | null;
}

export async function getArticlesByQuery(query: string): Promise<Article[]> {
  const result = await pool.query(
    `SELECT id, title, source, author, description, url, published_at, url_to_image
     FROM articles
     WHERE query = $1
     ORDER BY published_at DESC`,
    [query]
  );
  return result.rows;
}
