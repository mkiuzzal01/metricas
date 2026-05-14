'use client';

type Props = {
  error: Error & { digest?: string };
  reset: () => void;
};

export default function ErrorPage({ error, reset }: Props) {
  const message = error?.message || 'Something went wrong';

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#0a0e14] text-white p-6">
      <div className="max-w-md w-full rounded-2xl border border-white/10 bg-[#0b111a]/70 p-8 text-center">
        <h1 className="text-2xl font-semibold mb-3">Something went wrong</h1>

        <p className="text-sm text-white/60 mb-6">{message}</p>

        <button
          onClick={() => reset()}
          className="
            px-5 py-3 rounded-lg
            bg-[#5a9e8e]/10
            border border-[#5a9e8e]/20
            text-[#5a9e8e]
            hover:bg-[#5a9e8e]/20
            transition
          "
        >
          Try again
        </button>
      </div>
    </div>
  );
}
