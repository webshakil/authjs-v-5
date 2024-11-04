import { NextResponse } from 'next/server';
import bcrypt from 'bcrypt';
import dbConnect from '@/lib/mongodb';
import User from '@/models/User';

export async function POST(req: Request) {
  await dbConnect();

  const { name, email, password } = await req.json();

  // Check if the user already exists
  const existingUser = await User.findOne({ email });
  if (existingUser) {
    return NextResponse.json({ error: 'User already exists' }, { status: 409 });
  }

  // Hash the password
  const hashedPassword = await bcrypt.hash(password, 10);

  // Create a new user
  const user = new User({
    name,
    email,
    password: hashedPassword,
  });

  try {
    await user.save();
    return NextResponse.json({ message: 'User registered successfully' }, { status: 201 });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to register user' }, { status: 500 });
  }
}
