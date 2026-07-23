import Link from 'next/link';

export default function HomePage() {
  return (
    <main className="max-w-7xl mx-auto px-6 py-20 text-center">
      <h1 className="text-5xl font-black">
        AI Prompt <span className="text-brand-500">World</span>
      </h1>

      <p className="mt-6 text-muted-foreground max-w-2xl mx-auto">
        Discover, share and explore high-quality AI prompts for ChatGPT,
        Gemini, Claude, Midjourney and more.
      </p>

      <div className="mt-10 flex justify-center gap-4">
        <Link
          href="/explore"
          className="rounded-xl bg-primary px-6 py-3 text-primary-foreground font-bold"
        >
          Explore Prompts
        </Link>

        <Link
          href="/submit"
          className="rounded-xl border border-border px-6 py-3 font-bold"
        >
          Submit Prompt
        </Link>
      </div>
    </main>
  );
}
