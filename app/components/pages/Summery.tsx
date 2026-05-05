/* eslint-disable @typescript-eslint/no-explicit-any */
'use client';

import { useAppSelector } from '@/app/redux/hooks';
import { eur, safe } from '../lib/currency';
import SectionHeader from '../shared/SectionHeader';

interface Props {
  dic: any;
}

function KPICard({
  label,
  value,
  sub,
  accent = false,
  large = false,
}: {
  label: string;
  value: any;
  sub?: string;
  accent?: boolean;
  large?: boolean;
}) {
  return (
    <div className="bg-[#0d1520] border border-white/[0.06] rounded-md p-4 hover:border-white/10 transition-colors">
      <div className="text-[8px] font-semibold uppercase tracking-[0.22em] text-[#7f8ea3] mb-2">
        {label}
      </div>
      <div
        className={`font-serif leading-none ${
          large ? 'text-[17px]' : 'text-[22px]'
        } ${accent ? 'text-[rgba(90,158,142,0.95)]' : 'text-[#dce4ec]'}`}
      >
        {value ?? '-'}
      </div>
      {sub && (
        <div className="text-[9px] text-[#7f8ea3] mt-1 font-mono">{sub}</div>
      )}
    </div>
  );
}

function SubScoreBar({ label, value }: { label: string; value: number }) {
  return (
    <div className="flex items-center gap-2.5">
      <span className="text-[10px] text-[#7f8ea3] w-[68px] shrink-0">
        {label}
      </span>
      <div className="flex-1 h-[3px] bg-white/[0.06] rounded-full overflow-hidden">
        <div
          className="h-full bg-gradient-to-r from-[rgba(90,158,142,0.9)] to-[rgba(90,158,142,0.4)] rounded-full"
          style={{ width: `${value}%` }}
        />
      </div>
      <span className="font-mono text-[10px] text-[#dce4ec] w-6 text-right">
        {value}
      </span>
    </div>
  );
}

