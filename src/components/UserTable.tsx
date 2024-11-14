"use client";

import { useGetUsersQuery } from '@/redux/api/userAPI';
import React from 'react';

const UserTable = () => {
  const { data: users, error, isLoading } = useGetUsersQuery({});

  if (isLoading) {
    return <div className="text-center">Loading...</div>;
  }

  if (error) {
    // Safely extract the error message
    const errorMessage = 
      typeof error === 'string' ? error : 
      'data' in error && typeof error.data === 'string' ? error.data : 
      'Failed to load users';

    return <div className="text-red-500 text-center">Error loading users: {errorMessage}</div>;
  }

  return (
    <div className="p-4">
      <h2 className="text-2xl font-semibold mb-4">User Dashboard</h2>
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white border border-gray-300 rounded-lg shadow-md">
          <thead className="bg-gray-200">
            <tr>
              <th className="py-2 px-4 border-b border-gray-300 text-left text-gray-600">Name</th>
              <th className="py-2 px-4 border-b border-gray-300 text-left text-gray-600">Email</th>
              <th className="py-2 px-4 border-b border-gray-300 text-left text-gray-600">Role</th>
            </tr>
          </thead>
          <tbody>
            {users && users.map((user: { name: string; email: string; role: string }, index: number) => (
              <tr key={index} className="hover:bg-gray-100">
                <td className="py-2 px-4 border-b border-gray-300">{user.name}</td>
                <td className="py-2 px-4 border-b border-gray-300">{user.email}</td>
                <td className="py-2 px-4 border-b border-gray-300">{user.role}</td>
              </tr>
            ))}
          </tbody>
        </table>
       
      </div>
    </div>
  );
};

export default UserTable;
