import TopicList from '@/components/TopicList';
import { getTopics, type Topic } from '@/lib/articles';

export default async function Home() {
  let topics: Topic[] = [];
  try {
    topics = await getTopics();
  } catch (err) {
    console.error('Failed to load topics', err);
    return (
      <main className="min-h-screen bg-[#0D0F14] px-6 py-10 max-w-4xl mx-auto">
        <div className="text-center py-20" style={{ fontFamily: 'var(--font-mono)' }}>
          <p className="text-lg text-amber-400">SIGNAL LOST</p>
          <p className="text-sm mt-2 text-[#6B7A8D]">Failed to connect to database.</p>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-[#0D0F14] px-6 py-10 max-w-4xl mx-auto">
      {/* Header */}
      <div className="mb-10 border-b border-[#1E2430] pb-8">
        <p className="text-xs tracking-widest text-cyan-400/60 uppercase mb-2" style={{ fontFamily: 'var(--font-mono)' }}>
          Sports Intelligence Terminal
        </p>
        <h1
          className="text-6xl font-bold uppercase tracking-wide text-[#F0EDE8]"
          style={{ fontFamily: 'var(--font-barlow)' }}
        >
          News Tracker
        </h1>
        <p className="mt-3 text-sm text-[#6B7A8D]" style={{ fontFamily: 'var(--font-mono)' }}>
          {topics.length} active feed{topics.length !== 1 ? 's' : ''}
        </p>
      </div>

      {topics.length === 0 ? (
        <div className="text-center py-20 text-[#2E3A4E]" style={{ fontFamily: 'var(--font-mono)' }}>
          <p className="text-lg">NO FEEDS CONFIGURED</p>
          <p className="text-sm mt-2">Add topics to config.py and run the pipeline.</p>
        </div>
      ) : (
        <TopicList topics={topics} />
      )}
    </main>
  );
}
