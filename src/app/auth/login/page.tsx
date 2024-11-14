'use client';

import { useLoginUserMutation } from '@/redux/api/userAPI';
import { useDispatch } from 'react-redux';
import { useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react';
import { login } from '@/redux/reducers/userReducer';

interface User {
  email: string;
  image: string;
  name: string;
  role: string;
}

export default function LoginForm() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const router = useRouter();
  const [user, setUser] = useState<User | null>(null);
  const dispatch = useDispatch();
  const [loginUser, { isLoading }] = useLoginUserMutation();

  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      setUser(JSON.parse(storedUser)); 
    }
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setSuccess('');

    try {
      const result = await loginUser({ email, password }).unwrap();
      dispatch(login({ user: result.user, token: result.token }));
      setSuccess('Login successful!');
      const loggedInUser = result.user; 
      setUser(loggedInUser); // Set user info on successful login
      localStorage.setItem('user', JSON.stringify(loggedInUser)); // Persist user in localStorage
      setEmail('');
      setPassword('');
      router.push('/');  
    } catch (err: any) {
      setError(err?.data?.error || 'Login failed');
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <form
        onSubmit={handleSubmit}
        className="bg-white p-8 rounded shadow-md w-full max-w-md"
      >
        <h2 className="text-2xl font-bold mb-6 text-center">Login</h2>
        {error && <p className="text-red-500 text-center mb-4">{error}</p>}
        {success && <p className="text-green-500 text-center mb-4">{success}</p>}

        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="email">
            Email
          </label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="w-full px-3 py-2 border rounded shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div className="mb-6">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="password">
            Password
          </label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            className="w-full px-3 py-2 border rounded shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <button
          type="submit"
          className="w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600 transition duration-200"
          disabled={isLoading}
        >
          {isLoading ? 'Logging in...' : 'Log In'}
        </button>
      </form>
    </div>
  );
}




