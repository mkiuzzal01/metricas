/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  createApi,
  fetchBaseQuery,
  type DefinitionType,
  type BaseQueryApi,
  type BaseQueryFn,
  type FetchArgs,
} from '@reduxjs/toolkit/query/react';
import { RootState } from '../store';
import { logout, setUser } from '../features/auth/authSlice';
import { tagTypes } from './tagTypes';

// Base query with authorization header from Redux store
const baseQuery = fetchBaseQuery({
  baseUrl: process.env.NEXT_PUBLIC_BASE_API_URL,
  credentials: 'include',
  prepareHeaders: (headers, { getState }) => {
    const token = (getState() as RootState).auth?.token;
    if (token) {
      headers.set('authorization', token);
    }
    return headers;
  },
});

const baseQueryWithRefreshToken: BaseQueryFn<
  FetchArgs,
  BaseQueryApi,
  DefinitionType
> = async (args, api, extraOptions): Promise<any> => {
  let result = await baseQuery(args, api, extraOptions);

  // Handle 401 - token expired
  if (result?.error?.status === 401) {
    try {
      // Try to refresh the token
      const refreshResponse = await fetch(
        `${process.env.NEXT_PUBLIC_BASE_URL}/auth/refresh-token`,
        {
          method: 'POST',
          credentials: 'include',
        },
      );

      const refreshData = await refreshResponse.json();

      if (refreshResponse.ok && refreshData?.data?.accessToken) {
        // Get current user from state
        const currentUser = (api.getState() as RootState).auth.user;

        // Update Redux store with new token
        if (currentUser) {
          api.dispatch(
            setUser({
              user: currentUser,
              token: refreshData.data.accessToken,
            }),
          );
        }

        // Retry the original request with new token
        result = await baseQuery(args, api, extraOptions);
      } else {
        // Refresh failed - logout user
        api.dispatch(logout());
      }
    } catch (error) {
      api.dispatch(logout());
    }
  }

  return result;
};

export const baseApi = createApi({
  reducerPath: 'baseApi',
  baseQuery: baseQueryWithRefreshToken,
  tagTypes: tagTypes,
  endpoints: () => ({}),
});
