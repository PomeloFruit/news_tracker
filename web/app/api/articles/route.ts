import { getArticlesByQuery } from '@/lib/articles';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const query = searchParams.get('query');

  if (!query) {
    return Response.json({ error: 'query param required' }, { status: 400 });
  }

  try {
    const articles = await getArticlesByQuery(query);
    return Response.json(articles);
  } catch (err) {
    console.error('articles query failed', err);
    return Response.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
