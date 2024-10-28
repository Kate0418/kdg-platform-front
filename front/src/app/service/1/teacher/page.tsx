"use client"

import React from 'react';
import { useState, useEffect } from "react";
import { Title } from "@/components/layout/Title";
import { List } from "@/components/layout/List";
import { Teacher, Response } from "@/api/Teacher";
import { Button } from '@/components/layout/Button';
import { A } from '@/components/layout/A';
import { Loader } from '@/components/layout/Loader';
import { Page } from '@/components/layout/Page';

type TeachersWithZoom = Response['teachers'][number] & { zoom: boolean };

export default function () {
    const [keyWord, setKeyWord] = useState("");
    const [pageCount, setPageCount] = useState(1);
    const [teachers, setTeachers] = useState<TeachersWithZoom[]>([]);
    const [loaderFlg, setLoaderFlg] = useState(false);
    const [total, setTotal] = useState(0);

    const indexApi = async () => {
        setLoaderFlg(true);
        const response = await Teacher({keyWord, pageCount});
        setTeachers(
            response.teachers.map(teacher => ({
                ...teacher,
                zoom: false
            }))
        );
        setTotal(response.total);
        setLoaderFlg(false);
    };

    useEffect(() => {
        indexApi();
    }, [pageCount]);

    const setZoom = (id: number) => {
        setTeachers((rows) => rows.map(row => 
            row.id === id ? { ...row, zoom: !row.zoom } : row
        ));
    }

    if (loaderFlg) {
        return <Loader />
    }

    return (
        <>
            <Title title="講師情報管理ページ" />
            <List title="講師一覧" h={520}>
                <div className="flex justify-end items-center">
                    <label>検索ワード：</label>
                    <input className="p-1 border border-[var(--text-color)]" value={keyWord} onChange={(e) => (setKeyWord(e.target.value))}/>
                    <Button className="!p-1 lg:!p-2" type="button" onClick={ indexApi }>検索</Button>
                    <A className="!p-1 lg:!p-2" href="/service/1/subject/add">新規作成</A>
                </div>
                <table className="w-full">
                    <thead>
                        <tr className="border border-[var(--text-color)] bg-[var(--text-color)] text-[var(--base-color)]">
                            <td className="border-r border-[var(--base-color)] p-1">名前</td>
                            <td className="border-r border-[var(--base-color)] p-1">メールアドレス</td>
                            <td className="w-[50px] lg:w-[100px]"></td>
                        </tr>
                    </thead>
                    <tbody>
                        {teachers.map((teacher) => (
                            <React.Fragment key={teacher.id}>
                                <tr>
                                    <td className="border border-[var(--text-color)] lg:p-2">{teacher.name}</td>
                                    <td className="border border-[var(--text-color)] lg:p-2">{teacher.email}</td>
                                    <td className="border border-[var(--text-color)] lg:p-2">
                                        <button type="button" onClick={ () => { setZoom(teacher.id) }}>
                                            <img className="lg:w-8" src={ teacher.zoom ? "/img/zoom_out.svg" : "/img/zoom_in.svg" } alt="zoom" />
                                        </button>
                                    </td>
                                </tr>    
                                <tr className={ teacher.zoom ? "" : "hidden" }>
                                    <td className="border border-[var(--text-color)]" colSpan={2}>
                                        <div className="flex">
                                            <div className="bg-[var(--text-color)] text-[var(--base-color)] w-1/6 text-center p-1 lg:py-3 ">科目</div>
                                            <div className="flex items-center py-1 px-6">{teacher.subjectNames.join(", ")}</div>
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
            </List>
            <Page total={total} pageCount={pageCount} setPageCount={setPageCount} />
        </>   
    )
}