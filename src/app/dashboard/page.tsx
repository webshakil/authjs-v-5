
import { auth } from '@/auth';
import UserTable from '@/components/UserTable';
import Image from 'next/image';
import React from 'react';

const Page = async () => {
  const session = await auth();

  if (!session?.user) return null;

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="text-center space-y-4 p-8 bg-white rounded-lg shadow-lg">
        <h1 className="text-2xl font-bold text-gray-800">This is the dashboard page</h1>
        <div>
          <Image
            src={session.user.image || '/images/default.png'}
            width={50}
            height={50}
            priority={false}
            alt="User Avatar"
            className="rounded-full"
          />
          <p>{session?.user?.name}</p>
          <UserTable/>
        </div>
      </div>
    </div>
  );
};

export default Page;


