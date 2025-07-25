import { NextRequest, NextResponse } from 'next/server';

const BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || 'http://localhost:9999';

export async function GET(req: NextRequest) {
  const { searchParams, pathname } = new URL(req.url);
  // Kiểm tra nếu là route /api/car/[id]
  const match = pathname.match(/\/api\/car\/(\w+)/);
  if (match && match[1]) {
    const id = match[1];
    const apiUrl = `${BASE_URL}/api/car/${id}`;
    const res = await fetch(apiUrl, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });
    const data = await res.json();
    return NextResponse.json(data);
  }
  // Mặc định: lấy list
  const query = searchParams.toString();
  const apiUrl = `${BASE_URL}/api/car${query ? `?${query}` : ''}`;
  const res = await fetch(apiUrl, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  });
  const data = await res.json();
  return NextResponse.json(data);
} 