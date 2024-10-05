"use client";

import Image from "next/image"
import { useState } from "react"

export default function Header () {
    const [menu, setMenu] = useState(false);

    return (
        <>
            <header className="bg-[var(--text-color)] text-[var(--base-color)] w-screen h-28 p-4 fixed">
                <div className="flex items-center px-2">
                    <Image src="/img/logo.svg" alt="ロゴ" width={419} height={71} priority />
                    <div className="flex justify-end w-full">
                        <button className="bg-[var(--text-color)]" onClick={function() { setMenu(true); }}>
                            <Image className="p-2 border border-[var(--base-color)]" src="/img/menu.svg" alt="ロゴ" width={50} height={50} priority />
                        </button>
                    </div>
                </div>
                <div className="border-b border-[var(--base-color)] h-2"></div>
            </header>
            
            <div className={`w-screen h-full" ${menu ? '': 'hidden'}`}>
                <div className="fixed w-full h-full z-40 bg-[var(--text-color)] opacity-60"></div>
                <div className="fixed right-0 w-1/3 h-full z-50 bg-[var(--base-color)] p-6">
                    <button className="fixed right-6 bg-[var(--base-color)]" onClick={function() { setMenu(false); }}>
                        <Image className="p-2" src="/img/close.svg" alt="ロゴ" width={50} height={50} priority />
                    </button>
                </div>
            </div>
        </>
    )
}