/* eslint-disable @typescript-eslint/no-explicit-any */
interface KPICardProps {
  label: string;
  value: any;
  sub?: string;
  accent?: boolean;
  large?: boolean;
}

export default function KPICard({
  label,
  value,
  sub,
  accent,
  large,
}: KPICardProps) {
  return (
    <div className="bg-[#0d1520] border border-white/[0.06] rounded-md p-4 hover:border-white/10 transition-colors">
      <div className="text-[10px] font-semibold uppercase tracking-[0.22em] text-[#7f8ea3] mb-2">
        {label}
      </div>
      <div
        className={`leading-none ${
          large ? 'text-[22px]' : 'text-[22px]'
        } ${accent ? 'text-[rgba(90,158,142,0.95)]' : 'text-[#dce4ec]'}`}
      >
        {value ?? '-'}
      </div>
      {sub && (
        <div className="text-[11px] text-[#7f8ea3] mt-1 font-mono">{sub}</div>
      )}
    </div>
  );
}
