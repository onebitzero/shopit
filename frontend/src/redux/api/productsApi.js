import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const productsApi = createApi({
  reducerPath: 'productsApi',
  baseQuery: fetchBaseQuery({ baseUrl: '/api/v1/' }),
  tagTypes: ['Admin products', 'Product', 'Reviews'],
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
      providesTags: ['Product', 'Admin products'],
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
    deleteProductReview: builder.mutation({
      query: (body) => ({
        url: 'admin/review',
        method: 'DELETE',
        body,
      }),
      invalidatesTags: ['Reviews'],
    }),
    getAdminProducts: builder.query({
      query: () => 'admin/products',
      providesTags: ['Admin products'],
    }),
    addProduct: builder.mutation({
      query: (body) => ({
        url: 'admin/products',
        method: 'PUT',
        body,
      }),
      invalidatesTags: ['Admin products'],
    }),
    deleteProduct: builder.mutation({
      query: ({ id }) => ({
        url: `admin/products/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['Admin products'],
    }),
    updateProduct: builder.mutation({
      query: ({ id, body }) => ({
        url: `admin/products/${id}`,
        method: 'PUT',
        body,
      }),
      invalidatesTags: ['Admin products'],
    }),
    uploadProductImages: builder.mutation({
      query: ({ id, body }) => ({
        url: `admin/product/upload_images/${id}`,
        method: 'PUT',
        body,
      }),
      invalidatesTags: ['Admin products'],
    }),
    deleteProductImage: builder.mutation({
      query: (body) => ({
        url: 'admin/product/delete_image/',
        method: 'PUT',
        body,
      }),
      invalidatesTags: ['Admin products'],
    }),
  }),
});

export const {
  useGetProductsQuery,
  useGetProductDetailsQuery,
  useGetCanReviewQuery,
  useSubmitProductReviewMutation,
  useGetProductReviewsQuery,
  useLazyGetProductReviewsQuery,
  useDeleteProductReviewMutation,
  useGetAdminProductsQuery,
  useAddProductMutation,
  useDeleteProductMutation,
  useUpdateProductMutation,
  useUploadProductImagesMutation,
  useDeleteProductImageMutation,
} = productsApi;
