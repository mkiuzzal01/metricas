"use client";
import { setSummaryId } from "@/app/redux/features/surveySlice";
import { useAppDispatch } from "@/app/redux/hooks";
import { useMemo, useRef, useState, useEffect } from "react";
import Analyze from "./Analyze";

interface Props {
  reportList?: any;
  dic: any;
  lan: "en" | "de";
}

export default function SearchInput({ reportList, dic, lan }: Props) {
  const dispatch = useAppDispatch();
  const inputRef = useRef<HTMLInputElement>(null);

  const [query, setQuery] = useState("");
  const [open, setOpen] = useState(false);
  const [startAnalyze, setStartAnalyze] = useState(false);

  // ✅ focus input on load
  useEffect(() => {
    const timer = setTimeout(() => {
      inputRef.current?.focus();
    }, 50);

    return () => clearTimeout(timer);
  }, []);

  // ✅ suggestions
  const suggestions = useMemo(() => {
    if (!query.trim()) return [];

    return dic.address.filter((a: any) =>
      a.address.toLowerCase().includes(query.toLowerCase()),
    );
  }, [query, dic.address]);

  // ✅ unified logger
  const logSearch = (value: string, source: "button" | "suggestion") => {
    console.log(`[${source}] Search value:`, value);
  };

  // ✅ select suggestion
  const handleSelect = (item: any) => {
    logSearch(item.address, "suggestion");

    setQuery(item.address);
    setOpen(false);
    dispatch(setSummaryId(item.id));
    setStartAnalyze(true);
  };

  // ✅ search button logic
  const handleSearch = () => {
    const value = (inputRef.current?.value || query).trim();

    logSearch(value, "button");

    if (!value) return;

    const match = suggestions.find((s: any) =>
      s.address.toLowerCase().includes(value.toLowerCase()),
    );

    if (match) {
      handleSelect(match);
    } else {
      console.log("[button] No match found, using raw input:", value);

      dispatch(setSummaryId(null));
      setStartAnalyze(true);
      setOpen(false);
    }
  };

  if (startAnalyze) {
    return <Analyze dic={dic} lan={lan} />;
  }

  return (
    <div className="flex min-h-[calc(100vh-64px)] flex-col items-center justify-center px-6">
      <h1 className="mb-6 text-[10px] font-medium uppercase tracking-[0.25em] text-teal-500">
        {dic.search.label}
      </h1>

      <div className="relative w-[370px] lg:w-[420px]">
        <input
          ref={inputRef}
          value={query}
          onChange={(e) => {
            setQuery(e.target.value);
            setOpen(true);
          }}
          onFocus={() => setOpen(true)}
          onBlur={() => setTimeout(() => setOpen(false), 120)}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              handleSearch();
            }
          }}
          placeholder={dic.search.placeholder}
          className="
            w-full rounded border border-white/10 bg-[#1a2937]
            py-4 px-6 text-[15px] text-white
            placeholder:text-[#67829a]
            outline-none transition
            focus:border-teal-500 focus:ring-1 focus:ring-teal-500/30
          "
        />

        {/* SEARCH BUTTON */}
        <button
          type="button"
          onClick={handleSearch}
          disabled={!query.trim()}
          className="
            absolute right-2 top-1/2 flex h-10 w-10
            -translate-y-1/2 items-center justify-center
            rounded bg-teal-500 text-white
            transition hover:bg-teal-400
            disabled:cursor-not-allowed disabled:opacity-50
          "
        >
          🔍
        </button>
      </div>

      {/* SUGGESTIONS */}
      {open && suggestions.length > 0 && (
        <div className="mt-3 flex w-[370px] lg:w-[420px] flex-col gap-1">
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

              <div className="text-left text-[13px] text-white">
                {item.address}
              </div>
            </button>
          ))}
        </div>
      )}

      {/* EXAMPLES */}
      <div className="mt-8 flex flex-wrap items-center gap-2.5">
        <span className="text-[8px] lg:text-[10px] font-medium uppercase tracking-[0.25em] text-[#30455a]">
          {dic.search.examples}:
        </span>

        {dic.address.map((a: any) => (
          <button
            key={a.id}
            onClick={() => handleSelect(a)}
            className="
              rounded-sm border border-white/10 px-4 py-2
              text-[8px] lg:text-[11px] font-medium uppercase tracking-[0.25em] text-[#30455a]
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
