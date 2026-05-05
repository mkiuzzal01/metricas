/* eslint-disable @typescript-eslint/no-explicit-any */
export const safe = (v: any, fallback = '-') =>
  v !== null && v !== undefined && v !== '' ? v : fallback;

export const eur = (v: any) =>
  v !== null && v !== undefined ? v.toLocaleString('de-DE') : '-';
