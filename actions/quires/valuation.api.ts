import { api } from "../TApi";

export const getValueReport = () =>
  api.get<any>(`/valuation/reports`, {
    tags: ["value-report"],
    revalidate: 60,
  });
