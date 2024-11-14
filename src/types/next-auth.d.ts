// /types/next-auth.d.ts

import "next-auth";
import "next-auth/jwt";

declare module "next-auth" {
  interface Session {
    user: {
      id?: string;
      name?: string;
      email?: string;
      image?: string;
      role?: string;
    };
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    id?: string;
  }
}


// next-auth.d.ts
import NextAuth, { DefaultSession, DefaultUser } from "next-auth";
import { JWT } from "next-auth/jwt";

declare module "next-auth" {
  interface User extends DefaultUser {
    role?: string;
  }

  interface Session {
    user: {
      role?: string;
    } & DefaultSession["user"];
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    role?: string;
  }
}


// next.d.ts or global.d.ts
import { NextRequest } from 'next/server';

declare global {
  namespace NodeJS {
    interface Global {
      Request: NextRequest & { user?: { id: string; email: string; role: string } };
    }
  }
}


