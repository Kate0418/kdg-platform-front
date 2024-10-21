"use client"

import StudentGetUsers from "@/api/StudentGetUsers";
import React from 'react';
import { useState, useEffect } from "react";
import Page from "@/components/layout/Page";
import Title from "@/components/layout/Title";

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
        <>
            <Title title="生徒情報管理ページ" />
            <div className="flex">
            </div>
            <Page title="生徒一覧">
                <table className="w-full">
                    <thead>
                        <tr className="border border-[var(--text-color)] bg-[var(--text-color)] text-[var(--base-color)]">
                            <td className="border-r border-[var(--base-color)] p-1">名前</td>
                            <td className="border-r border-[var(--base-color)] p-1">メールアドレス</td>
                            <td className="w-[50px] lg:w-[100px]"></td>
                        </tr>
                    </thead>
                    <tbody>
                        {rows.map((row) => (
                            <React.Fragment key={row.id}>
                                <tr>
                                    <td className="border border-[var(--text-color)] lg:p-2">{row.name}</td>
                                    <td className="border border-[var(--text-color)] lg:p-2">{row.email}</td>
                                    <td className="border border-[var(--text-color)] lg:p-2">
                                        <button type="button" onClick={ () => { setZoom(row.id) }}>
                                            <img className="lg:w-8" src={ row.zoom ? "/img/zoom_out.svg" : "/img/zoom_in.svg" } alt="zoom" />
                                        </button>
                                    </td>
                                </tr>    
                                <tr className={ row.zoom ? "" : "hidden" }>
                                    <td className="border border-[var(--text-color)]" colSpan={2}>
                                        <div className="flex">
                                            <div className="bg-[var(--text-color)] text-[var(--base-color)] py-3 w-1/6 text-center">コース</div>
                                            <div className="py-1 px-6">{row.course_id}</div>
                                        </div>
                                    </td>
                                    <td className="border border-[var(--text-color)] p-1 lg:p-3"> 
                                        <a className="p-1 lg:p-3 rounded-lg bg-[var(--accent-color)] text-[var(--base-color)]" href="">編集</a>
                                    </td>
                                </tr>
                            </React.Fragment>
                        ))}
                    </tbody>
                </table>
            </Page>
        </>   
    )
}