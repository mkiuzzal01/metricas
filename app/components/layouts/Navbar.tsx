import Link from 'next/link';
import { getNavigationLinks } from './navigation-links';
import LanToggle from '../shared/buttons/LanToggle';
import { getDictionary } from '@/app/[lan]/dictionaries';
import RefreshAction from '../util/RefreshAction';

interface Props {
  lan: 'en' | 'de';
}

export default async function Navbar({ lan }: Props) {
  const dic = await getDictionary(lan);
  const navLinks = await getNavigationLinks(lan);

  return (
    <nav className="sticky top-0 z-50 h-16 w-full border-b border-white/10 bg-[#0a0e14]/80 backdrop-blur-xl">
      <div className="mx-auto flex h-full items-center justify-between px-6">
        {/* Logo */}
        <RefreshAction>
          <div className="flex  items-center gap-3.5">
            <div className="flex h-8 w-8 items-center justify-center rounded-md border border-white/10 bg-linear-to-br from-[#111927] to-[#0a0e14] text-sm font-bold text-[#5a9e8e]">
              M
            </div>
            <span className="text-sm font-semibold uppercase tracking-[0.25em] text-white/70">
              METRICAS
            </span>
          </div>
        </RefreshAction>

        {/* Navigation */}
        <div className="flex items-center gap-2">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="px-3.5 py-2 text-xs font-medium uppercase tracking-wide text-white/50 transition hover:text-white"
            >
              {link.label}
            </Link>
          ))}

          <LanToggle />

          <Link
            href="/demo"
            className="ml-2 rounded-sm bg-[#5a9e8e] px-4 py-2 text-xs font-semibold uppercase tracking-wide text-[#0a0e14] transition hover:opacity-90"
          >
            {dic.requestDemo}
          </Link>
        </div>
      </div>
    </nav>
  );
}
