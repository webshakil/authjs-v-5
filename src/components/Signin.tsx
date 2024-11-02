import { signIn } from "@/auth";

export default function SignIn() {
  return (
    <div className="flex items-center justify-center h-screen bg-gray-100">
      <form
        action={async () => {
          "use server";
          await signIn("github", { redirectTo: "/dashboard" });
        }}
        className="bg-white p-6 rounded-lg shadow-md"
      >
        <button
          type="submit"
          className="w-full px-4 py-2 text-white bg-blue-500 rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-opacity-75"
        >
          Sign in with GitHub
        </button>
      </form>
    </div>
  );
}
