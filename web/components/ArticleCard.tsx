import Image from 'next/image';
import Link from 'next/link';

interface Article {
  id: string;
  title: string;
  source: string;
  author: string | null;
  description: string | null;
  url: string;
  published_at: string;
  url_to_image: string | null;
}

function timeAgo(dateStr: string): string {
  const date = new Date(dateStr);
  if (isNaN(date.getTime())) return 'Unknown date';
  const diffMs = new Date().getTime() - date.getTime();
  if (diffMs < 0) return 'Just now';
  const diffMins = Math.floor(diffMs / 60000);
  if (diffMins < 60) return `${diffMins}m ago`;
  const diffHours = Math.floor(diffMins / 60);
  if (diffHours < 24) return `${diffHours}h ago`;
  const diffDays = Math.floor(diffHours / 24);
  return `${diffDays}d ago`;
}

export default function ArticleCard({ article }: { article: Article }) {
  return (
    <Link
      href={article.url}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={`${article.title} (opens in new tab)`}
      className="group block"
    >
      <article className="relative bg-[#0D0F14] border border-[#1E2430] hover:border-amber-400/40 transition-all duration-300 hover:-translate-y-0.5 hover:shadow-[0_0_24px_rgba(251,191,36,0.08)]">
        {/* Amber accent left border */}
        <div className="absolute left-0 top-0 bottom-0 w-[2px] bg-amber-400 opacity-60 group-hover:opacity-100 transition-opacity duration-300" />

        {/* Image */}
        {article.url_to_image && (
          <div className="relative w-full h-44 overflow-hidden">
            <Image
              src={article.url_to_image}
              alt={article.title}
              fill
              className="object-cover brightness-75 group-hover:brightness-90 transition-all duration-500 group-hover:scale-[1.02]"
            />
            {/* Scanline overlay */}
            <div
              className="absolute inset-0 pointer-events-none"
              style={{
                background: 'repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(0,0,0,0.12) 2px, rgba(0,0,0,0.12) 4px)',
              }}
            />
            {/* Bottom gradient fade */}
            <div className="absolute inset-x-0 bottom-0 h-16 bg-gradient-to-t from-[#0D0F14] to-transparent" />
          </div>
        )}

        <div className="px-5 py-4 pl-7">
          {/* Source ticker bar */}
          <div className="flex items-center gap-2 mb-2 text-xs tracking-widest text-cyan-400/70 uppercase" style={{ fontFamily: 'var(--font-mono)' }}>
            <span>{article.source}</span>
            <span className="text-[#2E3A4E]">•</span>
            <span>{timeAgo(article.published_at)}</span>
          </div>

          {/* Title */}
          <h2
            className="text-xl font-bold uppercase tracking-wide text-[#F0EDE8] leading-tight group-hover:text-amber-300 transition-colors duration-200 mb-2"
            style={{ fontFamily: 'var(--font-barlow)', fontSize: '1.25rem', lineHeight: '1.3' }}
          >
            {article.title}
          </h2>

          {/* Description */}
          {article.description && (
            <p className="text-sm text-[#6B7A8D] leading-relaxed line-clamp-2" style={{ fontFamily: 'var(--font-mono)' }}>
              {article.description}
            </p>
          )}
        </div>
      </article>
    </Link>
  );
}
