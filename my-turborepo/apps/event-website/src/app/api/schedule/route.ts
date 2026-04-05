import { NextResponse } from "next/server";

// Mark this route as dynamic to allow no-store fetches
export const dynamic = 'force-dynamic';

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
                
            },
            cache: "no-store",
             redirect: "follow",
        });

        if (!response.ok) {
            throw new Error(`Google Sheets API returned ${response.status}: ${response.statusText}`);
        }

        const responseText = await response.text();

        let data: unknown[];
        try {
            data = JSON.parse(responseText) as unknown[];
            if (!Array.isArray(data)) {
                console.warn("Google Sheets returned non-array data:", data);
                data = []; // fallback to empty array
            }
        } catch (parseError) {
            console.error("JSON parsing failed, returning empty array:", parseError);
            data = []; // fallback to empty array
        }

        return NextResponse.json(data, {
            headers: {
                "Cache-Control": "no-store, no-cache, must-revalidate, max-age=0, s-maxage=0",
            },
        });
    } catch (error) {
        console.error("Error in API route:", error);
        return NextResponse.json(
            { error: error instanceof Error ? error.message : "Failed to fetch schedule", data: [] },
            {
                status: 500,
                headers: {
                    "Cache-Control": "no-store, no-cache, must-revalidate, max-age=0, s-maxage=0",
                },
            },
        );
    }
}