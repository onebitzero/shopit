import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

export const productsApi = createApi({
  reducerPath: 'productsApi',
  baseQuery: fetchBaseQuery({ baseUrl: '/api/v1/' }),
  endpoints: builder => ({
    getProducts: builder.query({
      query: () => 'products'
    }),
    getProductDetails: builder.query({
      query: (id) => `products/${id}`
    })
  })
})

export const { useGetProductsQuery, useGetProductDetailsQuery } = productsApi
