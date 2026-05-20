/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import Link from "next/link";
import { useRouter } from "next/navigation";

interface Props {
  lan: "en" | "de";
  dic: any;
}

export default function InitialView({ lan, dic }: Props) {
  const router = useRouter();

  const handleStart = () => {
    router.push(`/${lan}/search`);
  };

  return (
    <div className="flex flex-col justify-center min-h-[calc(100vh-64px)] px-8 max-w-hero mx-auto">
      {/* Label */}
      <div className="text-[10px] tracking-wide uppercase text-[#5a9e8e] mb-8 flex items-center gap-3.5 font-medium fade-up">
        <span className="w-8 h-px bg-[#5a9e8e]" />
        {dic.initial.label}
      </div>

      {/* Main Heading */}
      <h1 className="font-serif text-[clamp(36px,6.5vw,58px)] font-normal leading-[1.08] text-white fade-up fade-up-d1">
        {dic.initial.heading1}
        <br />
        {dic.initial.heading2}
      </h1>

      {/* Sub heading */}
      <div className="font-serif text-[clamp(36px,6.5vw,58px)] font-normal italic leading-[1.08] text-[#1e2d3d] mb-10 fade-up fade-up-d1">
        {dic.initial.subHeading}
      </div>

      {/* Description */}
      <p className="text-[15px] leading-[1.75] text-[#30455a] max-w-[520px] mb-13 fade-up fade-up-d3">
        {dic.initial.description}
      </p>

      {/* Actions */}
      <div className="flex gap-3.5 flex-wrap fade-up fade-up-d4">
        <button
          onClick={handleStart}
          className="text-[11px] font-semibold tracking-[0.25em] uppercase px-9 py-4 bg-white text-black rounded-sm transition-all hover:opacity-90 active:scale-[0.97]"
        >
          {dic.initial.startBtn}
        </button>

        <Link href={"/demo"}>
          <button className="text-[11px] font-medium tracking-[0.25em] uppercase px-9 py-4 bg-transparent text-[#30455a] border border-white/10 rounded-sm transition-all hover:border-[#5a9e8e]/40 hover:text-[#5a9e8e]">
            {dic.initial.demoBtn}
          </button>
        </Link>
      </div>
    </div>
  );
}
