import { NextResponse } from 'next/server';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import dbConnect from '@/lib/mongodb';
import User from '@/models/User';

const JWT_SECRET = process.env.JWT_SECRET || 'your_jwt_secret_key'; // Replace with a strong secret in production

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

    // Generate JWT
    const token = jwt.sign(
      { id: user._id, email: user.email },
      JWT_SECRET,
      { expiresIn: '1h' } // Token expiration time
    );

    return NextResponse.json({ message: 'User registered successfully', token, user }, { status: 201 });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to register user' }, { status: 500 });
  }
}

