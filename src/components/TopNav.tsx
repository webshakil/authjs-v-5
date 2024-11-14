'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '@/redux/store'; 
import { logout } from '@/redux/reducers/userReducer'; 

export default function Navbar() {
  const router = useRouter();
  const { isLoggedIn, user } = useSelector((state: RootState) => state.user);
  const dispatch = useDispatch();
  const [isClient, setIsClient] = useState(false); // Track if we're on the client

  useEffect(() => {
    setIsClient(true); // Set to true after the initial render on the client

    // Check localStorage and update Redux state if the user is logged in
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      const parsedUser = JSON.parse(storedUser);
      // Dispatch the user and token into Redux state
      dispatch({ type: 'user/setUser', payload: { user: parsedUser, token: localStorage.getItem('token') } });
    }
  }, [dispatch]);

  const handleSignOut = async () => {
    // Call the DELETE API route to remove the session
    const response = await fetch('http://localhost:3000/api/logout', {
      method: 'DELETE',
    });

    if (response.ok) {
      // Dispatch the logout action to update Redux state
      dispatch(logout());
      // Clear localStorage
      localStorage.removeItem('user');
      localStorage.removeItem('token');
      // Redirect to the login page
      router.push('/auth/login');
    } else {
      console.error('Failed to sign out');
    }
  };

  // Only render the navbar if we're on the client
  if (!isClient) return null;

  return (
    <nav className="bg-blue-600 p-4">
      <div className="container mx-auto flex justify-between items-center">
        <Link href="/">
          <p className="text-white text-xl font-bold">Logo</p>
        </Link>
        <div className="flex space-x-4 items-center">
          <Link href="/">
            <p className="text-white hover:text-blue-200">Home</p>
          </Link>
          <Link href="/admin">
            <p className="text-white hover:text-blue-200">Admin</p>
          </Link>
          <Link href="/manager">
            <p className="text-white hover:text-blue-200">Manager</p>
          </Link>
          <Link href="/cto">
            <p className="text-white hover:text-blue-200">CTO</p>
          </Link>
          <Link href="/dashboard">
            <p className="text-white hover:text-blue-200">Dashboard</p>
          </Link>

          {/* Conditional rendering based on login status */}
          {isLoggedIn ? (
            <>
              <div>
                <Image
                  src={user?.image || "/images/default.png"} // Use default image if no image is set
                  width={40}
                  height={40}
                  className="rounded-full"
                  alt="User Avatar"
                />
              </div>
              <button
                onClick={handleSignOut}
                className="text-white hover:text-blue-200"
              >
                Sign Out
              </button>
            </>
          ) : (
            <>
              <Link href="/auth/login">
                <p className="text-white hover:text-blue-200">Sign In</p>
              </Link>
              <Link href="/auth/register">
                <p className="text-white hover:text-blue-200">Sign Up</p>
              </Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
}
