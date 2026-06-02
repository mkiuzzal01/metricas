"use client";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import Analyze from "./Analyze";
import { setSummaryId } from "@/app/redux/features/surveySlice";
import { useAppDispatch } from "@/app/redux/hooks";
import { useValuationSearchMutation } from "@/app/redux/features/search/search.api";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";

interface AddressItem {
  id: string | number;
  address: string;
}

interface Props {
  reportList?: unknown;
  dic: {
    search: {
      label: string;
      placeholder: string;
      examples: string;
    };
    address: AddressItem[];
  };
  lan: "en" | "de";
}

export default function SearchInput({ dic, lan }: Props) {
  const [address, setAddress] = useState<string>("");
  const router = useRouter();
  const dispatch = useAppDispatch();
  const [valuationSearch, { isLoading, isSuccess, isError }] =
    useValuationSearchMutation();
  const inputRef = useRef<HTMLInputElement>(null);
  const [query, setQuery] = useState("");
  const [open, setOpen] = useState(false);
  const [startAnalyze, setStartAnalyze] = useState(false);

  /**
   * Auto focus
   */
  useEffect(() => {
    const timer = setTimeout(() => {
      inputRef.current?.focus();
    }, 50);

    return () => clearTimeout(timer);
  }, []);

  /**
   * Suggestions
   */
  const suggestions = useMemo(() => {
    const value = query.trim().toLowerCase();

    if (!value) return [];

    return dic.address.filter((item) =>
      item.address.toLowerCase().includes(value),
    );
  }, [query, dic.address]);

  /**
   * Logger
   */
  const logSearch = useCallback(
    (type: "submit" | "suggestion", value: string) => {
      setAddress(value);
    },
    [setAddress],
  );

  /**
   * Start analyze
   */
  const startAnalysis = useCallback(
    (summaryId: string | number | null) => {
      dispatch(setSummaryId(summaryId));

      setOpen(false);

      /**
       * IMPORTANT:
       * Show Analyze BEFORE API call
       */
      setStartAnalyze(true);
    },
    [dispatch],
  );

  /**
   * Main search handler
   */
  const performSearch = useCallback(
    async (
      value: string,
      type: "submit" | "suggestion",
      summaryId?: string | number | null,
    ) => {
      try {
        if (!value.trim()) return;

        logSearch(type, value);

        /**
         * Open Analyze immediately
         */
        startAnalysis(summaryId ?? null);

        const payload = {
          address: value,
        };

        const response = await valuationSearch(payload).unwrap();

        if (response.message) {
          router.push(`/${lan}/summary/${response?.data?.id}`);
        }
      } catch (err: any) {
        toast.error(err?.data?.message);
      }
    },
    [logSearch, startAnalysis, valuationSearch, router, lan],
  );

  /**
   * Suggestion click
   */
  const handleSelect = useCallback(
    async (item: AddressItem) => {
      setQuery(item.address);

      await performSearch(item.address, "suggestion", item.id);
    },
    [performSearch],
  );

  /**
   * Search submit
   */
  const handleSearch = useCallback(async () => {
    const value = query.trim();

    if (!value) return;

    const matchedItem = dic.address.find((item) =>
      item.address.toLowerCase().includes(value.toLowerCase()),
    );

    await performSearch(value, "submit", matchedItem?.id ?? null);
  }, [query, dic.address, performSearch]);

  /**
   * Render Analyze Page
   */
  if (startAnalyze) {
    return (
      <Analyze
        dic={dic}
        lan={lan}
        address={address}
        isLoading={isLoading}
        isSuccess={isSuccess}
        isError={isError}
      />
    );
  }

  return (
    <div className="flex min-h-[calc(100vh-64px)] flex-col items-center justify-center px-6">
      <h1 className="mb-6 text-[10px] font-medium uppercase tracking-[0.25em] text-teal-500">
        {dic.search.label}
      </h1>

      {/* SEARCH INPUT */}
      <div className="relative w-[370px] lg:w-[420px]">
        <input
          ref={inputRef}
          value={query}
          placeholder={dic.search.placeholder}
          disabled={isLoading}
          className="
            w-full rounded border border-white/10 bg-[#1a2937]
            px-6 py-4 text-[15px] text-white
            placeholder:text-[#67829a]
            outline-none transition
            focus:border-teal-500 focus:ring-1 focus:ring-teal-500/30
          "
          onChange={(e) => {
            setQuery(e.target.value);
            setOpen(true);
          }}
          onFocus={() => setOpen(true)}
          onBlur={() => {
            setTimeout(() => setOpen(false), 120);
          }}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              handleSearch();
            }
          }}
        />

        {/* SEARCH BUTTON */}
        <button
          type="button"
          onClick={handleSearch}
          disabled={!query.trim() || isLoading}
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
        <div className="mt-3 flex w-[370px] flex-col gap-1 lg:w-[420px]">
          {suggestions.map((item) => (
            <button
              key={item.id}
              type="button"
              disabled={isLoading}
              onMouseDown={() => handleSelect(item)}
              className="
                group flex items-center gap-4 rounded
                border border-white/5 bg-white/5
                px-4 py-2.5 transition-all duration-200
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
    </div>
  );
}
