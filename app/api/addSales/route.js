import { NextResponse } from "next/server";
import API_URLS from "../../../config/apiUrls";
import { cookies } from "next/headers";

export async function POST(req) {
  const cookieStore = await cookies();
  const accessToken = cookieStore.get("access_token")?.value;
  console.log(accessToken);
  const body = await req.json();
  console.log(body);
  console.log(Number(body.distributor_mobile));

  const formdata = new FormData();
  console.log("apending");
  formdata.append("date", body.date);
  formdata.append("distributor_id", body.distributor_id);
  formdata.append("distributor_mobile", Number(body.distributor_mobile));
  formdata.append("retailer_id", body.retailer_id);
  formdata.append("retailer_name", body.retailer_name);
  formdata.append("retailer_mobile", Number(body.retailer_mobile));
  formdata.append("retailer_address", body.retailer_address);
  formdata.append("qty", body.qty);
  console.log("apended");

  try {
    const response = await fetch("https://mis.tcimax.co.in/api/addsales", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
      body: formdata,
    });
    console.log(response);
    const resultText = await response.text(); // Handle non-JSON response
    console.log("External API ResponseText:", resultText.response);

    return NextResponse.json({ response: resultText });
  } catch (error) {
    console.log(error);
    return NextResponse.json({ error: "somerror" }, { status: 500 });
  }
}
