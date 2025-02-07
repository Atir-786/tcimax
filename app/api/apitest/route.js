import { cookies } from "next/headers";
import { NextResponse } from "next/server";

export async function POST(req) {
  const cookieStore = cookies();
  const accessToken = cookieStore.get("access_token")?.value;

  if (!accessToken) {
    return NextResponse.json(
      { error: "Unauthorized, no access token found" },
      { status: 401 }
    );
  }

  try {
    // Parse JSON payload from the request
    const body = await req.json();

    console.log("Parsed JSON data from request:", body);

    // Convert payload to FormData
    const formdata = new URLSearchParams();
    formdata.append("date", "01/Dec/2024");
    formdata.append("distributor_id", "52");
    formdata.append("distributor_mobile", "9419003250");
    formdata.append("retailer_id", "89");
    formdata.append("retailer_name", "RFG Retailer");
    formdata.append("retailer_mobile", "99066125876");
    formdata.append("retailer_address", "srinagar");
    formdata.append("qty", "2");

    const apiResponse = await fetch("https://mis.tcimax.co.in/api/addsales", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
      body: formdata,
    });

    const resultText = await apiResponse.text(); // Handle non-JSON response
    console.log("External API Response:", resultText);

    return NextResponse.json({ response: resultText });
  } catch (error) {
    console.error("Error in forwarding request:", error);
    return NextResponse.json(
      { error: error.message || "Something went wrong." },
      { status: 500 }
    );
  }
}
