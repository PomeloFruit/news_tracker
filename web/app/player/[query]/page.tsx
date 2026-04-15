import ArticleCard from '@/components/ArticleCard';
import { getArticlesByQuery, type Article } from '@/lib/articles';

interface PlayerPageProps {
  params: Promise<{ query: string }>;
}

export default async function PlayerPage({ params }: PlayerPageProps) {
  const { query: encodedQuery } = await params;
  const query = decodeURIComponent(encodedQuery);

  let articles: Article[] = [];
  try {
    articles = await getArticlesByQuery(query);
  } catch (err) {
    console.error('Failed to fetch articles', err);
    return (
      <main className="min-h-screen bg-[#0D0F14] px-6 py-10 max-w-4xl mx-auto">
        <div className="text-center py-20" style={{ fontFamily: 'var(--font-mono)' }}>
          <p className="text-lg text-amber-400">SIGNAL LOST</p>
          <p className="text-sm mt-2 text-[#6B7A8D]">Failed to load articles. Check your database connection.</p>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-[#0D0F14] px-6 py-10 max-w-4xl mx-auto">
      {/* Header */}
      <div className="mb-8 border-b border-[#1E2430] pb-6">
        <p className="text-xs tracking-widest text-cyan-400/60 uppercase mb-1" style={{ fontFamily: 'var(--font-mono)' }}>
          Live Feed
        </p>
        <h1
          className="text-5xl font-bold uppercase tracking-wide text-[#F0EDE8]"
          style={{ fontFamily: 'var(--font-barlow)' }}
        >
          {query}
        </h1>
        <p className="mt-2 text-sm text-[#6B7A8D]" style={{ fontFamily: 'var(--font-mono)' }}>
          {articles.length} article{articles.length !== 1 ? 's' : ''} found
        </p>
      </div>

      {/* Articles */}
      {articles.length === 0 ? (
        <div className="text-center py-20 text-[#2E3A4E]" style={{ fontFamily: 'var(--font-mono)' }}>
          <p className="text-lg">NO SIGNAL</p>
          <p className="text-sm mt-2">No articles found for this query.</p>
        </div>
      ) : (
        <div className="grid gap-4">
          {articles.map((article) => (
            <ArticleCard key={article.id} article={article} />
          ))}
        </div>
      )}
    </main>
  );
}
