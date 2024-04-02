import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { setIsAuthenticated, setIsLoading, setUser } from '../features/userSlice';

export const userApi = createApi({
  reducerPath: 'userApi',
  baseQuery: fetchBaseQuery({ baseUrl: '/api/v1/' }),
  tagTypes: ['Admin users', 'Admin user details', 'User'],
  endpoints: (builder) => ({
    getUser: builder.query({
      query: () => 'me',
      transformResponse: (response) => response.user,
      async onQueryStarted(arg, { dispatch, queryFulfilled }) {
        try {
          const { data } = await queryFulfilled;
          dispatch(setIsAuthenticated(true));
          dispatch(setUser(data));
          dispatch(setIsLoading(false));
        } catch (error) {
          dispatch(setIsLoading(false));
          console.error(error);
        }
      },
      providesTags: ['User'],
    }),
    updateProfile: builder.mutation({
      query: (body) => ({
        url: 'me/update',
        method: 'PUT',
        body,
      }),
      invalidatesTags: ['User'],
    }),
    uploadAvatar: builder.mutation({
      query: (body) => ({
        url: 'me/upload_avatar',
        method: 'PUT',
        body,
      }),
      invalidatesTags: ['User'],
    }),
    updatePassword: builder.mutation({
      query: (body) => ({
        url: 'password/update',
        method: 'PUT',
        body,
      }),
    }),
    forgotPassword: builder.mutation({
      query: (body) => ({
        url: 'password/forgot',
        method: 'POST',
        body,
      }),
    }),
    resetPassword: builder.mutation({
      query: ({ token, body }) => ({
        url: `password/reset/${token}`,
        method: 'PUT',
        body,
      }),
    }),
    getAdminUsers: builder.query({
      query: () => 'admin/users',
      providesTags: ['Admin users'],
    }),
    getUserDetails: builder.query({
      query: (id) => `admin/user?userId=${id}`,
      providesTags: ['Admin user details'],
    }),
    updateUser: builder.mutation({
      query: (body) => ({
        url: 'admin/user',
        method: 'PUT',
        body,
      }),
      invalidatesTags: ['Admin users', 'Admin user details'],
    }),
    deleteUser: builder.mutation({
      query: (body) => ({
        url: 'admin/user',
        method: 'DELETE',
        body,
      }),
      invalidatesTags: ['Admin users'],
    }),
  }),
});

export const {
  useGetUserQuery,
  useUpdateProfileMutation,
  useUploadAvatarMutation,
  useUpdatePasswordMutation,
  useForgotPasswordMutation,
  useResetPasswordMutation,
  useGetAdminUsersQuery,
  useGetUserDetailsQuery,
  useUpdateUserMutation,
  useDeleteUserMutation,
} = userApi;
