import "server-only";
import { SignJWT, jwtVerify } from "jose";
import { cookies } from "next/headers";

const secretKey = process.env.SESSION_SECRET;
const encodedKey = new TextEncoder().encode(secretKey);

type SessionPayload = {
  userId: string;
  name: string;
  email: string;
  role: string;
  expiresAt: Date;
};

// Create a session by encoding user details and storing in cookies
export async function createSession(payload: SessionPayload) {
  const sessionToken = await encrypt(payload);

  const cookieStore = await cookies();
  cookieStore.set("session", sessionToken, {
    httpOnly: true,
    secure: true,
    expires: payload.expiresAt,
    path: "/",
  });
}

// Delete session by removing the cookie
export async function deleteSession() {
  const cookieStore = await cookies();
  cookieStore.delete("session");
}

// Encrypts the session payload using JWT
export async function encrypt(payload: SessionPayload) {
  return new SignJWT({ ...payload })
    .setProtectedHeader({ alg: "HS256" })
    .setIssuedAt()
    .setExpirationTime("7d")
    .sign(encodedKey);
}

// Decrypts and verifies the session JWT
export async function decrypt(session: string | undefined = "") {
  try {
    const { payload } = await jwtVerify(session, encodedKey, {
      algorithms: ["HS256"],
    });
    return payload;
  } catch (error) {
    console.log("Failed to verify session");
    return null;
  }
}

