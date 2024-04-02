import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const orderApi = createApi({
  reducerPath: 'orderApi',
  baseQuery: fetchBaseQuery({ baseUrl: '/api/v1/' }),
  tagTypes: ['Orders'],
  endpoints: (builder) => ({
    createNewOrder: builder.mutation({
      query: (body) => ({
        url: 'order/new',
        method: 'PUT',
        body,
      }),
    }),
    stripeCheckoutSession: builder.mutation({
      query: (body) => ({
        url: 'payment/checkout_session',
        method: 'POST',
        body,
      }),
    }),
    getMyOrders: builder.query({
      query: () => 'me/orders',
    }),
    getOrderDetails: builder.query({
      query: (id) => `order/${id}`,
      providesTags: ['Orders'],
    }),
    getOrdersAndSales: builder.query({
      query: ({ startDate, endDate }) => `admin/orders_and_sales?startDate=${startDate}&endDate=${endDate}`,
    }),
    getAdminOrders: builder.query({
      query: () => 'admin/orders',
      providesTags: ['Orders'],
    }),
    updateOrder: builder.mutation({
      query: (body) => ({
        url: 'admin/orders/update',
        method: 'PUT',
        body,
      }),
      invalidatesTags: ['Orders'],
    }),
    deleteOrder: builder.mutation({
      query: (body) => ({
        url: 'admin/orders/delete',
        method: 'DELETE',
        body,
      }),
      invalidatesTags: ['Orders'],
    }),
  }),
});

export const {
  useCreateNewOrderMutation,
  useStripeCheckoutSessionMutation,
  useGetMyOrdersQuery,
  useGetOrderDetailsQuery,
  useLazyGetOrdersAndSalesQuery,
  useGetAdminOrdersQuery,
  useUpdateOrderMutation,
  useDeleteOrderMutation,
} = orderApi;
