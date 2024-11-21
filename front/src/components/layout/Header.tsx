"use client";

import { useState } from "react";
import { usePathname } from "next/navigation";

export default function Header() {
  const [menu, setMenu] = useState(false);
  const site_flg = usePathname().startsWith("/site/");

  return (
    <>
      <header className="bg-text border-base w-screen h-20 p-4 fixed">
        <div className="flex items-center px-2">
          <img className="h-[45px]" src="/img/logo.svg" alt="logo" />
          <div className={`flex justify-end w-full ${site_flg && "hidden"}`}>
            <button
              onClick={function () {
                setMenu(true);
              }}
            >
              <img className="p-2 border" src="/img/menu.svg" alt="menu" />
            </button>
          </div>
        </div>
        <div className="border-b border-base h-2"></div>
      </header>

      <div className={`w-screen h-full" ${menu ? "" : "hidden"}`}>
        <div className="fixed w-full h-full z-40 bg-text-0.6"></div>
        <div className="fixed right-0 w-80 h-full z-50 bg-base p-6">
          <button
            className="fixed right-6"
            onClick={function () {
              setMenu(false);
            }}
          >
            <img className="p-2" src="/img/close.svg" alt="close" />
          </button>
        </div>
      </div>
    </>
  );
}
