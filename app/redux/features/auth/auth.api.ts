import { baseApi } from '../../API/baseAPI';
import { logout, setUser } from './authSlice';

export const authApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    login: builder.mutation({
      query: (data) => ({
        url: '/auth/login',
        method: 'POST',
        body: data,
      }),
      async onQueryStarted(arg, { dispatch, queryFulfilled }) {
        try {
          const { data } = await queryFulfilled;
          if (data?.data?.accessToken && data?.data?.user) {
            dispatch(
              setUser({
                user: data.data.user,
                token: data.data.accessToken,
              }),
            );
          }
        } catch (error) {
          console.error('Login error:', error);
        }
      },
    }),

    getCurrentUser: builder.query({
      query: () => ({
        url: '/auth/me',
        method: 'GET',
      }),
    }),

    logout: builder.mutation({
      query: () => ({
        url: '/auth/logout',
        method: 'POST',
      }),
      async onQueryStarted(arg, { dispatch, queryFulfilled }) {
        try {
          await queryFulfilled;
          dispatch(logout());
        } catch (error) {
          console.error('Logout error:', error);
        }
      },
    }),
  }),
});

export const { useLoginMutation, useGetCurrentUserQuery, useLogoutMutation } =
  authApi;
