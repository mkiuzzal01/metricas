import { baseApi } from "../../API/baseAPI";

export const searchApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    valuationSearch: builder.query<any, void>({
      query: () => ({
        url: "/valuation/search",
        method: "GET",
      }),
      providesTags: ["searchAddress"],
    }),
  }),
});

export const { useValuationSearchQuery } = searchApi;
