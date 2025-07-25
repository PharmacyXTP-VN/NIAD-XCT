import { NextRequest, NextResponse } from 'next/server';

const BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || 'http://localhost:9999';

export async function GET(req: NextRequest, context: { params: any }) {
  const { id } = context.params;
  if (!id) return NextResponse.json({ message: 'Missing id' }, { status: 400 });
  const apiUrl = `${BASE_URL}/api/car/${id}`;
  const res = await fetch(apiUrl, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  });
  if (!res.ok) {
    return NextResponse.json({ message: 'Not found' }, { status: 404 });
  }
  const data = await res.json();
  return NextResponse.json(data);
} 