"use client"

import StudentGetUsers from "@/api/StudentGetUsers";
import React from 'react';
import { useState, useEffect } from "react";

export default function () {
    const [key_word, setKeyWord] = useState(null);
    const [course_id, setCourseId] = useState(null);
    
    const [rows, setRows] = useState<{ id: number; name: string; email: string; course_id: number | null; zoom: boolean }[]>([]);


    useEffect(() => {
        const getUsers = async () => {
            const result = await StudentGetUsers(key_word, course_id);
            setRows(result);
        };
    
        getUsers();
    }, [key_word, course_id]);

    const setZoom = (id: number) => {
        setRows((rows) => rows.map(row => 
            row.id === id ? { ...row, zoom: !row.zoom } : row
        ));
    }

    return (
        <div className="flex flex-col w-screen items-center">
            <div className="w-4/5 pt-5">
                <div className="border-b border-[var(--text-color)] w-full">
                    <div className="text-3xl pl-2 pb-2">生徒情報管理</div>
                </div>

                <div className="pt-5">
                    <div className="border border-[var(--text-color)] overflow-hidden h-[600px] rounded-lg bg-white">
                        <div className="bg-[var(--text-color)] text-[var(--base-color)] p-1">生徒一覧</div>
                        <div className="flex flex-col items-center pt-5">
                            <table className="w-5/6">
                                <thead>
                                    <tr className="border border-[var(--text-color)] bg-[var(--text-color)] text-[var(--base-color)]">
                                        <td className="border-r border-[var(--base-color)] p-1 w-4/12">名前</td>
                                        <td className="border-r border-[var(--base-color)] p-1 w-7/12">メールアドレス</td>
                                        <td className="w-1/12"></td>
                                    </tr>
                                </thead>
                                <tbody>
                                    {rows.map((row) => (
                                        <React.Fragment key={row.id}>
                                            <tr>
                                                <td className="border border-[var(--text-color)] p-2">{row.name}</td>
                                                <td className="border border-[var(--text-color)] p-2">{row.email}</td>
                                                <td className="border border-[var(--text-color)]">
                                                    <a onClick={ () => { setZoom(row.id) }}>
                                                        <img src={ row.zoom ? "/img/zoom_out.svg" : "/img/zoom_in.svg" } alt="zoom" />
                                                    </a>
                                                </td>
                                            </tr>    
                                            <tr className={ row.zoom ? "" : "hidden" }>
                                                <td className="border border-[var(--text-color)]" colSpan={2}>
                                                    <div className="flex">
                                                        <div className="bg-[var(--text-color)] text-[var(--base-color)] py-1 px-6">コース</div>
                                                        <div className="py-1 px-6">{row.course_id}</div>
                                                    </div>
                                                </td>
                                                <td className="border border-[var(--text-color)] px-2"> 
                                                    <a>編集</a>
                                                </td>
                                            </tr>
                                        </React.Fragment>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}