import { getTopics } from '@/lib/articles';

export async function GET() {
  try {
    const topics = await getTopics();
    return Response.json(topics);
  } catch (err) {
    console.error('topics query failed', err);
    return Response.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
