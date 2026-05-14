import { baseApi } from '../../API/baseAPI';

export const pricingApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    takeSubscriptionPlan: builder.mutation({
      query: (data) => ({
        url: '/subscribe',
        method: 'POST',
        body: data,
      }),
    }),
  }),
});

export const { useTakeSubscriptionPlanMutation } = pricingApi;
