import { NextRequest, NextResponse } from "next/server";

export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = (await params);
    if (!id) {
      return NextResponse.json({ message: "Image ID is required" }, { status: 400 });
    }

    const formData = await request.formData();
  const backendUrl = process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:9999";
    
    console.log("Updating image:", id);
    
    const response = await fetch(`${backendUrl}/api/images/${id}`, {
      method: "PUT",
      body: formData,
    });
    
    if (!response.ok) {
      const errorData = await response.json();
      console.error("Backend error:", errorData);
      return NextResponse.json(errorData, { status: response.status });
    }
    
    const data = await response.json();
    return NextResponse.json(data);
  } catch (error) {
    console.error("Error updating image:", error);
    return NextResponse.json(
      { message: "Failed to update image" },
      { status: 500 }
    );
  }
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = (await params);
    if (!id) {
      return NextResponse.json({ message: "Image ID is required" }, { status: 400 });
    }

  const backendUrl = process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:9999";
    
    console.log("Deleting image:", id);
    
    const response = await fetch(`${backendUrl}/api/images/${id}`, {
      method: "DELETE",
    });
    
    if (!response.ok) {
      const errorData = await response.json();
      console.error("Backend error:", errorData);
      return NextResponse.json(errorData, { status: response.status });
    }
    
    const data = await response.json();
    return NextResponse.json(data);
  } catch (error) {
    console.error("Error deleting image:", error);
    return NextResponse.json(
      { message: "Failed to delete image" },
      { status: 500 }
    );
  }
}
