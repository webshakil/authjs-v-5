import { NextResponse } from 'next/server';
import bcrypt from 'bcrypt';
import dbConnect from '@/lib/mongodb';
import User from '@/models/User';
import { createSession } from '@/app/lib/session';

export async function POST(req: Request) {
  await dbConnect();
  const { email, password } = await req.json();
  const user = await User.findOne({ email });

  if (!user) {
    return NextResponse.json({ error: 'Invalid email or password' }, { status: 401 });
  }

  const isPasswordCorrect = await bcrypt.compare(password, user.password);
  if (!isPasswordCorrect) {
    return NextResponse.json({ error: 'Invalid email or password' }, { status: 401 });
  }

  // Prepare the session payload
  const { _id, name, email: userEmail, role } = user;
  const sessionPayload = {
    userId: _id.toString(),
    name,
    email: userEmail,
    role,
    expiresAt: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000), 
  };

  // Create a session
  await createSession(sessionPayload);

  // Return user details (without password)
  const userWithoutPassword = user.toObject();
  delete userWithoutPassword.password;

  return NextResponse.json(
    { message: 'Login successful', user: userWithoutPassword },
    { status: 200 }
  );
}
