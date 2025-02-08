import { NextResponse } from "next/server";
import { cookies } from "next/headers"; // To access cookies
import axios from "axios";
import { serialize } from "cookie";
import API_URLS from "../../../config/apiUrls";

export async function POST() {
  const cookieStore = await cookies();
  const token = cookieStore.get("access_token")?.value;
  // console.log(token);
  if (!token) {
    return new NextResponse(
      JSON.stringify({ message: "No access token found." }),
      { status: 400 }
    );
  }

  try {
    // Call the backend logout API
    await axios.post(
      API_URLS.LOGOUT,
      {},
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    // Clear cookies by setting maxAge to 0
    const headers = new Headers();
    headers.append(
      "Set-Cookie",
      serialize("access_token", "", {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        maxAge: 0,
        path: "/",
      })
    );
    headers.append(
      "Set-Cookie",
      serialize("user_data", "", {
        httpOnly: false,
        secure: process.env.NODE_ENV === "production",
        maxAge: 0,
        path: "/",
      })
    );

    return new NextResponse(
      JSON.stringify({ message: "Successfully logged out" }),
      { headers }
    );
  } catch (error) {
    return new NextResponse(
      JSON.stringify({ message: "Failed to log out.", error: error.message }),
      { status: 500 }
    );
  }
}
