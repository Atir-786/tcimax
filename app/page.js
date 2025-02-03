import { cookies } from "next/headers";
import { redirect } from "next/navigation";

const Page = () => {
  const cookieStore = cookies();

  const token = cookieStore.get("access_token");
  if (token) {
    redirect("/dashboard");
  } else {
    redirect("/login");
  }

  return null;
};

export default Page;
