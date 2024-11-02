
import { auth, signOut } from "@/auth"
import Image from "next/image";

export default async function Home() {
  const session = await auth()
  
  return (
    <>
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
  <h1 className="text-red-800 text-3xl font-bold">
    Let's play with auth.js and GitHub provider
  </h1>
</div>




  </>
  );
}
