import { NextRequest, NextResponse } from 'next/server';

const BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || 'http://localhost:9999';

export async function PUT(
  req: NextRequest, 
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = (await params);
  
  // Kiểm tra và làm sạch ID
  if (!id || typeof id !== 'string') {
    return NextResponse.json({ error: 'Invalid ID' }, { status: 400 });
  }
  
  // Loại bỏ các ký tự không mong muốn
  const cleanId = id.replace(/[^a-zA-Z0-9]/g, '');
  
  if (cleanId.length !== 24) {
    return NextResponse.json({ error: 'Invalid ObjectId format' }, { status: 400 });
  }
  
  try {
    // Lấy dữ liệu từ request
    const data = await req.json();
    
    // Kiểm tra xem có gallery array không
    if (!data || !Array.isArray(data.gallery)) {
      return NextResponse.json({ error: 'Invalid gallery data. Expected array.' }, { status: 400 });
    }
    
    // Gửi request đến backend
    const apiUrl = `${BASE_URL}/api/car/gallery/${cleanId}`;
    const res = await fetch(apiUrl, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ gallery: data.gallery })
    });
    
    const responseData = await res.json();
    
    if (res.ok) {
      return NextResponse.json(responseData);
    } else {
      return NextResponse.json(responseData, { status: res.status });
    }
  } catch (error) {
    return NextResponse.json({ error: (error as Error).message }, { status: 500 });
  }
}
