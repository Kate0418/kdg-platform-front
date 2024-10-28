"use client"

import { Subject } from "@/api/Subject";
import { A } from "@/components/layout/A";
import { Button } from "@/components/layout/Button";
import { List } from "@/components/layout/List";
import { Page } from "@/components/layout/Page";
import { Title } from "@/components/layout/Title";
import { useState, useEffect } from "react";

export default function () {
    const [subjects, setSubjects] = useState<Array<{id: number, name: string, teacher_name: string | null}>>([]);

    const [keyWord, setKeyWord] = useState("");
    const [pageCount, setPageCount] = useState(1);
    const [total, setTotal] = useState(0);

    const [loaderFlg, setLoaderFlg] = useState(false);

    const indexApi = async() => {
        setLoaderFlg(true);
        const response = await Subject({keyWord: keyWord, pageCount: pageCount});
        if (response.success) {
            setSubjects(response.subjects);
            setTotal(response.total);
        }
        setLoaderFlg(false);
    }

    useEffect(() => {
        indexApi();
    }, [pageCount]);

    return (
        <>
            <Title title="科目情報管理ページ" />
            <List title="科目一覧" loaderFlg={loaderFlg} h={550}>
                <div className="flex justify-end items-center">
                    <label>検索ワード：</label>
                    <input className="p-1 border border-[var(--text-color)]" value={keyWord} onChange={(e) => (setKeyWord(e.target.value))}/>
                    <Button className="!p-1 lg:!p-2" type="button" onClick={ indexApi }>検索</Button>
                    <A className="!p-1 lg:!p-2" href="/service/1/subject/add">新規作成</A>
                </div>
                <table className="w-full">
                    <thead>
                        <tr className="border border-[var(--text-color)] bg-[var(--text-color)] text-[var(--base-color)]">
                            <td className="border-r border-[var(--base-color)] p-1">科目名</td>
                            <td className="border-r border-[var(--base-color)] p-1">講師名</td>
                            <td className="w-[50px] lg:w-[100px]"></td>
                        </tr>
                    </thead>
                    <tbody>
                        {Array.isArray(subjects) && subjects.map((subject, index) => (
                            <tr key={index}>
                                <td className="border border-[var(--text-color)] p-2">{subject.name}</td>
                                <td className="border border-[var(--text-color)] p-2">{subject.teacher_name ?? ""}</td>
                                <td className="border border-[var(--text-color)] p-1 lg:p-3"> 
                                    <a className="p-1 lg:p-3 rounded-lg bg-[var(--accent-color)] text-[var(--base-color)]" href="">編集</a>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </List>
            <Page total={total} pageCount={pageCount} setPageCount={setPageCount} />
        </>
    )
}