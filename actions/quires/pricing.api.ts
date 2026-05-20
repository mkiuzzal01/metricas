/* eslint-disable @typescript-eslint/no-explicit-any */
import { api } from "../TApi";

export const getPricing = () =>
  api.get<any>(`/pricing`, {
    tags: ["pricing"],
    revalidate: 60,
  });

export const getPricingById = (id: string) =>
  api.get<any>(`/pricing/${id}`, {
    tags: ["pricing"],
    revalidate: 60,
  });
