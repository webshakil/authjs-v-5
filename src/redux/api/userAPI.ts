import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

const baseUrl = process.env.NEXT_PUBLIC_API_BASE_URL || 'http://localhost:3000/api';
//NEXT_PUBLIC_API_BASE_URL=http://localhost:3000/api/register this is api for registering users

export const api = createApi({
  reducerPath: 'api',
  baseQuery: fetchBaseQuery({ baseUrl }),
  endpoints: (builder) => ({
    getUsers: builder.query({
      query: () => 'users',
    }),
    registerUser: builder.mutation({
      query: (userData) => ({
        url: 'register',
        method: 'POST',
        body: userData,
      }),
    }),
  }),
});

export const { useGetUsersQuery, useRegisterUserMutation } = api;

