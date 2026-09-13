export default function Section({ id, title, children }: { id: string; title: string; children: React.ReactNode }) {
  return (
    <section id={id} className="max-w-[1200px] mx-auto py-12 md:py-20 border-b border-line scroll-mt-20">
      <div className="px-5 md:px-8">
        <h2 className="text-2xl md:text-3xl text-white font-bold mb-8 md:mb-10">{title}</h2>
        {children}
      </div>
    </section>
  );
}

export function Topics({ topics }: { topics: string[] }) {
  if (!topics.length) return null;
  return (
    <div className="flex flex-wrap gap-2 mb-3">
      {topics.map((t) => (
        <span key={t} className="bg-raised border border-edge px-2.5 py-1 rounded text-xs text-muted">
          {t}
        </span>
      ))}
    </div>
  );
}
