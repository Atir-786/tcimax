import API_URLS from "../../../config/apiUrls";
import { cookies } from "next/headers";
import { NextResponse } from "next/server"; // Make sure you import NextResponse

export async function POST(req) {
  const cookieStore = await cookies();
  const accessToken = cookieStore.get("access_token")?.value;

  if (!accessToken) {
    return NextResponse.json(
      { error: "Unauthorized, no access token found" },
      { status: 401 }
    );
  }

  try {
    // Since req.body will be a ReadableStream, we need to parse it to JSON
    const requestBody = await req.json();

    const response = await fetch(API_URLS.ADD_SALES, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${accessToken}`,
        "Content-Type": "application/json", // Set the content type to application/json
      },
      body: JSON.stringify(requestBody), // Stringify the request body
    });

    if (!response.ok) {
      const error = await response.json();
      return NextResponse.json(error, { status: response.status });
    }

    const result = await response.json();
    console.log(result);
    return NextResponse.json(result); // Return the result from the external API
  } catch (error) {
    console.error("Error in forwarding request:", error);
    return NextResponse.json(
      { error: error.message || "Something went wrong." },
      { status: 500 }
    );
  }
}
