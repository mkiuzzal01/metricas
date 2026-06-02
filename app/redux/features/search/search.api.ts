import { baseApi } from "../../API/baseAPI";

export const searchApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    valuationSearch: builder.mutation<any, any>({
      query: (body) => ({
        url: "/valuation/search",
        method: "POST",
        body,
      }),
      invalidatesTags: ["searchAddress"],
    }),

    valuationReportDowload: builder.mutation<Blob, number>({
      query: (id) => ({
        url: `/valuation/report/${id}/pdf`,
        method: "GET",
        responseHandler: (response) => response.blob(),
        cache: "no-cache",
      }),
    }),
  }),
});

export const { useValuationSearchMutation, useValuationReportDowloadMutation } =
  searchApi;
