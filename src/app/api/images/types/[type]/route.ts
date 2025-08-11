import { NextRequest, NextResponse } from "next/server";

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ type: string }> }
) {
  // Lấy type từ params trong đường dẫn
  const { type } = (await params);
  
  if (!type || !["banner", "partner", "advantage", "page-banner", "about"].includes(type)) {
    return NextResponse.json({ message: "Invalid image type" }, { status: 400 });
  }

  try {
  const backendUrl = process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:9999";
  const response = await fetch(`${backendUrl}/api/images/${type}`, {
      headers: {
        "Content-Type": "application/json",
      },
    });

    const data = await response.json();
    return NextResponse.json(data);
  } catch (error) {
    console.error("Error fetching images:", error);
    return NextResponse.json(
      { message: "Failed to fetch images" },
      { status: 500 }
    );
  }
}
