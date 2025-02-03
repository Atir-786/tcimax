import { NextResponse } from "next/server";
import axios from "axios";
import { cookies } from "next/headers";

export async function POST(req) {
  try {
    const accessToken = cookies().get("access_token")?.value;

    if (!accessToken) {
      return NextResponse.json(
        { message: "Unauthorized: No access token found" },
        { status: 401 }
      );
    }

    // Parse the incoming form data and target upload API
    const formData = await req.formData();
    const file = formData.get("bulk_data");
    const targetUrl = formData.get("uploadUrl");

    if (!file) {
      return NextResponse.json(
        { message: "File not provided." },
        { status: 400 }
      );
    }

    if (!targetUrl) {
      return NextResponse.json(
        { message: "Target API URL not provided." },
        { status: 400 }
      );
    }

    const backendFormData = new FormData();
    backendFormData.append("bulk_data", file);

    const uploadResponse = await axios.post(targetUrl, backendFormData, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
        "Content-Type": "multipart/form-data",
      },
    });

    return NextResponse.json(
      { message: "File uploaded successfully", data: uploadResponse.data },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error uploading file:", error.message);
    return NextResponse.json(
      { message: "Upload failed", error: error.message },
      { status: 500 }
    );
  }
}
