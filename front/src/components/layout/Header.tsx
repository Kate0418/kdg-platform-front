"use client";

import { useState } from "react"
import { usePathname } from "next/navigation";

export default function Header () {
    const [menu, setMenu] = useState(false);
    const site_flg = usePathname().startsWith("/site/");

    return (
        <>
            <header className="bg-[var(--text-color)] text-[var(--base-color)] w-screen h-20 p-4 fixed">
                <div className="flex items-center px-2">
                    <img className="h-[45px]" src="/img/logo.svg" alt="logo" />
                    <div className={`flex justify-end w-full ${ site_flg && 'hidden'}`}>
                        <button className="bg-[var(--text-color)]" onClick={function() { setMenu(true); }}>
                            <img className="p-2 border border-[var(--base-color)]" src="/img/menu.svg" alt="menu" />
                        </button>
                    </div>
                </div>
                <div className="border-b border-[var(--base-color)] h-2"></div>
            </header>
            
            <div className={`w-screen h-full" ${menu ? '': 'hidden'}`}>
                <div className="fixed w-full h-full z-40 bg-[var(--text-color)] opacity-60"></div>
                <div className="fixed right-0 w-80 h-full z-50 bg-[var(--base-color)] p-6">
                    <button className="fixed right-6 bg-[var(--base-color)]" onClick={function() { setMenu(false); }}>
                        <img className="p-2" src="/img/close.svg" alt="close" />
                    </button>
                </div>
            </div>
        </>
    )
}