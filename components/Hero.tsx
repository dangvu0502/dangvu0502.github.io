
const iconClass =
  "w-9 h-9 bg-raised border border-edge rounded-md flex items-center justify-center hover:bg-edge hover:-translate-y-0.5 transition-all duration-300";

export default function Hero() {
  return (
    <header className="max-w-[1200px] mx-auto py-12 md:py-16 border-b border-line">
      <div className="px-5 md:px-8">
        <div className="flex flex-col md:flex-row justify-between items-center gap-6 md:gap-5 mb-10 md:mb-12">
          <img
            src="/avatar.jpg"
            alt="Matt's avatar"
            width={80}
            height={80}
            className="w-20 h-20 rounded-full border-2 border-accent object-cover"
          />
          <div className="flex gap-3 md:gap-4">
            <a href="https://github.com/dangvu0502" target="_blank" rel="noopener noreferrer" aria-label="GitHub" className={iconClass}>
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#e8dfd6" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4"/><path d="M9 18c-4.51 2-5-2-7-2"/></svg>
            </a>
            <a href="mailto:dangvu0502@gmail.com" aria-label="Email" className={iconClass}>
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#e8dfd6" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><rect width="20" height="16" x="2" y="4" rx="2"/><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"/></svg>
            </a>
            <a href="https://www.linkedin.com/in/%C4%91%C4%83ng-v%C5%A9-a43920243/" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn" className={iconClass}>
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#e8dfd6" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"/><rect width="4" height="12" x="2" y="9"/><circle cx="4" cy="4" r="2"/></svg>
            </a>
          </div>
        </div>

        <div className="mb-8">
          <p className="mb-4 text-base leading-relaxed">
            I&apos;m <strong>Dang Vu (Matt)</strong>, a fullstack developer based in Vietnam.
          </p>
          <p className="mb-4 text-base leading-relaxed">
            Building performant, AI-powered web experiences with modern frameworks.
          </p>
          <p className="mb-4 text-base leading-relaxed">
            Rebuilt this site in Next.js (SSG); the previous version was Rust/Dioxus compiled to WASM.{" "}
            <a href="https://github.com/dangvu0502/dangvu0502.github.io" target="_blank" rel="noopener noreferrer" className="underline hover:text-accent">
              Both on GitHub
            </a>
            .
          </p>
          <a
            href="mailto:dangvu0502@gmail.com"
            className="inline-block mt-2.5 px-4 py-2 bg-accent text-white rounded-md font-medium hover:bg-accent-hover transition-colors duration-300"
          >
            Hire me 🚀
          </a>
        </div>
      </div>
    </header>
  );
}
