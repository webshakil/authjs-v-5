"use client";
import { useRegisterUserMutation } from '@/redux/api/userAPI';
import React, { useState } from 'react';


const SignUp: React.FC = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
  });
  const [registerUser, { isLoading, isSuccess, isError, error }] = useRegisterUserMutation();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await registerUser(formData).unwrap();
      console.log('User registered successfully');
    } catch (err) {
      console.error('Failed to register user:', err);
    }
  };

  // Helper function to extract error message
  const getErrorMessage = () => {
    if (error && 'data' in error) {
      // Assuming the error response has a 'message' property in its data
      return (error.data as { message?: string }).message || 'An unknown error occurred';
    } else if (error && 'message' in error) {
      return error.message;
    }
    return 'An unknown error occurred';
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white p-8 rounded shadow-md w-full max-w-md">
        <h2 className="text-2xl font-bold mb-6 text-center">Register</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="name" className="block text-sm font-medium text-gray-700">
              Name
            </label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            />
          </div>

          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700">
              Email
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            />
          </div>

          <div>
            <label htmlFor="password" className="block text-sm font-medium text-gray-700">
              Password
            </label>
            <input
              type="password"
              id="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              required
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            />
          </div>

          <button
            type="submit"
            disabled={isLoading}
            className="w-full bg-indigo-600 text-white font-semibold py-2 px-4 rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            {isLoading ? 'Registering...' : 'Register'}
          </button>

          {isSuccess && <p className="text-green-500 mt-4">User registered successfully!</p>}
          {isError && <p className="text-red-500 mt-4">Error: {getErrorMessage()}</p>}
        </form>
       
      </div>
    </div>
  );
};

export default SignUp;
