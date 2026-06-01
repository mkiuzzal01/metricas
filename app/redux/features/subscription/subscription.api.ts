import { baseApi } from "../../API/baseAPI";

export const suscriptionApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getMySubscription: builder.query<any, void>({
      query: () => ({
        url: "/my-subscription",
        method: "GET",
      }),
      providesTags: ["my-subscription"],
    }),
  }),
});

export const { useGetMySubscriptionQuery } = suscriptionApi;
