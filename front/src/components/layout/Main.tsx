'use client'

import Token from '@/api/Token'
import { useState, useEffect } from 'react'
import { useRouter, usePathname } from "next/navigation";
import Loader from '@/components/layout/Loader';

export default function Main ({ children, }: Readonly<{ children: React.ReactNode; }>) {
    const [loading, setLoading] = useState(true);
    const router = useRouter();
    const service_flg = usePathname().startsWith("/service/");

    useEffect(() => {
        if (service_flg) {
            const checkToken = async () => {
                if (!await Token()) {
                    router.push("/site/login");
                }
                setLoading(false);
            }

            checkToken();
            const interval_id = setInterval(checkToken, 60000)
            return () => clearInterval(interval_id);
        } else {
            setLoading(false);
        }
    }, [router]);


    if (loading) {
        return <main><Loader /></main>
    }
    return <main>{children}</main>
}