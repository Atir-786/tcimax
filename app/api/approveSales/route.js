import { cookies } from "next/headers";
import { NextResponse } from "next/server";
export async function POST(req) {
  const cookieStore = await cookies();
  const accessToken = cookieStore.get("access_token")?.value;
  try {
    const formData = await req.formData();
    // const userId = formData.get("user_id");
    // const uploadId = formData.get("upload_id");
    // const status = formData.get("status");
    const response = await fetch("https://mis.tcimax.co.in/api/approveSales", {
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
