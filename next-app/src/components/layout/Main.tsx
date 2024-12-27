"use client";

import { Token } from "@/api/Token";
import { useEffect } from "react";
import { useRouter, usePathname } from "next/navigation";

export default function Main({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  const router = useRouter();
  const serviceFlg = usePathname().startsWith("/service/");

  useEffect(() => {
    if (serviceFlg) {
      const checkToken = async () => {
        const token = await Token();
        if (!token.success) {
          router.push("/site/login");
        }
      };
      checkToken();
      const intervalId = setInterval(checkToken, 60000);
      return () => clearInterval(intervalId);
    }
  }, [router, serviceFlg]);
  return (
    <main>
      <div className="flex flex-col w-screen items-center">
        <div className="w-full pt-5 px-3 lg:px-10">{children}</div>
      </div>
    </main>
  );
}