export default function Summery({ dic }: Props) {
  const { summaryId } = useAppSelector((state) => state.survey);
  const data = dic?.summary?.[summaryId];

  if (!data) {
    return (
      <div className="p-6 text-[#7f8ea3] font-mono text-sm">
        No valuation data available
      </div>
    );
  }

  return (
    <div
      className="relative z-10 max-w-3xl mx-auto px-5 pb-24"
      style={{ fontFamily: "'DM Sans', sans-serif" }}
    >
      {/* ═════ HEADER ═════ */}
      <div className="text-center py-12 border-b border-white/[0.06] mb-2 relative">
        {/* top glow line */}
        <div
          className="absolute top-0 left-1/2 -translate-x-1/2 h-px w-64"
          style={{
            background:
              'linear-gradient(90deg, transparent, rgba(90,158,142,0.7), transparent)',
          }}
        />

        <div className="text-[11px] tracking-[0.22em] text-[#9fb0c0] font-mono uppercase mb-2">
          {data.city || 'Unknown Address'}
        </div>

        <div className="inline-block text-[9px] uppercase tracking-[0.3em] text-[rgba(90,158,142,0.9)] bg-[rgba(90,158,142,0.08)] border border-[rgba(90,158,142,0.2)] px-2.5 py-1 rounded-sm mb-4">
          Marktwertermittlung
        </div>

        <div
          className="text-[clamp(38px,8vw,56px)] text-[#dce4ec] leading-none tracking-tight"
          style={{ fontFamily: "'DM Serif Display', serif" }}
        >
          € {eur(data.marktwert)}
        </div>

        <div className="font-mono text-[11px] tracking-[0.1em] text-[#3a4a5c] mt-2">
          Spanne: € {eur(data.spanne?.[0])} — € {eur(data.spanne?.[1])}
        </div>

        <div className="inline-flex items-center gap-2 mt-4 px-3 py-1.5 bg-[rgba(90,158,142,0.08)] border border-[rgba(90,158,142,0.2)] rounded-full text-[10px] text-[rgba(90,158,142,0.9)] uppercase font-semibold tracking-[0.15em]">
          <span className="w-1.5 h-1.5 bg-[rgba(90,158,142,0.9)] rounded-full animate-pulse" />
          Konfidenz {safe(data.confidence)}%
        </div>
      </div>

      {/* ═════ KEY METRICS ═════ */}
      <SectionHeader label="Kernkennzahlen" />
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
        <KPICard
          label="Preis / m²"
          value={
            data.qm_preis ? `€ ${data.qm_preis.toLocaleString('de-DE')}` : '-'
          }
        />
        <KPICard
          label="Trend 1J"
          value={data.trend_1j != null ? `+${data.trend_1j}%` : '-'}
          accent
        />
        <KPICard
          label="Trend 5J"
          value={data.trend_5j != null ? `+${data.trend_5j}%` : '-'}
          accent
        />
        <KPICard
          label="Prognose 1J"
          value={data.prognose_1j != null ? `+${data.prognose_1j}%` : '-'}
          accent
        />
      </div>

      {/* ═════ LOCATION SCORE ═════ */}
      <SectionHeader label="Standortanalyse" />
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
        {/* big score */}
        <div className="bg-[#0d1520] border border-white/[0.06] rounded-md p-6 text-center relative overflow-hidden">
          <div
            className="absolute inset-0 pointer-events-none"
            style={{
              background:
                'radial-gradient(ellipse at center bottom, rgba(90,158,142,0.08) 0%, transparent 70%)',
            }}
          />
          <div className="text-[9px] uppercase tracking-[0.2em] text-[#7f8ea3] mb-2">
            Lage-Score
          </div>
          <div
            className="text-[52px] text-[rgba(90,158,142,0.95)] leading-none"
            style={{ fontFamily: "'DM Serif Display', serif" }}
          >
            {safe(data.lage_score)}
          </div>
          <div className="font-mono text-[9px] text-[#7f8ea3] mt-2 tracking-[0.1em]">
            Mikro · Makro · Infra
          </div>
        </div>

        {/* sub scores */}
        <div className="bg-[#0d1520] border border-white/[0.06] rounded-md p-5 flex flex-col justify-center gap-3">
          {data.lage_sub && (
            <>
              <SubScoreBar label="Mikrolage" value={data.lage_sub.mikrolage} />
              <SubScoreBar label="Makrolage" value={data.lage_sub.makrolage} />
              <SubScoreBar
                label="Infrastruktur"
                value={data.lage_sub.infrastruktur}
              />
              <SubScoreBar label="Sozial" value={data.lage_sub.sozial} />
            </>
          )}
        </div>
      </div>

      {/* ═════ MARKET DATA ═════ */}
      <SectionHeader label="Marktdaten" />
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
        <KPICard
          label="Kaltmiete /m²"
          value={data.miete_kalt ? `€ ${data.miete_kalt}` : '-'}
        />
        <KPICard
          label="Bruttorendite"
          value={data.rendite_brutto ? `${data.rendite_brutto}%` : '-'}
          accent
        />
        <KPICard
          label="Mietmultiplikator"
          value={data.mietmultiplikator ? `${data.mietmultiplikator}×` : '-'}
        />
        <KPICard
          label="Vermarktung"
          value={data.vermarktung_tage ? `${data.vermarktung_tage} Tage` : '-'}
        />
      </div>

      {/* ═════ PROPERTY DETAILS ═════ */}
      <SectionHeader label="Objektdaten" />
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
        <KPICard label="Zimmer" value={safe(data.zimmer)} />
        <KPICard
          label="Wohnfläche"
          value={data.wohnflaeche ? `${data.wohnflaeche} m²` : '-'}
        />
        <KPICard label="Etage" value={safe(data.etage)} />
        <KPICard label="Baujahr" value={safe(data.baujahr)} />
      </div>

      {/* ═════ COMPARABLES ═════ */}
      <SectionHeader label="Vergleichsobjekte" />
      <div className="bg-[#0d1520] border border-white/[0.06] rounded-md overflow-hidden">
        {data.comparables?.length ? (
          data.comparables.map((c: any, i: number) => (
            <div
              key={i}
              className="flex justify-between items-center px-4 py-3 border-b border-white/[0.04] last:border-0 hover:bg-[#111b28] transition-colors"
            >
              <div>
                <div className="text-[#dce4ec] text-[13px]">
                  {c.addr || '-'}
                </div>
                <div className="font-mono text-[9px] text-[#7f8ea3] mt-0.5">
                  {c.qm || '-'} m² · {c.dist || '-'} · Bj. {c.bj || '-'}
                </div>
              </div>
              <div className="text-right">
                <div
                  className="text-[rgba(90,158,142,0.95)] text-[16px]"
                  style={{ fontFamily: "'DM Serif Display', serif" }}
                >
                  € {c.preis ? c.preis.toLocaleString('de-DE') : '-'}
                </div>
                <div className="font-mono text-[9px] text-[#7f8ea3] mt-0.5">
                  € {c.qm_p ? c.qm_p.toLocaleString('de-DE') : '-'} /m²
                </div>
              </div>
            </div>
          ))
        ) : (
          <div className="p-4 text-[#7f8ea3] text-sm">
            No comparables available
          </div>
        )}
      </div>

      {/* ═════ INFRASTRUCTURE ═════ */}
      <SectionHeader label="Infrastruktur" />
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-1.5">
        {data.infrastruktur?.length ? (
          data.infrastruktur.map((item: any, i: number) => (
            <div
              key={i}
              className="flex items-center gap-2 px-3 py-2.5 bg-[#0d1520] border border-white/[0.06] rounded hover:border-white/10 transition-colors"
            >
              <span className="text-[14px] shrink-0">{item.icon}</span>
              <span className="flex-1 text-[10px] text-[#7f8ea3]">
                {item.de || item.en || '-'}
              </span>
              <span className="font-mono text-[10px] text-[rgba(90,158,142,0.9)] font-medium shrink-0">
                {item.val || '-'}
              </span>
            </div>
          ))
        ) : (
          <div className="text-[#7f8ea3] text-sm col-span-full">
            No infrastructure data
          </div>
        )}
      </div>

      {/* ═════ QUARTIERSPROFIL ═════ */}
      {data.sozio && (
        <>
          <SectionHeader label="Quartiersprofil" />
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
            <KPICard
              label="Kaufkraft-Index"
              value={safe(data.sozio.kaufkraft_idx)}
              sub="ø 100"
            />
            <KPICard
              label="Ø Alter"
              value={safe(data.sozio.altersschnitt)}
              sub="Jahre"
            />
            <KPICard
              label="Einwohner/km²"
              value={
                data.sozio.einwohner_qkm
                  ? data.sozio.einwohner_qkm.toLocaleString('de-DE')
                  : '-'
              }
            />
            <KPICard
              label="Arbeitslosenquote"
              value={
                data.sozio.arbeitslosenquote
                  ? `${data.sozio.arbeitslosenquote}%`
                  : '-'
              }
              accent
            />
            <KPICard
              label="Akademikeranteil"
              value={
                data.sozio.akademiker_anteil
                  ? `${data.sozio.akademiker_anteil}%`
                  : '-'
              }
            />
            <KPICard
              label="Bodenrichtwert"
              value={
                data.bodenrichtwert
                  ? `€ ${data.bodenrichtwert.toLocaleString('de-DE')}/m²`
                  : '-'
              }
              large
            />
          </div>
        </>
      )}

      {/* ═════ ACTIONS ═════ */}
      <div className="grid grid-cols-2 gap-2 mt-9">
        <button className="py-3.5 rounded text-[11px] font-semibold uppercase tracking-[0.18em] bg-[rgba(90,158,142,0.9)] text-[#080d12] hover:bg-[rgba(90,158,142,1)] transition-colors cursor-pointer">
          PDF Herunterladen
        </button>
        <button className="py-3.5 rounded text-[11px] font-semibold uppercase tracking-[0.18em] bg-transparent border border-white/10 text-[#7f8ea3] hover:border-[rgba(90,158,142,0.5)] hover:text-[rgba(90,158,142,0.9)] transition-colors cursor-pointer">
          Neue Bewertung
        </button>
      </div>
    </div>
  );
}
