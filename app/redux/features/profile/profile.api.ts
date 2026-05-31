import { baseApi } from "../../API/baseAPI";

export const profileApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getProfileInfo: builder.query<any, void>({
      query: () => ({
        url: "/profile-info",
        method: "GET",
      }),
      providesTags: ["profile-info"],
    }),
  }),
});

export const { useGetProfileInfoQuery } = profileApi;
