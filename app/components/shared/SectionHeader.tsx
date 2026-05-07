interface Props {
  label: string;
}

export default function SectionHeader({ label }: Props) {
  return (
    <div className="flex items-center gap-3 mt-9 mb-3.5">
      <span className="text-[11px] font-semibold uppercase tracking-[0.28em] text-[#7f8ea3] whitespace-nowrap">
        {label}
      </span>
      <span className="flex-1 h-px bg-white/6" />
    </div>
  );
}
