import { cookies } from "next/headers";
import axios from "axios";
import API_URLS from "../../../config/apiUrls";

export async function GET(req) {
  const cookieStore = await cookies();
  const accessToken = cookieStore.get("access_token")?.value;

  if (!accessToken) {
    return new Response(JSON.stringify({ error: "Unauthorized" }), {
      status: 401,
    });
  }
  try {
    const page = req.nextUrl.searchParams.get("page");
    const rowsPerPage = req.nextUrl.searchParams.get("rowsPerPage");
    const response = await axios.get(
      `${API_URLS.GET_SALES_QUEUE}/${page}/${rowsPerPage}/bulkusers`,
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      }
    );
    return new Response(JSON.stringify(response.data.data), {
      status: 200,
    });
  } catch (err) {
    return new Response(
      JSON.stringify({
        error: err.response?.data?.message || "An error occurred.",
      }),
      { status: err.response?.status || 500 }
    );
  }
}
