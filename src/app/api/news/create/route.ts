import { NextRequest, NextResponse } from 'next/server';
const BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || 'http://localhost:9999';

export async function POST(req: NextRequest) {
  try {
    const formData = await req.formData();
    
    const res = await fetch(`${BASE_URL}/api/news/create`, {
      method: 'POST',
      body: formData,
    });
    
    const data = await res.json();
    
    if (res.ok) {
      return NextResponse.json(data);
    } else {
      return NextResponse.json(data, { status: res.status });
    }
  } catch (error) {
    return NextResponse.json({ error: (error as Error).message }, { status: 500 });
  }
} 