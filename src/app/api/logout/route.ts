

import { NextResponse } from 'next/server';

import { deleteSession } from '@/app/lib/session';

export async function DELETE() {
  await deleteSession()

  return NextResponse.json({ message: 'Session deleted successfully' });
}
