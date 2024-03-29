import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const productsApi = createApi({
  reducerPath: 'productsApi',
  baseQuery: fetchBaseQuery({ baseUrl: '/api/v1/' }),
  tagTypes: ['Product', 'Reviews'],
  endpoints: (builder) => ({
    getProducts: builder.query({
      query: (params) => ({
        url: 'products',
        params: {
          page: params.page,
          keyword: params.keyword,
          category: params.category,
          'price[gte]': params.min,
          'price[lte]': params.max,
          'ratings[gte]': params.ratings,
        },
      }),
    }),
    getProductDetails: builder.query({
      query: (id) => `products/${id}`,
      providesTags: ['Product'],
    }),
    getCanReview: builder.query({
      query: (id) => `can_review?productId=${id}`,
    }),
    submitProductReview: builder.mutation({
      query: (body) => ({
        url: 'reviews',
        method: 'PUT',
        body,
      }),
      invalidatesTags: ['Product', 'Reviews'],
    }),
    getProductReviews: builder.query({
      query: (id) => `reviews?productId=${id}`,
      providesTags: ['Reviews'],
    }),
  }),
});

export const {
  useGetProductsQuery,
  useGetProductDetailsQuery,
  useGetCanReviewQuery,
  useSubmitProductReviewMutation,
  useGetProductReviewsQuery,
} = productsApi;
