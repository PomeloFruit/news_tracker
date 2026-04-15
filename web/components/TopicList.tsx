import Link from 'next/link';
import { type Topic } from '@/lib/articles';

export default function TopicList({ topics }: { topics: Topic[] }) {
  return (
    <div className="grid gap-3">
      {topics.map((topic) => (
        <Link
          key={topic.query}
          href={`/player/${encodeURIComponent(topic.query)}`}
          className="group flex items-center justify-between border border-[#1E2430] bg-[#0D0F14] px-6 py-5 hover:border-amber-400/40 hover:shadow-[0_0_20px_rgba(251,191,36,0.06)] transition-all duration-300 hover:-translate-y-0.5 relative"
        >
          {/* Amber left accent */}
          <div className="absolute left-0 top-0 bottom-0 w-[2px] bg-amber-400 opacity-50 group-hover:opacity-100 transition-opacity duration-300" />

          <div className="pl-2">
            <p className="text-xs tracking-widest text-cyan-400/60 uppercase mb-1" style={{ fontFamily: 'var(--font-mono)' }}>
              {topic.category}
            </p>
            <h2
              className="text-2xl font-bold uppercase tracking-wide text-[#F0EDE8] group-hover:text-amber-300 transition-colors duration-200"
              style={{ fontFamily: 'var(--font-barlow)' }}
            >
              {topic.query}
            </h2>
          </div>

          <span className="text-amber-400/40 group-hover:text-amber-400 transition-colors duration-200 text-xl" style={{ fontFamily: 'var(--font-mono)' }}>
            →
          </span>
        </Link>
      ))}
    </div>
  );
}
