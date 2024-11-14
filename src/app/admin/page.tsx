import React from 'react';

const Page = () => {
  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-50">
      <div className="text-center p-8 bg-white shadow-xl rounded-lg max-w-lg w-full">
        <h1 className="text-3xl font-bold text-blue-600 mb-6">Admin Page</h1>
        <p className="text-gray-700 text-lg">
          Welcome to the Admin page. Here you can manage users, content, and settings.
        </p>
      </div>
    </div>
  );
};

export default Page;

