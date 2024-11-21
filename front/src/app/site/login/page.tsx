"use client";

import Login from "@/api/Login";
import { Loader } from "@/components/layout/Loader";
import Image from "next/image";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/layout/Button";

export default function Page() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const LoginApi = async () => {
    setLoading(true);
    const response = await Login(email, password);
    if (response.success) {
      router.push(`/service/${response.type}/top`);
    } else {
      setLoading(false);
      alert("メールアドレスもしくはパスワードが間違っています。");
    }
  };

  if (loading) {
    return <Loader />;
  }

  return (
    <div className="flex flex-col items-center justify-center w-screen h-[calc(100vh-110px)]">
      <form
        className="flex flex-col lg:w-1/3 border border-text rounded-lg bg-white overflow-hidden"
        onSubmit={(e) => {
          e.preventDefault();
          LoginApi();
        }}
      >
        <p className="text-2xl text-center py-2 text-base bg-text">ログイン</p>
        <div className="p-4">
          <div className="flex justify-center py-5">
            <Image
              src="/img/icon.svg"
              alt="アイコン"
              width={300}
              height={300}
              priority
            />
          </div>

          <div className="pb-5">
            <label>メールアドレス</label>
            <input
              className="border border-text w-full p-2"
              type="text"
              value={email}
              onChange={function (e) {
                setEmail(e.target.value);
              }}
            />
          </div>
          <div className="pb-2">
            <label>パスワード</label>
            <input
              className="border border-text w-full p-2"
              type="password"
              value={password}
              onChange={function (e) {
                setPassword(e.target.value);
              }}
            />
          </div>

          <div className="flex justify-end pr-2">
            <Button type="submit">ログイン</Button>
          </div>
        </div>
        <div className="bg-text h-2 mt-auto"></div>
      </form>
    </div>
  );
}
