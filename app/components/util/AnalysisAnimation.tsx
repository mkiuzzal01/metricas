'use client';
import { nextStep } from '@/app/redux/features/surveySlice';
import { useAppDispatch } from '@/app/redux/hooks';
import { useEffect, useState } from 'react';

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
  addr: string;
}

export default function AnalysisAnimation({ dic, addr }: Props) {
  const dispatch = useAppDispatch();

  const [localStep, setLocalStep] = useState(0);

  const steps = dic.analysis.steps;

  // SMOOTH ANIMATION ENGINE
  useEffect(() => {
    if (localStep >= steps.length) {
      dispatch(nextStep());
      return;
    }

    const timer = setTimeout(() => {
      setLocalStep((prev) => prev + 1);
    }, 650);

    return () => clearTimeout(timer);
  }, [localStep, steps.length, dispatch]);

  return (
    <div className="flex flex-col items-center justify-center w-full min-h-[calc(100vh-64px)] px-6">
      {/* Loader */}
      <div className="relative mb-6 flex h-16 w-16 items-center justify-center rounded-full border border-[#5a9e8e]/40">
        <div className="absolute inset-[-8px] rounded-full border border-[#5a9e8e]/10 animate-pulse-ring" />
        <div className="h-2 w-2 rounded-full bg-[#5a9e8e] animate-dot-pulse" />
      </div>

      {/* Status */}
      <div className="mb-9 text-center text-[13px] text-white/50">
        {dic.analysis.analyzing}
        <br />
        <strong className="text-white/80 font-medium">{addr}</strong>
      </div>

      {/* Steps */}
      <div className="flex min-w-[420px] flex-col items-center justify-center space-y-1">
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
              ? 'scale-[1.01] bg-white/5 opacity-100'
              : isDone
                ? 'opacity-50'
                : 'opacity-20'
          }
        `}
            >
              {/* Dot */}
              <span
                className={`
            h-[6px] w-[6px] shrink-0 rounded-full
            transition-colors duration-300
            ${i <= localStep ? 'bg-[#5a9e8e]' : 'bg-white/30'}
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
  );
}
