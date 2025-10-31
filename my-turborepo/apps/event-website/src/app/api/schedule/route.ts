import { NextResponse } from "next/server";

export async function GET() {
  try {
    const googleSheetUrl = process.env.NEXT_PUBLIC_GOOGLE_SHEET_API_URL;
    if (!googleSheetUrl) {
      throw new Error("Google Sheet API URL is not configured");
    }

    console.log("Fetching from Google Sheets URL:", googleSheetUrl);

    const response = await fetch(googleSheetUrl, {
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
    });

    // Get the response as text first
    const responseText = await response.text();

    try {
      // Try to parse the text as JSON
      const data = JSON.parse(responseText);

      // Validate the data structure
      if (!Array.isArray(data)) {
        console.error("Unexpected data structure:", data);
        throw new Error("API did not return an array");
      }

      return NextResponse.json(data);
    } catch (parseError) {
      console.error("JSON parsing error:", parseError);
      throw new Error("Failed to parse response as JSON");
    }
  } catch (error) {
    console.error("Error in API route:", error);
    return NextResponse.json(
      {
        error:
          error instanceof Error ? error.message : "Failed to fetch schedule",
      },
      { status: 500 },
    );
  }
}
