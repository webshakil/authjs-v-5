import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const api = createApi({
  reducerPath: 'api',
  
  baseQuery: fetchBaseQuery({ baseUrl: '/api' }),
  
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
