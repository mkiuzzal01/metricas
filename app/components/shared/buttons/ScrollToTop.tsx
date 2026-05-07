import React from 'react';

export default function ScrollToTop() {
  return (
    <button
      onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
      className="fixed bottom-6 right-6 w-[50px] h-[50px] bg-bg-surface border border-[rgba(90,158,142,0.9)] text-[#8eb3e9] rounded flex items-center justify-center text-xl cursor-pointer z-50 shadow-[0_4px_24px_rgba(0,0,0,0.4)] transition-all hover:bg-bg-elevated hover:border-accent-teal"
    >
      ↑
    </button>
  );
}
