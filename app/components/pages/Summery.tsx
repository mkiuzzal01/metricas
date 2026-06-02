/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import Link from "next/link";
import { eur, safe } from "../lib/currency";
import SectionHeader from "../shared/SectionHeader";
import KPICard from "../shared/KPICard";
import SubScoreBar from "../shared/SubScoreBar";
import Empty from "../shared/Empty";
import ScrollToTop from "../shared/buttons/ScrollToTop";
import { useValuationReportDowloadMutation } from "@/app/redux/features/search/search.api";

interface ValueReportData {
  id: number;
  address: string;
  property_type: string;
  city: string;

  marktwert: number;
  spanne: number[];

  qm_preis: number;
  baujahr: number;
  wohnflaeche: number;
  zimmer: number;
  etage: string;

  lage_score: number;

  lage_sub: {
    mikrolage?: number;
    makrolage?: number;
    infrastruktur?: number;
    sozial?: number;
  };

  trend_1j: number;
  trend_5j: number;

  bodenrichtwert: number;

  miete_kalt: number;
  mietmultiplikator: number;
  vermarktung_tage: number;
  rendite_brutto: number;

  prognose_1j: number;

  angebote_aktuell: number;

  marktlage_de: string;
  marktlage_en: string;
  marktlage_type: string;

  confidence: number;

  comparables: any[];

  preisverlauf: {
    j: string;
    p: number;
  }[];

  mietverlauf: any[];

  infrastruktur: any[];

  sozio: {
    kaufkraft_idx?: number;
    altersschnitt?: number;
    einwohner_qkm?: number;
    arbeitslosenquote?: number;
    akademiker_anteil?: number;
  };

  quellen: string[];

  actions: {
    new_valuation_url: string;
    pdf_report_download: string;
    share_url: string;
  };
}

interface ValueReportResponse {
  data: ValueReportData;
}

interface Props {
  valueReport: ValueReportResponse;
  dic: any;
  id?: any;
}

