/* eslint-disable @typescript-eslint/no-explicit-any */
'use client';

import { setSummaryId } from '@/app/redux/features/surveySlice';
import { useAppDispatch } from '@/app/redux/hooks';
import { useMemo, useRef, useState, useEffect } from 'react';

interface Props {
  dic: any;
}

export default function SearchInput({ dic }: Props) {
  const dispatch = useAppDispatch();
  const inputRef = useRef<HTMLInputElement>(null);

  const [query, setQuery] = useState('');
  const [open, setOpen] = useState(false);

  // ✅ Auto focus on mount
  useEffect(() => {
    const timer = setTimeout(() => {
      if (inputRef.current) {
        inputRef.current.focus();

        // place cursor at end
        const val = inputRef.current.value;
        inputRef.current.setSelectionRange(val.length, val.length);
      }
    }, 50); // small delay helps with UI rendering

    return () => clearTimeout(timer);
  }, []);

  const suggestions = useMemo(() => {
    if (!query.trim()) return [];
    return dic.address.filter((a: any) =>
      a.address.toLowerCase().includes(query.toLowerCase()),
    );
  }, [query, dic.address]);

  const handleSelect = (item: any) => {
    setQuery(item.address);
    setOpen(false);
    dispatch(setSummaryId(item.id));
  };

  return (
    <div className="flex min-h-[calc(100vh-64px)] flex-col items-center justify-center px-6">
      {/* Label */}
      <h1 className="mb-6 text-[10px] font-medium uppercase tracking-[0.25em] text-teal-500">
        {dic.search.label}
      </h1>

      {/* Input */}
      <div className="relative w-[420px]">
        <span className="absolute left-4 top-1/2 -translate-y-1/2 text-[#5a9e8e]">
          ⌕
        </span>

        <input
          ref={inputRef}
          value={query}
          onChange={(e) => {
            setQuery(e.target.value);
            setOpen(true);
          }}
          onFocus={() => setOpen(true)}
          onBlur={() => {
            // ✅ safer blur handling
            setTimeout(() => setOpen(false), 120);
          }}
          placeholder={dic.search.placeholder}
          className="
            w-full rounded border border-white/10 bg-[#1a2937]
            py-4 pl-12 pr-6 text-[15px] text-white
            placeholder:text-[#67829a]
            outline-none transition
            focus:border-teal-500 focus:ring-1 focus:ring-teal-500/30
          "
        />
      </div>

      {/* Suggestions */}
      {open && suggestions.length > 0 && (
        <div className="mt-3 flex w-[420px] flex-col gap-1">
          {suggestions.map((item: any) => (
            <button
              key={item.id}
              onMouseDown={() => handleSelect(item)}
              className="
                group flex items-center gap-4 rounded px-4 py-2.5
                border border-white/5 bg-white/5
                transition-all duration-200
                hover:border-[#5a9e8e]/30 hover:bg-white/10
              "
            >
              <div className="h-[5px] w-[5px] shrink-0 rounded-full bg-[#5a9e8e]" />

              <div className="text-left">
                <div className="text-[13px] text-white">{item.address}</div>
                <div className="mt-px text-[10px] text-white/40">
                  {dic.search.suggestion || 'Select location'}
                </div>
              </div>

              <div className="ml-auto text-[11px] font-semibold text-[#5a9e8e] opacity-0 transition group-hover:opacity-100">
                ↵
              </div>
            </button>
          ))}
        </div>
      )}

      {/* Examples */}
      <div className="mt-8 flex w-[420px] flex-wrap items-center gap-2.5">
        <span className="text-[10px] font-medium uppercase tracking-[0.25em] text-[#30455a]">
          {dic.search.examples}:
        </span>

        {dic.address.map((a: any) => (
          <button
            key={a.id}
            onClick={() => {
              setQuery(a.address);
              dispatch(setSummaryId(a.id));
            }}
            className="
              rounded-sm border border-white/10 px-4 py-2
              text-[11px] font-medium uppercase tracking-[0.25em] text-[#30455a]
              transition hover:border-[#5a9e8e]/40 hover:text-[#5a9e8e]
            "
          >
            {a.address}
          </button>
        ))}
      </div>
    </div>
  );
}
