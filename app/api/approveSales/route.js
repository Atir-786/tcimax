import { cookies } from "next/headers";
import { NextResponse } from "next/server";
import API_URLS from "../../../config/apiUrls";
export async function POST(req) {
  const cookieStore = await cookies();
  const accessToken = cookieStore.get("access_token")?.value;
  try {
    const formData = await req.formData();
    // const userId = formData.get("user_id");
    // const uploadId = formData.get("upload_id");
    // const status = formData.get("status");
    const response = await fetch(API_URLS.APPROVE_SALES, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
      body: formData,
    });
    const result = await response.json();
    console.log(result);
    return NextResponse.json(result);
  } catch (error) {
    return NextResponse.json(
      { error: error.message || "Something went wrong." },
      { status: 500 }
    );
  }
}
