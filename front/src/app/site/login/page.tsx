"use client"

import Login from "@/api/Login";
import { Loader } from "@/components/layout/Loader";
import Image from "next/image";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/layout/Button";

export default function () {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState(false);
    const router = useRouter()

    const Api = async () => {

        setLoading(true);
        const login = await Login(email, password);
        if (login.success) {
            router.push(`/service/${login.type}/top`);
        } else {
            setLoading(false);
            alert('メールアドレスもしくはパスワードが間違っています。')
        }
    }

    if (loading) { return <Loader /> }

    return (
      <div className="flex flex-col items-center justify-center w-screen h-[calc(100vh-110px)]">
        <form className="flex flex-col lg:w-1/3 border border-[var(--text-color)] rounded-lg bg-white overflow-hidden"
            onSubmit={(e) => {
                e.preventDefault();
                Api();
            }}>
            <p className="text-2xl text-center py-2 text-[var(--base-color)] bg-[var(--text-color)]">ログイン</p>
            <div className="p-4">
                <div className="flex justify-center py-5">
                    <Image src="/img/icon.svg" alt="アイコン" width={300} height={300} priority/>
                </div>

                <div className="pb-5">
                    <label>メールアドレス</label>
                    <input className="border border-[var(--text-color)] w-full p-2" onChange={ function(e){ setEmail(e.target.value) } } />
                </div>
                <div className="pb-2">
                    <label>パスワード</label>
                    <input className="border border-[var(--text-color)] w-full p-2" type="password" onChange={ function(e){ setPassword(e.target.value) } } />
                </div>

                <div className="flex justify-end pr-2">
                    <Button type="submit">ログイン</Button>
                </div>
            </div>
            <div className="bg-[var(--text-color)] h-2 mt-auto"></div>
        </form>
      </div>
    );
}