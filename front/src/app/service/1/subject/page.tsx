"use client"

import { SubjectGet } from "@/api/SubjectGet";
import { TeacherSelect } from "@/api/TeacherSelect";
import { Page } from "@/components/layout/Page";
import { Select } from "@/components/layout/Select";
import { Title } from "@/components/layout/Title";
import { useState, useEffect, use } from "react";

export default function () {
    const [subjects, setSubjects] = useState<Array<{id: number, name: string, teacher_name: string | null}>>([]);
    const [key_word, setKeyWord] = useState("");
    const [teacherId, setTeacherId] = useState<{value: number, label: string} | null>(null);
    const [option, setOption] = useState<Array<{value: number, label: string}>>([]);

    useEffect(() => {
        const getApi = async() => {
            const response = await SubjectGet({ key_word });
            if (response.success) {
                setSubjects(response.subjects)
            }
        }
        getApi();
    });

    useEffect(() => {
        const SelectApi = async() => {
            const response = await TeacherSelect();
            setOption(response.teachers)
        }

        SelectApi();
    });

    return (
        <>
            <Title title="科目情報管理ページ" />
            <div>
                <label>検索ワード：</label>
                <input />
                <label>検索講師</label>
                <Select
                    options={option}
                    value={teacherId}
                    onChange={(e) => setTeacherId(e)}
                />
            </div>
            <Page title="科目一覧">
                <table className="w-full">
                    <thead>
                        <tr className="border border-[var(--text-color)] bg-[var(--text-color)] text-[var(--base-color)]">
                            <td className="border-r border-[var(--base-color)] p-1">科目名</td>
                            <td className="border-r border-[var(--base-color)] p-1">講師名</td>
                            <td className="w-[50px] lg:w-[100px]"></td>
                        </tr>
                    </thead>
                    <tbody>
                        {subjects.map((subject, index) => (
                            <tr key={index}>
                                <td className="border border-[var(--text-color)] p-2">{subject.name}</td>
                                <td className="border border-[var(--text-color)] p-2">{subject.teacher_name}</td>
                                <td className="border border-[var(--text-color)] p-1 lg:p-3"> 
                                    <a className="p-1 lg:p-3 rounded-lg bg-[var(--accent-color)] text-[var(--base-color)]" href="">編集</a>
                                </td>
                            </tr>
                        ))

                        }
                    </tbody>
                </table>
            </Page>
        </>
    )
}