interface Props {
  label: string;
  value: number;
}

export default function SubScoreBar({ label, value }: Props) {
  return (
    <div className="flex items-center gap-2.5">
      <span className="text-[11px] text-[#7f8ea3] w-[68px] shrink-0">
        {label}
      </span>
      <div className="flex-1 h-[3px] bg-white/[0.06] rounded-full overflow-hidden">
        <div
          className="h-full bg-linear-to-r from-[rgba(90,158,142,0.9)] to-[rgba(90,158,142,0.4)] rounded-full"
          style={{ width: `${value}%` }}
        />
      </div>
      <span className="font-mono text-[11px] text-[#dce4ec] w-6 text-right">
        {value}
      </span>
    </div>
  );
}
