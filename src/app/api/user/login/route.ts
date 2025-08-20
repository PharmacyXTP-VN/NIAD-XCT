import { NextRequest, NextResponse } from 'next/server';

const BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || 'http://localhost:9999';

export async function POST(req: NextRequest) {
  try {
    const { userName, password } = await req.json();
    if (!userName || !password) {
      return NextResponse.json({ message: 'Missing userName or password' }, { status: 400 });
    }
    // Gọi API backend thực tế nếu có
    const apiUrl = `${BASE_URL}/api/user/login`;
    const res = await fetch(apiUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ userName, password }),
    });
    const data = await res.json();
    if (res.ok) {
      return NextResponse.json(data);
    } else {
      return NextResponse.json(data, { status: res.status });
    }
          } catch {
          return NextResponse.json({ message: 'Invalid request' }, { status: 400 });
        }
} 