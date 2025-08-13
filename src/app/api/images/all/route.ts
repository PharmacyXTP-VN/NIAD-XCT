import { NextResponse } from "next/server";

export async function GET() {
  try {
  const backendUrl = process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:9999";
    
    // Call the backend API to list all image settings with all types
    const response = await fetch(`${backendUrl}/api/images`, {
      headers: {
        "Content-Type": "application/json",
      },
    });

    const data = await response.json();
    return NextResponse.json(data);
  } catch (error) {
    console.error("Error fetching all images:", error);
    return NextResponse.json(
      { message: "Failed to fetch all images", error: String(error) },
      { status: 500 }
    );
  }
}
