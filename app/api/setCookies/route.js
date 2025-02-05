import { NextResponse } from "next/server";
import { serialize } from "cookie";

export async function POST(req) {
  const body = await req.json();

  const { accessToken, user } = body;

  if (!accessToken || !user) {
    return NextResponse.json(
      { message: "Missing token or user data" },
      { status: 400 }
    );
  }

  const headers = new Headers();

  headers.append(
    "Set-Cookie",
    serialize("access_token", accessToken, {
      httpOnly: true,
      secure: true,
      maxAge: 60 * 60 * 24,
      path: "/",
    })
  );

  headers.append(
    "Set-Cookie",
    serialize("user_data", JSON.stringify(user), {
      httpOnly: false,
      secure: true,
      maxAge: 60 * 60 * 24,
      path: "/",
    })
  );

  return new NextResponse(
    JSON.stringify({ message: "Cookies set successfully" }),
    { headers }
  );
}
