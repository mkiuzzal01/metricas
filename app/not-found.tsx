import Link from 'next/link';

export default function NotFoundPage() {
  return (
    <div className="flex min-h-screen w-full items-center justify-center bg-[#0a0e14] text-white">
      <div className="text-center">
        <h2 className="text-3xl font-semibold tracking-wide">
          404 — Not Found
        </h2>

        <p className="mt-3 text-sm text-white/50">
          Could not find the requested resource.
        </p>

        <Link
          href="/"
          className="mt-6 inline-block rounded-sm bg-[#5a9e8e] px-5 py-2 text-xs font-semibold uppercase tracking-wide text-[#0a0e14] transition hover:opacity-90"
        >
          Go Home
        </Link>
      </div>
    </div>
  );
}