export default function Summery({ dic, valueReport, id }: Props) {
  const [downLoadReport, { isLoading }] = useValuationReportDowloadMutation();
  const labels = dic?.summaryLabel || [];
  const actionButtons = dic?.actionButton || [];
  const data = valueReport?.data;
  const comparables = data?.comparables || [];
  const infrastructure = data?.infrastruktur || [];
  const hasSozio = Object.keys(data?.sozio || {}).length > 0;
  const hasLageSub = Object.keys(data?.lage_sub || {}).length > 0;

  const handleDownLoadReport = async (id: number) => {
    try {
      const blob = await downLoadReport(id).unwrap();

      const url = window.URL.createObjectURL(blob);

      const a = document.createElement("a");
      a.href = url;
      a.download = `valuation-report-${id}.pdf`;

      document.body.appendChild(a);
      a.click();

      a.remove();
      window.URL.revokeObjectURL(url);
    } catch (error) {
      console.error("PDF download failed:", error);
    }
  };

  if (!valueReport) return <Empty />;

  return (
    <div className="relative z-10 max-w-3xl mx-auto px-5 pb-24">
      {/* HEADER */}
      <div className="text-center py-12 border-b border-white/[0.06] mb-2 relative">
        <div
          className="absolute top-0 left-1/2 -translate-x-1/2 h-px w-64"
          style={{
            background:
              "linear-gradient(90deg, transparent, rgba(90,158,142,0.7), transparent)",
          }}
        />

        <div className="text-[11px] tracking-[0.22em] text-[#9fb0c0] font-mono uppercase mb-2">
          {data?.city || data?.address || "Unknown Address"}
        </div>

        <div className="inline-block text-[9px] uppercase tracking-[0.3em] text-[rgba(90,158,142,0.9)] bg-[rgba(90,158,142,0.08)] border border-[rgba(90,158,142,0.2)] px-2.5 py-1 rounded-sm mb-4">
          {labels?.[0] || "Valuation"}
        </div>

        <div
          className="text-[clamp(38px,8vw,56px)] text-[#dce4ec] leading-none tracking-tight"
          style={{ fontFamily: "'DM Serif Display', serif" }}
        >
          € {eur(data?.marktwert)}
        </div>

        <div className="font-mono text-[11px] tracking-[0.1em] text-[#3a4a5c] mt-2">
          Range: € {eur(data?.spanne?.[0])} — € {eur(data?.spanne?.[1])}
        </div>

        <div className="inline-flex items-center gap-2 mt-4 px-3 py-1.5 bg-[rgba(90,158,142,0.08)] border border-[rgba(90,158,142,0.2)] rounded-full text-[10px] text-[rgba(90,158,142,0.9)] uppercase font-semibold tracking-[0.15em]">
          <span className="w-1.5 h-1.5 bg-[rgba(90,158,142,0.9)] rounded-full animate-pulse" />
          Confidence {safe(data?.confidence)}%
        </div>
      </div>

      {/* KEY METRICS */}
      <SectionHeader label={labels?.[0] || "Key Metrics"} />

      <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
        <KPICard
          label="Preis / m²"
          value={
            data?.qm_preis ? `€ ${data.qm_preis.toLocaleString("de-DE")}` : "-"
          }
        />

        <KPICard
          label="Trend 1J"
          value={data?.trend_1j != null ? `${data.trend_1j}%` : "-"}
          accent
        />

        <KPICard
          label="Trend 5J"
          value={data?.trend_5j != null ? `${data.trend_5j}%` : "-"}
          accent
        />

        <KPICard
          label="Prognose 1J"
          value={data?.prognose_1j != null ? `${data.prognose_1j}%` : "-"}
          accent
        />
      </div>

      {/* LOCATION SCORE */}
      <SectionHeader label={labels?.[1] || "Location Score"} />

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
        <div className="bg-[#0d1520] border border-white/[0.06] rounded-md p-6 text-center relative overflow-hidden">
          <div
            className="absolute inset-0 pointer-events-none"
            style={{
              background:
                "radial-gradient(ellipse at center bottom, rgba(90,158,142,0.08) 0%, transparent 70%)",
            }}
          />

          <div className="text-[11px] uppercase tracking-[0.2em] text-[#7f8ea3] mb-2">
            Score
          </div>

          <div className="text-[52px] text-[rgba(90,158,142,0.95)] leading-none">
            {safe(data?.lage_score)}
          </div>

          <div className="font-mono text-[11px] text-[#7f8ea3] mt-2 tracking-[0.1em]">
            Mikro · Makro · Infra
          </div>
        </div>

        <div className="bg-[#0d1520] border border-white/[0.06] rounded-md p-5 flex flex-col justify-center gap-3">
          {hasLageSub ? (
            <>
              <SubScoreBar
                label="Mikrolage"
                value={safe(data?.lage_sub?.mikrolage)}
              />

              <SubScoreBar
                label="Makrolage"
                value={safe(data?.lage_sub?.makrolage)}
              />

              <SubScoreBar
                label="Infrastruktur"
                value={safe(data?.lage_sub?.infrastruktur)}
              />

              <SubScoreBar
                label="Sozial"
                value={safe(data?.lage_sub?.sozial)}
              />
            </>
          ) : (
            <div className="text-[#7f8ea3] text-sm">
              No location sub scores available
            </div>
          )}
        </div>
      </div>

      {/* MARKET DATA */}
      <SectionHeader label={labels?.[2] || "Market Data"} />

      <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
        <KPICard
          label="Kaltmiete /m²"
          value={
            data?.miete_kalt ? `€ ${Number(data.miete_kalt).toFixed(2)}` : "-"
          }
        />

        <KPICard
          label="Bruttorendite"
          value={
            data?.rendite_brutto
              ? `${Number(data.rendite_brutto).toFixed(2)}%`
              : "-"
          }
          accent
        />

        <KPICard
          label="Mietmultiplikator"
          value={
            data?.mietmultiplikator
              ? `${Number(data.mietmultiplikator).toFixed(1)}×`
              : "-"
          }
        />

        <KPICard
          label="Vermarktung"
          value={data?.vermarktung_tage ? `${data.vermarktung_tage} Tage` : "-"}
        />
      </div>

      {/* MARKET STATUS */}
      <SectionHeader label="Marktlage" />

      <div className="grid grid-cols-2 gap-2">
        <KPICard label="Marktsituation" value={data?.marktlage_de || "-"} />

        <KPICard
          label="Angebote aktuell"
          value={safe(data?.angebote_aktuell)}
        />
      </div>

      {/* PROPERTY DETAILS */}
      <SectionHeader label={labels?.[4] || "Property Details"} />

      <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
        <KPICard label="Zimmer" value={safe(data?.zimmer)} />

        <KPICard
          label="Wohnfläche"
          value={data?.wohnflaeche ? `${data.wohnflaeche} m²` : "-"}
        />

        <KPICard label="Etage" value={data?.etage || "-"} />

        <KPICard label="Baujahr" value={safe(data?.baujahr)} />
      </div>

      {/* COMPARABLES */}
      <SectionHeader label={labels?.[3] || "Comparables"} />

      <div className="bg-[#0d1520] border border-white/[0.06] rounded-md overflow-hidden">
        {comparables.length ? (
          comparables.map((c: any, i: number) => (
            <div
              key={i}
              className="flex justify-between items-center px-4 py-3 border-b border-white/[0.04] last:border-0 hover:bg-[#111b28] transition-colors"
            >
              <div>
                <div className="text-[#dce4ec] text-[13px]">
                  {c?.addr || "-"}
                </div>

                <div className="font-mono text-[9px] text-[#7f8ea3] mt-0.5">
                  {c?.qm || "-"} m² · {c?.dist || "-"} · Bj. {c?.bj || "-"}
                </div>
              </div>

              <div className="text-right">
                <div
                  className="text-[rgba(90,158,142,0.95)] text-[16px]"
                  style={{
                    fontFamily: "'DM Serif Display', serif",
                  }}
                >
                  € {c?.preis ? c.preis.toLocaleString("de-DE") : "-"}
                </div>

                <div className="font-mono text-[9px] text-[#7f8ea3] mt-0.5">
                  € {c?.qm_p ? c.qm_p.toLocaleString("de-DE") : "-"} /m²
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

      {/* INFRASTRUCTURE */}
      <SectionHeader label={labels?.[5] || "Infrastructure"} />

      <div className="grid grid-cols-2 sm:grid-cols-4 gap-1.5">
        {infrastructure.length ? (
          infrastructure.map((item: any, i: number) => (
            <div
              key={i}
              className="flex items-center gap-2 px-3 py-2.5 bg-[#0d1520] border border-white/[0.06] rounded hover:border-white/10 transition-colors"
            >
              <span className="text-[15px] shrink-0">{item?.icon}</span>

              <span className="flex-1 text-[12px] text-[#7f8ea3]">
                {item?.de || item?.en || "-"}
              </span>

              <span className="font-mono text-[12px] text-[rgba(90,158,142,0.9)] font-medium shrink-0">
                {item?.val || "-"}
              </span>
            </div>
          ))
        ) : (
          <div className="text-[#7f8ea3] text-sm col-span-full">
            No infrastructure data
          </div>
        )}
      </div>

      {/* QUARTIERSPROFIL */}
      {hasSozio && (
        <>
          <SectionHeader label={labels?.[6] || "Quartiersprofil"} />

          <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
            <KPICard
              label="Kaufkraft-Index"
              value={safe(data?.sozio?.kaufkraft_idx)}
              sub="ø 100"
            />

            <KPICard
              label="Ø Alter"
              value={safe(data?.sozio?.altersschnitt)}
              sub="Jahre"
            />

            <KPICard
              label="Einwohner/km²"
              value={
                data?.sozio?.einwohner_qkm
                  ? data.sozio.einwohner_qkm.toLocaleString("de-DE")
                  : "-"
              }
            />

            <KPICard
              label="Arbeitslosenquote"
              value={
                data?.sozio?.arbeitslosenquote
                  ? `${data.sozio.arbeitslosenquote}%`
                  : "-"
              }
              accent
            />

            <KPICard
              label="Akademikeranteil"
              value={
                data?.sozio?.akademiker_anteil
                  ? `${data.sozio.akademiker_anteil}%`
                  : "-"
              }
            />

            <KPICard
              label="Bodenrichtwert"
              value={
                data?.bodenrichtwert
                  ? `€ ${data.bodenrichtwert.toLocaleString("de-DE")}/m²`
                  : "-"
              }
              large
            />
          </div>
        </>
      )}

      {/* SOURCES */}
      <SectionHeader label="Quellen" />

      <div className="flex flex-wrap gap-2">
        {data?.quellen?.length ? (
          data.quellen.map((item: string, i: number) => (
            <div
              key={i}
              className="px-3 py-2 rounded bg-[#0d1520] border border-white/[0.06] text-sm text-[#7f8ea3]"
            >
              {item}
            </div>
          ))
        ) : (
          <div className="text-[#7f8ea3] text-sm">No sources available</div>
        )}
      </div>

      {/* ACTIONS */}
      <div className="grid text-center grid-cols-2 gap-2 mt-9">
        {id !== "demo" && (
          <button
            onClick={() => handleDownLoadReport(valueReport?.data?.id)}
            disabled={isLoading}
            className="py-3.5 rounded text-[11px] font-semibold uppercase tracking-[0.18em] bg-[rgba(90,158,142,0.9)] text-[#080d12] hover:bg-[rgba(90,158,142,1)] transition-colors cursor-pointer disabled:opacity-50"
          >
            {isLoading
              ? "Downloading..."
              : actionButtons?.[0] || "Download PDF"}
          </button>
        )}

        <Link href="/search">
          <div className="py-3.5 rounded text-[11px] font-semibold uppercase tracking-[0.18em] bg-transparent border border-white/10 text-[#7f8ea3] hover:border-[rgba(90,158,142,0.5)] hover:text-[rgba(90,158,142,0.9)] transition-colors cursor-pointer">
            {actionButtons?.[1] || "New Search"}
          </div>
        </Link>
      </div>

      <ScrollToTop />
    </div>
  );
}
