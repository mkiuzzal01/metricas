'use client';
import Link from 'next/link';
import { useState } from 'react';
import { Menu, X } from 'lucide-react';

import LanToggle from '../shared/buttons/LanToggle';
import RefreshAction from '../util/RefreshAction';
import { NavigationLink } from './navigation-links';

interface Props {
  navLinks: NavigationLink[];
  dic: { requestDemo: string };
}

export default function Navbar({ navLinks, dic }: Props) {
  const [showMenu, setShowMenu] = useState(false);

  return (
    <nav className="sticky top-0 z-50 w-full border-b border-white/10 bg-[#0a0e14]/80 backdrop-blur-xl">
      <div className="flex h-16 w-full items-center justify-between px-4 sm:px-6">
        {/* Logo */}
        <RefreshAction>
          <div className="flex cursor-pointer items-center gap-3">
            <div className="flex h-9 w-9 items-center justify-center rounded-lg border border-white/10 bg-linear-to-tr from-[#111927] to-[#0a0e14] text-sm font-bold text-[#5a9e8e]">
              M
            </div>

            <span className="text-sm font-semibold uppercase tracking-[0.25em] text-white/80">
              METRICAS
            </span>
          </div>
        </RefreshAction>

        {/* Desktop Navigation */}
        <div className="hidden items-center gap-2 lg:flex">
          {navLinks?.map((link) => (
            <Link
              key={link?.href}
              href={link?.href}
              className="rounded-md px-4 py-2 text-sm font-medium text-white/60 transition-all duration-200 hover:bg-white/5 hover:text-white"
            >
              {link?.label}
            </Link>
          ))}

          <div className="ml-2">
            <LanToggle />
          </div>

          <Link
            href="/demo"
            className="ml-2 rounded-lg bg-[#5a9e8e] px-5 py-2.5 text-sm font-semibold text-[#0a0e14] transition-all duration-200 hover:opacity-90"
          >
            {dic?.requestDemo}
          </Link>
        </div>

        {/* Mobile Actions */}
        <div className="flex items-center gap-3 lg:hidden">
          <LanToggle />

          <button
            onClick={() => setShowMenu((prev) => !prev)}
            className="rounded-md p-2 text-white transition hover:bg-white/10"
            aria-label="Toggle Menu"
          >
            {showMenu ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <div
        className={`overflow-hidden border-t border-white/10 bg-[#0a0e14] transition-all duration-300 lg:hidden ${
          showMenu ? 'max-h-[500px] opacity-100' : 'max-h-0 opacity-0'
        }`}
      >
        <div className="flex flex-col gap-1 px-4 py-4">
          {navLinks?.map((link) => (
            <Link
              key={link?.href}
              href={link?.href}
              onClick={() => setShowMenu(false)}
              className="rounded-md px-4 py-3 text-sm font-medium text-white/70 transition hover:bg-white/5 hover:text-white"
            >
              {link?.label}
            </Link>
          ))}

          <Link
            href="/demo"
            onClick={() => setShowMenu(false)}
            className="mt-3 rounded-lg bg-[#5a9e8e] px-4 py-3 text-center text-sm font-semibold text-[#0a0e14]"
          >
            {dic?.requestDemo}
          </Link>
        </div>
      </div>
    </nav>
  );
}
