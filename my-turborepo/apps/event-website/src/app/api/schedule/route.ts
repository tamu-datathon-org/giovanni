import { NextResponse } from "next/server";

/** Frozen schedule (Hall of Fame) — Eastern Daylight Time, April 2026. */
const STATIC_SCHEDULE = [
    { id: 0, startTime: "2026-04-11T08:30:00-04:00", endTime: "2026-04-11T09:30:00-04:00", title: "Check in", location: "", category: "" },
    { id: 1, startTime: "2026-04-11T09:30:00-04:00", endTime: "2026-04-11T09:30:00-04:00", title: "Opening Ceremony", location: "", category: "" },
    { id: 2, startTime: "2026-04-11T10:00:00-04:00", endTime: "2026-04-11T10:00:00-04:00", title: "Hacking Starts", location: "", category: "" },
    { id: 3, startTime: "2026-04-11T10:15:00-04:00", endTime: "2026-04-11T10:45:00-04:00", title: "Prompting Workshop", location: "", category: "" },
    { id: 4, startTime: "2026-04-11T10:50:00-04:00", endTime: "2026-04-11T10:50:00-04:00", title: "Snack Drop!", location: "", category: "" },
    { id: 5, startTime: "2026-04-11T11:05:00-04:00", endTime: "2026-04-11T11:35:00-04:00", title: "Audio Processing Workshop", location: "", category: "" },
    { id: 6, startTime: "2026-04-11T11:40:00-04:00", endTime: "2026-04-11T12:10:00-04:00", title: "Webscraping Workshop", location: "", category: "" },
    { id: 7, startTime: "2026-04-11T12:15:00-04:00", endTime: "2026-04-11T12:15:00-04:00", title: "Lunch", location: "", category: "" },
    { id: 8, startTime: "2026-04-11T13:30:00-04:00", endTime: "2026-04-11T14:00:00-04:00", title: "Mini Event 1", location: "", category: "" },
    { id: 9, startTime: "2026-04-11T15:30:00-04:00", endTime: "2026-04-12T15:30:00-04:00", title: "Submissions Close", location: "", category: "" },
    { id: 10, startTime: "2026-04-11T15:30:00-04:00", endTime: "2026-04-11T16:30:00-04:00", title: "Mini Event 2", location: "", category: "" },
    { id: 11, startTime: "2026-04-11T16:00:00-04:00", endTime: "2026-04-11T16:00:00-04:00", title: "Closing Ceremony", location: "", category: "" },
] as const;

export async function GET() {
    return NextResponse.json(STATIC_SCHEDULE, {
        headers: {
            "Cache-Control": "public, max-age=86400",
        },
    });
}

/*
Previous dynamic Google Sheets implementation (event concluded):

export const dynamic = 'force-dynamic';

export async function GET() {
    try {
        const googleSheetUrl = process.env.NEXT_PUBLIC_GOOGLE_SHEET_API_URL;
        if (!googleSheetUrl) {
            throw new Error("Google Sheet API URL is not configured");
        }

        const response = await fetch(googleSheetUrl, {
            headers: { Accept: "application/json" },
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
                data = [];
            }
        } catch {
            data = [];
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
*/
