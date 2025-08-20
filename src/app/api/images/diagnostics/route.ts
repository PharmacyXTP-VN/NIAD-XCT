import { NextResponse } from "next/server";

export async function GET() {
  try {
  const backendUrl = process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:9999";
    
    // Check available banner types
    const types = ["banner", "advantage", "partner", "page-banner", "contact"];
    const results: Record<string, any> = {};
    
    // Test each type and get the results
    for (const type of types) {
      try {
        const response = await fetch(`${backendUrl}/api/images/${type}`, {
          headers: { "Content-Type": "application/json" },
        });
        
        if (response.ok) {
          const data = await response.json();
          results[type] = {
            success: true,
            count: data.data?.length || 0,
            data: data.data || []
          };
        } else {
          results[type] = {
            success: false,
            status: response.status,
            statusText: response.statusText
          };
        }
      } catch (error) {
        results[type] = {
          success: false,
          error: String(error)
        };
      }
    }
    
    return NextResponse.json({
      message: "Image types diagnostics",
      results,
      backendUrl
    });
  } catch (error) {
    console.error("Error checking image types:", error);
    return NextResponse.json(
      { message: "Failed to check image types", error: String(error) },
      { status: 500 }
    );
  }
}
