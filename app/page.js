"use client";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

const Page = () => {
  const router = useRouter();
  useEffect(() => {
    const token = localStorage.getItem("access_token");

    if (token) {
      router.push("/dashboard");
    } else {
      router.push("/login");
    }
  }, [router]);

  return null; // No UI needed
};

export default Page;
