import { baseApi } from "../../API/baseAPI";

export const profileApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getProfileInfo: builder.query<any, any>({
      query: () => ({
        url: "/profile-info",
        method: "GET",
      }),
      providesTags: ["profile-info"],
    }),

    updateProfile: builder.mutation<any, any>({
      query: (data) => ({
        url: "/profile-update",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["profile-info"],
    }),

    updatePassword: builder.mutation<any, any>({
      query: (data) => ({
        url: "/change-password",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["profile-info"],
    }),

    deleteAccount: builder.mutation<any, any>({
      query: (data) => ({
        url: "/profile-delete",
        method: "DELETE",
        body: data,
      }),
    }),
  }),
});

export const {
  useGetProfileInfoQuery,
  useUpdateProfileMutation,
  useUpdatePasswordMutation,
  useDeleteAccountMutation,
} = profileApi;
