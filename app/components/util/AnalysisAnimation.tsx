"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Container from "../shared/Container";

type Step = {
  label: string;
  sub: string;
};

interface Props {
  dic: {
    analysis: {
      analyzing: string;
      steps: Step[];
    };
  };
  lan: "en" | "de";
  isSuccess: boolean | any;
  address: string;
}

export default function AnalysisAnimation({
  dic,
  lan,
  isSuccess,
  address,
}: Props) {
  const router = useRouter();
  const [localStep, setLocalStep] = useState(0);
  const steps = dic.analysis.steps;

  /**
   * Step Animation
   */
  useEffect(() => {
    /**
     * Stop at final step
     */
    if (localStep >= steps.length) {
      return;
    }

    const timer = setTimeout(() => {
      setLocalStep((prev) => prev + 1);
    }, 650);

    return () => clearTimeout(timer);
  }, [localStep, steps.length]);

  /**
   * Navigate ONLY when:
   * 1. Animation completed
   * 2. API success completed
   */
  useEffect(() => {
    const isAnimationFinished = localStep >= steps.length;

    if (isAnimationFinished && isSuccess) {
      router.push(`/${lan}/summary`);
    }
  }, [isSuccess, lan, localStep, router, steps.length]);

  return (
    <Container>
      <div className="flex min-h-[calc(100vh-64px)] w-full flex-col items-center justify-center px-6">
        {/* Loader */}
        <div className="relative mb-6 flex h-16 w-16 items-center justify-center rounded-full border border-[#5a9e8e]/40">
          <div className="animate-pulse-ring absolute inset-[-8px] rounded-full border border-[#5a9e8e]/10" />

          <div className="animate-dot-pulse h-2 w-2 rounded-full bg-[#5a9e8e]" />
        </div>

        {/* Status */}
        <div className="mb-9 text-center text-[13px] text-white/50">
          {dic.analysis.analyzing}

          <br />

          <strong className="font-medium text-white/80">{address}</strong>
        </div>

        {/* Steps */}
        <div className="flex w-[370px] flex-col items-center justify-center space-y-1 lg:w-[420px]">
          {steps.map((s, i) => {
            const isActive = i === localStep;

            const isDone = i < localStep;

            return (
              <div
                key={i}
                className={`
                  flex w-full items-center gap-4 rounded px-4 py-2.5
                  transition-all duration-500 ease-out
                  ${
                    isActive
                      ? "scale-[1.01] bg-white/5 opacity-100"
                      : isDone
                        ? "opacity-50"
                        : "opacity-20"
                  }
                `}
              >
                {/* Dot */}
                <span
                  className={`
                    h-[6px] w-[6px] shrink-0 rounded-full
                    transition-colors duration-300
                    ${i <= localStep ? "bg-[#5a9e8e]" : "bg-white/30"}
                  `}
                />

                {/* Text */}
                <div className="flex flex-col">
                  <div className="text-[13px] font-medium text-white/80">
                    {s.label}
                  </div>

                  <div className="text-[10px] text-white/40">{s.sub}</div>
                </div>

                {/* Check */}
                {isDone && (
                  <span className="ml-auto text-[11px] font-semibold text-[#5a9e8e]">
                    ✓
                  </span>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </Container>
  );
}
