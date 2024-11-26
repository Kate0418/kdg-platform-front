"use client";

import { useState } from "react";
import { usePathname } from "next/navigation";
import Image from "next/image";
import { userTypes } from "@/config";

export default function Header() {
  const [menu, setMenu] = useState(false);
  const site_flg = usePathname().startsWith("/site/");
  const type = Number(localStorage.getItem("type"));
  const pages = [
    [],
    [
      { name: "生徒情報管理", type: "student" },
      { name: "講師情報管理", type: "teacher" },
      { name: "科目情報管理", type: "subject" },
      { name: "コース情報管理", type: "course" },
    ],
    [],
    [],
  ];

  return (
    <>
      <header className="bg-text border-base w-screen h-20 p-4 fixed">
        <div className="flex items-center px-2">
          <a href={site_flg ? "site/login" : `/service/${userTypes[type]}/top`}>
            <Image src="/img/logo.svg" alt="logo" width={280} height={45} />
          </a>
          <div className={`flex justify-end w-full ${site_flg && "hidden"}`}>
            <button
              className="border"
              onClick={function () {
                setMenu(true);
              }}
            >
              <Image
                className="p-2"
                src="/img/menu.svg"
                alt="close"
                width={42}
                height={42}
              />
            </button>
          </div>
        </div>
        <div className="border-b border-base h-2"></div>
      </header>

      <div className={`w-screen h-full" ${menu ? "" : "hidden"}`}>
        <div
          className="fixed w-screen h-screen z-30 bg-text-0.6 flex justify-end"
          onClick={() => setMenu(false)}
        >
          <div className="w-80 bg-base p-6">
            <button
              className="fixed right-6"
              onClick={function () {
                setMenu(false);
              }}
            >
              <Image
                className="p-2"
                src="/img/close.svg"
                alt="close"
                width={42}
                height={42}
              />
            </button>
            <div className="flex flex-col gap-4 pt-12">
              {pages[type].map((page, index) => (
                <a
                  key={index}
                  href={`/service/${userTypes[type]}/${page.type}`}
                >
                  <div className="flex text-xl gap-1 pb-1 border-b border-text">
                    <Image
                      src={`/img/${page.type}.svg`}
                      alt={page.type}
                      width={20}
                      height={20}
                    />
                    {page.name}
                  </div>
                </a>
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
