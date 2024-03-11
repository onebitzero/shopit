import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const orderApi = createApi({
  reducerPath: 'orderApi',
  baseQuery: fetchBaseQuery({ baseUrl: '/api/v1/' }),
  endpoints: (builder) => ({
    createNewOrder: builder.mutation({
      query: (body) => ({
        url: 'order/new',
        method: 'PUT',
        body,
      }),
    }),
  }),
});

export const { useCreateNewOrderMutation } = orderApi;
