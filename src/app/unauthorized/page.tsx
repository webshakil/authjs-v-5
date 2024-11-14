import Link from "next/link";

export default function Unauthorized() {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-100">
        <div className="text-center p-6 bg-white shadow-lg rounded-lg max-w-md w-full">
          <h1 className="text-2xl font-semibold text-red-500 mb-4">You do not have permission to view this page.</h1>
          <p className="text-gray-700">It seems like you don't have the right permissions to access this page. Please contact an administrator if you believe this is a mistake.</p>
          <div className="mt-6">
            <Link href="/" className="inline-block text-blue-500 hover:text-blue-700 text-sm font-semibold">Go back to homepage</Link>
          </div>
        </div>
      </div>
    );
  }
  