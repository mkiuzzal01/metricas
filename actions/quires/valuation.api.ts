import { api } from "../TApi";

export const getValueReport = (prams: string) =>
  api.get<any>(`/valuation/report/${prams}`, {
    tags: ["value-report"],
    revalidate: 60,
  });
