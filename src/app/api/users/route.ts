import { NextResponse } from 'next/server';

import User from '@/models/User'; 
import dbConnect from '@/lib/mongodb';

export async function GET() {
  try {
    await dbConnect(); 

    const users = await User.find(); 

    return NextResponse.json(users); 
  } catch (error) {
    console.error('Failed to fetch users:', error);
    return NextResponse.json({ error: 'Failed to fetch users' }, { status: 500 });
  }
}
