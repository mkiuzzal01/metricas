'use client';
import { Loader2 } from 'lucide-react';
import { cn } from '@/lib/utils';

type Props = {
  title: string;
  loadingTitle?: string;
  isLoading?: boolean;
  className?: string;
  onClick?: () => void;
  type?: 'submit' | 'button' | 'reset';
};

export default function SubmitButton({
  title,
  loadingTitle = 'Processing...',
  isLoading = false,
  className,
  type = 'submit',
  onClick,
}: Props) {
  return (
    <button
      type={type}
      disabled={isLoading}
      onClick={onClick}
      className={cn(
        `
        w-full py-3 rounded-lg
        text-sm font-medium tracking-wide

        bg-[#5a9e8e]/10
        text-[#5a9e8e]

        border border-[#5a9e8e]/20

        hover:bg-[#5a9e8e]/15
        hover:border-[#5a9e8e]/40

        disabled:opacity-60
        disabled:cursor-not-allowed

        transition-all duration-300

        flex items-center justify-center gap-2
        `,
        className,
      )}
    >
      {isLoading && <Loader2 size={16} className="animate-spin" />}

      {isLoading ? loadingTitle : title}
    </button>
  );
}
