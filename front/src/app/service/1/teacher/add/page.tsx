"use client"

import SubjectSelect from "@/api/SubjectSelect"
import { Loader } from "@/components/layout/Loader";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Token } from "@/api/Token";
import { Page } from "@/components/layout/Page";
import React from 'react';
import TeacherAdd from "@/api/TeacherAdd";
import { Title } from "@/components/layout/Title";
import { Select } from "@/components/layout/Select";

export default function () {
    const [subjects, setSubjects] = useState<Array<{value: number, label: string}>>([]);
    const [teachers, setTeachers] = useState<Array<{name: string, email: string, subjectIds: Array<{value: number, label: string}>}>>([
        { name: "", email: "", subjectIds: [] }
      ]);
    const [confirm ,setConfirm] = useState(false);
    const [adds, setAdds] = useState(0);
    const [loading, setLoading] = useState(false);
    const router = useRouter();

    useEffect(() => { //セレクトボックスの取得
        const fetchSelect = async () => {
            const data = await SubjectSelect(); 
            setSubjects(data.subjects);
        };

        fetchSelect();
    }, []);

    useEffect(() => { // 正しいデータかの検証
        const count = teachers.filter(teachers => teachers.name && teachers.email).length;
        setAdds(count);
    }, [teachers]);

    const handleInputChange = (
        index: number, 
        field: string, 
        value: string | number | Array<{ value: number, label: string }>
      ) => {
        const updatedTeachers = [...teachers];
        updatedTeachers[index] = { ...updatedTeachers[index], [field]: value };
        setTeachers(updatedTeachers);
      };

    const addApi = async() => {
        setLoading(true);
        if (!await Token) {
            router.push("/site/login");
            setLoading(false);
        }

        const response = await TeacherAdd(teachers);
        alert(response.message);
        if (response.success) {
            router.push("/service/1/teacher")
        } else {
            setLoading(false);
        }
    }

    if (loading) {
        return <Loader />
    }

    return (
        <>
            <Title title="講師登録ページ" />
            <Page title="登録講師一覧">
                <div className="flex flex-col items-center overflow-auto max-h-[450px]">
                {teachers.map((teacher, index) => (
                    <table key={index} className="w-full mb-28">
                        <thead>
                            <tr className="border border-[var(--text-color)] bg-[var(--text-color)] text-[var(--base-color)]">
                                <td className="border-r border-[var(--base-color)] p-1 w-5/12">名前</td>
                                <td className="p-1 w-7/12">メールアドレス</td>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td className="border border-[var(--text-color)]">
                                    <input type="text" className="w-full p-1"
                                    value={teacher.name}
                                    onChange={(e) => handleInputChange(index, 'name', e.target.value)}
                                    />
                                </td>
                                <td className="border border-[var(--text-color)]">
                                    <input type="text" className="w-full p-1"
                                    value={teacher.email}
                                    onChange={(e) => handleInputChange(index, 'email', e.target.value)}
                                    />
                                </td>
                            </tr>
                            <tr>
                                <td className="border border-[var(--text-color)]" colSpan={2}>
                                    <div className="flex">
                                        <div className="bg-[var(--text-color)] text-[var(--base-color)] p-1 w-1/6 text-center">科目</div>
                                        <div className="w-5/6">
                                            <Select
                                                multi={true}
                                                options={subjects}
                                                value={teacher.subjectIds}
                                                onChange={(e) => handleInputChange(index, 'subjectIds', e)}
                                            />
                                        </div>
                                    </div>
                                </td>
                            </tr>
                            </tbody>
                    </table>
                ))}
                </div>


                <div className="flex justify-between w-full pt-5">
                    <a className="ml-5 p-3 rounded-lg" href="/service/1/teacher">戻る</a>

                    <div className="flex">
                        <button className="mr-5 p-3 rounded-lg" type="submit" onClick={() => setTeachers([...teachers,{ name: "", email: "", subjectIds: [] }])}>追加</button>
                        <button className="mr-5 p-3 rounded-lg" type="submit" onClick={() => teachers.length > 1 && setTeachers(teachers.slice(0, -1))}>削除</button>
                        <button className="mr-5 p-3 rounded-lg" type="submit" onClick={() => teachers.length === adds ? setConfirm(true) : alert("生徒情報を正しく入力してください")}>確認</button>
                    </div>
                </div>
            </Page>
            {confirm && (
                <div className="fixed top-0 left-0 p-40">
                    <div className="fixed top-0 left-0 w-screen h-screen z-40 bg-[var(--text-color)] opacity-60"></div>
                    <div className="fixed bg-white z-50 inset-x-60 flex flex-col items-center p-8 rounded-lg h-[500px] overflow-auto">
                    {teachers.map((teacher, index) => (
                    <table key={index} className="w-full mb-28">
                        <thead>
                            <tr className="border border-[var(--text-color)] bg-[var(--text-color)] text-[var(--base-color)]">
                                <td className="border-r border-[var(--base-color)] p-1 w-5/12">名前</td>
                                <td className="p-1 w-7/12">メールアドレス</td>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td className="border border-[var(--text-color)] p-1">{teacher.name}</td>
                                <td className="border border-[var(--text-color)] p-1">{teacher.email}</td>
                            </tr>
                            <tr>
                                <td className="border border-[var(--text-color)]" colSpan={2}>
                                    <div className="flex">
                                        <div className="bg-[var(--text-color)] text-[var(--base-color)] p-1 w-1/6 text-center">科目</div>
                                        <div className="w-5/6 p-1">
                                            {teacher.subjectIds.map(subject => subject.label).join(', ')}
                                        </div>
                                    </div>
                                </td>
                            </tr>
                            </tbody>
                        </table>
                    ))}
                        <div className="flex justify-end w-full">
                            <button className="mr-5 p-3 rounded-lg" type="submit" onClick={() => { setConfirm(false) }}>戻る</button>
                            <button className="mr-5 p-3 rounded-lg" type="submit" onClick={() => { addApi() }}>登録</button>
                        </div>
                    </div>
                </div>
            )}
        </>
    )
}