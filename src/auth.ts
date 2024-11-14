import NextAuth from "next-auth";
import GitHub from "next-auth/providers/github";

export const {  handlers, signIn, signOut, auth } = NextAuth({
  
  providers: [GitHub],

  callbacks: {
    authorized: async ({ auth }) => {
      return !!auth;
    },
  },
});







// import NextAuth from "next-auth";
// import GitHubProvider from "next-auth/providers/github";

// export const { handlers, signIn, signOut, auth } = NextAuth({
//   providers: [
//     GitHubProvider({
//       clientId: process.env.AUTH_GITHUB_ID as string,
//       clientSecret: process.env.AUTH_GITHUB_SECRET as string,
//       profile(profile) {
//         console.log("profile", profile);
//         return {
//           id: String(profile.id), // Convert number to string
//           name: profile.name,
//           email: profile.email,
//           image: profile.avatar_url as string, // GitHub profile image field
//           role: "user" // Set default role to "user"
//         };
//       },
//     })
//   ],
//   callbacks: {
//     jwt({ token, user }) {
//       if (user) token.role = user.role;
//       return token;
//     },
//     session({ session, token }) {
//       session.user.role = token.role;
//       return session;
//     },
//   },
// });









