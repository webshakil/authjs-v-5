import Link from 'next/link';
import Image from 'next/image';
import { auth, signOut } from "@/auth"

export default async function Navbar() {
  const session = await auth();

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
          <Link href="/dashboard">
            <p className="text-white hover:text-blue-200">Dashboard</p>
          </Link>

          {session ? (
            <>
              <div>
                <Image
                  src={session.user?.image || "/images/default.png"}
                  width={40}
                  height={40}
                  className="rounded-full"
                  alt="User Avatar"
                />
              </div>            
              <form
                action={async () => {
                  "use server";
                  await signOut();
                }}
              >
                <button type="submit" className="text-white hover:text-blue-200">
                  Sign Out
                </button>
              </form>
            </>
          ) : (
            <Link href="/auth/login">
              <p className="text-white hover:text-blue-200">Sign In</p>
            </Link>
          )}
        </div>
      </div>
    </nav>
  );
}

