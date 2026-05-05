'use client';

import { useParams, usePathname, useRouter } from 'next/navigation';

type Lan = 'en' | 'de';

export default function LanToggle() {
  const router = useRouter();
  const pathname = usePathname();
  const params = useParams();

  const currentLan = (params.lan as Lan) ?? 'en';

  const toggleLan = () => {
    const nextLan: Lan = currentLan === 'en' ? 'de' : 'en';

    localStorage.setItem('lan', nextLan);

    // replace only the locale segment
    const newPath = pathname.replace(/^\/(en|de)/, `/${nextLan}`);

    router.replace(newPath);
  };

  return (
    <button
      className="px-3.5 py-2 text-xs uppercase tracking-wide text-white/50 transition hover:text-white"
      aria-label="Toggle language"
      onClick={toggleLan}
    >
      {currentLan === 'en' ? 'DE' : 'EN'}
    </button>
  );
}
