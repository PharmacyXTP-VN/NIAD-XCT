import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData();
    
    // Kiểm tra xem có file image không
    const imageFile = formData.get("image");
    if (!imageFile || !(imageFile instanceof File) || imageFile.size === 0) {
      return NextResponse.json(
        { message: "Image file is required" },
        { status: 400 }
      );
    }
    
  const backendUrl = process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:9999";
    
    console.log("Sending request to:", `${backendUrl}/api/images`);
    console.log("Image file size:", imageFile.size, "bytes");
    
    const response = await fetch(`${backendUrl}/api/images`, {
      method: "POST",
      body: formData,
    });
    
    const data = await response.json();
    
    if (!response.ok) {
      console.error("Backend error:", data);
      return NextResponse.json(data, { status: response.status });
    }
    
    return NextResponse.json(data);
  } catch (error) {
    console.error("Error adding image:", error);
    return NextResponse.json({ message: "Failed to add image" }, { status: 500 });
  }
}
