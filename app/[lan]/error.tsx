'use client';

import { useEffect } from 'react';

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <div className="flex min-h-screen w-full items-center justify-center bg-[#0a0e14] text-white">
      <div className="text-center">
        <h2 className="text-2xl font-semibold">Something went wrong</h2>

        <p className="mt-2 text-sm text-white/50">
          An unexpected error occurred.
        </p>

        <button
          onClick={() => reset()}
          className="mt-6 rounded-sm bg-[#5a9e8e] px-5 py-2 text-xs font-semibold uppercase tracking-wide text-[#0a0e14] transition hover:opacity-90"
        >
          Try Again
        </button>
      </div>
    </div>
  );
}
