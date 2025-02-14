import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import API_URLS from "../../../config/apiUrls";

export async function POST() {
  const cookieStore = cookies();
  const token = cookieStore.get("access_token")?.value;

  if (!token) {
    return NextResponse.json({ message: "Not authenticated" }, { status: 401 });
  }

  try {
    // Call the backend logout API
    const response = await fetch(API_URLS.LOGOUT, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    if (!response.ok) {
      return NextResponse.json(
        { message: "Logout failed" },
        { status: response.status }
      );
    }

    //  Correct way to delete cookies in Next.js
    cookieStore.delete("access_token");
    cookieStore.delete("user_data");

    return NextResponse.json(
      { message: "Logged out successfully" },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json(
      { message: "Internal Server Error" },
      { status: 500 }
    );
  }
}
