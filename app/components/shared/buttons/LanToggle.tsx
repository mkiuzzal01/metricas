'use client';

import { useParams, usePathname, useRouter } from 'next/navigation';

type Lan = 'en' | 'de';

export default function LanToggle() {
  const router = useRouter();
  const pathname = usePathname();
  const params = useParams();

  const currentLan = (params.lan as Lan) || 'en';

  const toggleLan = () => {
    const nextLan: Lan = currentLan === 'en' ? 'de' : 'en';

    // Save locale cookie
    document.cookie = `NEXT_LOCALE=${nextLan}; path=/`;

    // Remove current locale prefix
    const cleanPath = pathname.replace(/^\/(en|de)/, '') || '/';

    // Add new locale
    const newPath = `/${nextLan}${cleanPath}`;

    router.replace(newPath);
  };

  return (
    <button
      onClick={toggleLan}
      aria-label="Toggle language"
      className="
        px-3.5 py-2
        text-xs uppercase tracking-wide
        text-white/50
        transition
        hover:text-[#5a9e8e]
      "
    >
      {currentLan === 'en' ? 'DE' : 'EN'}
    </button>
  );
}
