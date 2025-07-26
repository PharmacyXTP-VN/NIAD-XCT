import { NextRequest, NextResponse } from "next/server";

const BASE_URL =
  process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:9999";

export async function PUT(req: NextRequest, context: { params: Promise<any> }) {
  const { id } = await context.params;

  // Kiểm tra và làm sạch ID
  if (!id || typeof id !== "string") {
    return NextResponse.json({ error: "Invalid ID" }, { status: 400 });
  }

  // Loại bỏ các ký tự không mong muốn
  const cleanId = id.replace(/[^a-zA-Z0-9]/g, "");

  if (cleanId.length !== 24) {
    return NextResponse.json(
      { error: "Invalid ObjectId format" },
      { status: 400 }
    );
  }

  const apiUrl = `${BASE_URL}/api/car/${cleanId}`;

  try {
    const formData = await req.formData();

    const res = await fetch(apiUrl, {
      method: "PUT",
      body: formData,
    });

    const data = await res.json();

    if (res.ok) {
      return NextResponse.json(data);
    } else {
      return NextResponse.json(data, { status: res.status });
    }
  } catch (error) {
    return NextResponse.json(
      { error: (error as Error).message },
      { status: 500 }
    );
  }
}
