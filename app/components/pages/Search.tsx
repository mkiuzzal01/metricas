/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import Analyze from "./Analyze";
import { useValuationSearchMutation } from "@/app/redux/features/search/search.api";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";

interface SuggestionItem {
  id: number;
  address: string;
  city: string;
  market_value: number;
  price_per_sqm: number;
  confidence: number;
  location_score: number;
}

interface Props {
  suggestions?: SuggestionItem[];
  demo?: string;
  dic: any;
  lan: "en" | "de";
}

export default function SearchInput({
  dic,
  lan,
  suggestions = [],
  demo,
}: Props) {
  const [address, setAddress] = useState("");
  const [query, setQuery] = useState("");
  const [open, setOpen] = useState(false);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const router = useRouter();

  const [valuationSearch, { isLoading }] = useValuationSearchMutation();

  /* ---------------- AUTO FOCUS ---------------- */
  useEffect(() => {
    const t = setTimeout(() => inputRef.current?.focus(), 50);
    return () => clearTimeout(t);
  }, []);

  /* ---------------- FILTER ---------------- */
  const filteredSuggestions = useMemo(() => {
    const value = query.trim().toLowerCase();
    if (!value) return [];

    const map = new Map<string, SuggestionItem>();

    suggestions.forEach((item) => {
      const key = `${item.address}-${item.city}`;
      if (!map.has(key)) map.set(key, item);
    });

    return Array.from(map.values())
      .filter(
        (item) =>
          item.address.toLowerCase().includes(value) ||
          item.city.toLowerCase().includes(value),
      )
      .slice(0, 6);
  }, [query, suggestions]);

  // Example:
  const exampleCities = useMemo(() => {
    const set = new Set<string>();

    suggestions.forEach((item) => {
      if (item.city) set.add(item.city);
    });

    return Array.from(set).slice(0, 6);
  }, [suggestions]);

  /* ---------------- SEARCH ---------------- */
  const performSearch = useCallback(
    async (value: string, summaryId?: number | string | null) => {
      if (!value.trim()) return;

      try {
        setAddress(value);

        // ✅ SHOW ANIMATION FIRST (CRITICAL FIX)
        setIsAnalyzing(true);
        setOpen(false);

        // allow UI paint (VERY IMPORTANT)
        await new Promise((r) => requestAnimationFrame(r));

        let response;

        if (!demo) {
          response = await valuationSearch({
            address: value,
          }).unwrap();
        }

        const id = demo ? demo : response?.data?.id;

        if (!id) {
          throw new Error("No ID returned");
        }

        // optional delay so animation is visible (UX boost)
        setTimeout(() => {
          router.push(`/${lan}/summary/${id}`);
        }, 600);
      } catch (err: any) {
        toast.error(err?.data?.message || "Search failed");
        setIsAnalyzing(false);
      }
    },
    [demo, lan, router, valuationSearch],
  );

  const handleSelect = useCallback(
    (item: SuggestionItem) => {
      setQuery(item.address);
      performSearch(item.address, item.id);
    },
    [performSearch],
  );

  const handleSearch = useCallback(() => {
    const value = query.trim();
    if (!value) return;

    const matched = suggestions.find((item) =>
      item.address.toLowerCase().includes(value.toLowerCase()),
    );

    performSearch(value, matched?.id ?? null);
  }, [query, suggestions, performSearch]);

  /* ---------------- ANALYZE VIEW ---------------- */
  if (isAnalyzing) {
    return (
      <Analyze
        dic={dic}
        lan={lan}
        address={address}
        isLoading={true}
        isSuccess={false}
        isError={false}
      />
    );
  }

  /* ---------------- UI ---------------- */
  return (
    <div className="flex min-h-[calc(100vh-64px)] flex-col items-center justify-center px-6">
      <h1 className="mb-6 text-[10px] font-medium uppercase tracking-[0.25em] text-teal-500">
        {dic.search.label}
      </h1>

      {/* INPUT */}
      <div className="relative w-[370px] lg:w-[420px]">
        <input
          ref={inputRef}
          value={query}
          placeholder={dic.search.placeholder}
          disabled={isLoading}
          className="w-full rounded border border-white/10 bg-[#1a2937]
            px-6 py-4 text-[15px] text-white
            placeholder:text-[#67829a]
            outline-none transition
            focus:border-teal-500 focus:ring-1 focus:ring-teal-500/30"
          onChange={(e) => {
            setQuery(e.target.value);
            setOpen(true);
          }}
          onFocus={() => setOpen(true)}
          onBlur={() => setTimeout(() => setOpen(false), 120)}
          onKeyDown={(e) => {
            if (e.key === "Enter") handleSearch();
          }}
        />

        <button
          type="button"
          onClick={handleSearch}
          disabled={!query.trim() || isLoading}
          className="absolute right-2 top-1/2 flex h-10 w-10
            -translate-y-1/2 items-center justify-center
            rounded bg-teal-500 text-white"
        >
          🔍
        </button>
      </div>

      {/* SUGGESTIONS */}
      {open && filteredSuggestions.length > 0 && (
        <div className="mt-3 flex w-[370px] flex-col gap-1 lg:w-[420px]">
          {filteredSuggestions.map((item) => (
            <button
              key={item.id}
              onMouseDown={() => handleSelect(item)}
              className="group flex flex-col gap-1 rounded
                border border-white/5 bg-white/5
                px-4 py-2.5 text-left"
            >
              <div className="flex items-center gap-2">
                <div className="h-[5px] w-[5px] rounded-full bg-[#5a9e8e]" />
                <div className="text-[13px] text-white">{item.address}</div>
              </div>

              <div className="pl-4 text-[11px] text-[#7f8ea3]">
                {item.city} · € {item.market_value.toLocaleString("de-DE")} ·{" "}
                {item.price_per_sqm} €/m²
              </div>
            </button>
          ))}
        </div>
      )}

      {/* EXAMPLES */}

      {/* EXAMPLE CITIES (FROM DATA) */}
      {exampleCities.length > 0 && (
        <div className="mt-6 w-[370px] lg:w-[420px]">
          <h4 className="mb-2 text-[11px] uppercase tracking-widest text-[#7f8ea3]">
            {dic.search.examples}:
          </h4>

          <div className="flex flex-wrap gap-2">
            {exampleCities.map((city) => (
              <button
                key={city}
                onMouseDown={() => {
                  setQuery(city);
                  performSearch(city);
                }}
                className="rounded border border-white/10 bg-white/5 px-3 py-1 text-[12px] text-white hover:bg-white/10"
              >
                {city}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
