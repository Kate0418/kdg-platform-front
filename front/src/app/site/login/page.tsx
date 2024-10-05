"use client"

import Login from "@/api/Login";
import Image from "next/image";
import { useState } from "react";

export default function Page() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const Api = async () => {
        if (await Login(email, password)) {
            alert('こんにちは')
        } else {
            console.log(email, password)
            alert('メールアドレスもしくはパスワードが間違っています。')
        }
    }

    return (
      <div className="flex flex-col items-center justify-center w-screen h-[calc(100vh-110px)]">
        <div className="flex flex-col w-1/3 h-3/4 border border-[var(--text-color)] rounded-lg bg-white overflow-hidden">
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
                    <button className="p-3 rounded-lg" onClick={ Api }>ログイン</button>
                </div>
            </div>
            <div className="bg-[var(--text-color)] h-2 mt-auto"></div>
        </div>
      </div>
    );
}