export default function NotFound() {
  return (
    <main className="max-w-[1200px] mx-auto py-20 px-5 md:px-8 text-center">
      <h1 className="text-3xl text-white font-bold mb-4">404</h1>
      <p className="text-body mb-6">Page not found.</p>
      <a href="/" className="inline-block px-4 py-2 bg-accent text-white rounded-md font-medium hover:bg-accent-hover transition-colors">
        Back home
      </a>
    </main>
  );
}
