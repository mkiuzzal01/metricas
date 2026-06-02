import { api } from "../TApi";

export const getValueReport = (prams: string) =>
  api.get<any>(`/valuation/report/${prams}`, {
    tags: ["value-report"],
    revalidate: 60,
  });

export const getDemoValueReport = (prams: string) =>
  api.get<any>(`/demo/valuation/report/${prams}`, {
    tags: ["value-report"],
    revalidate: 60,
  });

export const getValueReportList = () =>
  api.get<any>(`/valuation/reports`, {
    tags: ["value-report"],
    revalidate: 60,
  });
