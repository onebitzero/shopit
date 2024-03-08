import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { userApi } from './userApi';

export const authApi = createApi({
  reducerPath: 'authApi',
  baseQuery: fetchBaseQuery({ baseUrl: '/api/v1/' }),
  endpoints: (builder) => ({
    register: builder.mutation({
      query: (body) => ({
        url: 'register',
        method: 'POST',
        body,
      }),
      async onQueryStarted(arg, { dispatch, queryFulfilled }) {
        try {
          await queryFulfilled;
          await dispatch(userApi.endpoints.getUser.initiate());
        } catch (error) {
          console.error(error);
        }
      },
    }),
    login: builder.mutation({
      query: (body) => ({
        url: 'login',
        method: 'POST',
        body,
      }),
      async onQueryStarted(arg, { dispatch, queryFulfilled }) {
        try {
          await queryFulfilled;
          await dispatch(userApi.endpoints.getUser.initiate());
        } catch (error) {
          console.error(error);
        }
      },
    }),
    logout: builder.query({
      query: () => 'logout',
    }),
  }),
});

export const { useRegisterMutation, useLoginMutation, useLazyLogoutQuery } = authApi;
