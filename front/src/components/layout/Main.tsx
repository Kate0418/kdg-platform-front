'use client'

import Token from '@/api/Token'
import { useEffect } from 'react'
import { useRouter, usePathname } from "next/navigation";

export default function Main ({ children, }: Readonly<{ children: React.ReactNode; }>) {
    const router = useRouter();
    const service_flg = usePathname().startsWith("/service/");

    useEffect(() => {
        if (service_flg) {
            const checkToken = async () => {
                if (!await Token()) {
                    router.push("/site/login");
                }
            }
            const interval_id = setInterval(checkToken, 60000)
            return () => clearInterval(interval_id);
        }
    }, [router]);
    return <main>{children}</main>
}