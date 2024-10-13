"use client"

import SubjectGet from "@/api/SubjectGet";
import Page from "@/components/layout/Page";
import { useState, useEffect, use } from "react";

export default function () {
    const [subjects, setSubjects] = useState<Array<{id: number, name: string, teacher_name: string | null}>>([]);
    const [key_word, setKeyWord] = useState("");

    useEffect(() => {
        const getApi = async() => {
            const response = await SubjectGet(key_word);
            if (response.success) {
                setSubjects(response.subjects)
            }
        }
        getApi();
    })

    return (
        <Page title="科目情報管理ページ" contents_name="科目一覧">
            <table className="w-full">
                <thead>
                    <tr className="border border-[var(--text-color)] bg-[var(--text-color)] text-[var(--base-color)]">
                        <td className="border-r border-[var(--base-color)] p-1 w-7/12">科目名</td>
                        <td className="border-r border-[var(--base-color)] p-1 w-4/12">講師名</td>
                        <td className="w-1/12"></td>
                    </tr>
                </thead>
                <tbody>
                    {subjects.map((subject) => (
                        <tr>
                            <td className="border border-[var(--text-color)] p-2">{subject.name}</td>
                            <td className="border border-[var(--text-color)] p-2">{subject.teacher_name}</td>
                            <td className="border border-[var(--text-color)] p-2">
                                <a>編集</a>
                            </td>
                        </tr>
                    ))

                    }
                </tbody>
            </table>
        </Page>
    )
}