"use client"

import CourseSelect from "@/api/CourseSelect"
import { Loader } from "@/components/layout/Loader";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Token } from "@/api/Token";
import StudentAdd from "@/api/StudentAdd";
import { Page } from "@/components/layout/Page";
import { Button } from "@/components/layout/Button";
import { A } from "@/components/layout/A";
import { Modal } from "@/components/layout/Modal";
import { Title } from "@/components/layout/Title";

export default function () {
    const [courses, setCourses] = useState<Array<{id: number, name: string}>>([]);
    const [students, setStudents] = useState<Array<{name: string, email: string, courseId: number | null}>>([
        { name: "", email: "", courseId: null }
      ]);
    const [confirm ,setConfirm] = useState(false);
    const [adds, setAdds] = useState(0);
    const [loading, setLoading] = useState(false);
    const router = useRouter();

    useEffect(() => { //セレクトボックスの取得
        const fetchCourses = async () => {
            const data: Array<{id: number, name: string}> = await CourseSelect(); 
            setCourses(data);
        };

        fetchCourses();
    }, []);

    useEffect(() => { // 正しいデータかの検証
        const count = students.filter(student => student.name && student.email).length;
        setAdds(count);
    }, [students]);

    const handleInputChange = (index: number, field: string, value: string | number) => {
        const updatedTables = [...students];
        updatedTables[index] = { ...updatedTables[index], [field]: value };
        setStudents(updatedTables);
    };

    const addApi = async() => {
        setLoading(true);
        if (!await Token) {
            router.push("/site/login");
            setLoading(false);
        }

        const studentAdd = await StudentAdd(students);
        alert(studentAdd.message);
        if (studentAdd.success) {
            router.push("/service/1/student")
        } else {
            setLoading(false);
        }
    }

    if (loading) {
        return <Loader />
    }

    return (
        <>
            <Title title="生徒登録ページ" />
            <Page title="登録生徒一覧">
                    <table className="w-full">
                        <thead className="">
                            <tr className="border border-[var(--text-color)] bg-[var(--text-color)]">
                                <td className="border-r border-[var(--base-color)] text-[var(--base-color)] p-1">名前</td>
                                <td className="border-r border-[var(--base-color)] text-[var(--base-color)] p-1">メールアドレス</td>
                                <td className="text-[var(--base-color)] p-1">コース</td>
                            </tr>
                        </thead>
                        <tbody>
                        {students.map((student, index) => (
                            <tr key={index}>
                                <td className="border border-[var(--text-color)]">
                                    <input type="text" className="w-full p-1"
                                    value={student.name}
                                    onChange={(e) => handleInputChange(index, 'name', e.target.value)}
                                    />
                                </td>
                                <td className="border border-[var(--text-color)]">
                                    <input type="text" className="w-full p-1"
                                    value={student.email}
                                    onChange={(e) => handleInputChange(index, 'email', e.target.value)}
                                    />
                                </td>
                                <td className="border border-[var(--text-color)]">
                                    <select className="w-full p-1"
                                    value={student.courseId || ""}
                                    onChange={(e) => handleInputChange(index, 'courseId', Number(e.target.value))}
                                    > 
                                        <option value="">選択なし</option>
                                        {courses.map((course: {id: number, name: string}) => (
                                            <option key={course.id} value={course.id}>{course.name}</option>
                                        ))}
                                    </select>
                                </td>
                            </tr>
                        ))}
                        </tbody>
                    </table>
            </Page>
            <div className="flex justify-between w-full">
                <A href="/service/1/student">戻る</A>

                <div className="flex">
                    <Button type="button" onClick={() => setStudents([...students,{ name: "", email: "", courseId: null }])}>追加</Button>
                    <Button type="button" onClick={() => students.length > 1 && setStudents(students.slice(0, -1))}>削除</Button>
                    <Button type="button" onClick={() => students.length === adds ? setConfirm(true) : alert("生徒情報を正しく入力してください")}>確認</Button>
                </div>
            </div>

            <Modal flg={confirm}>
                <table className="w-full mb-5">
                    <thead>
                        <tr className="border border-[var(--text-color)] bg-[var(--text-color)]">
                            <td className="border-r border-[var(--base-color)] text-[var(--base-color)] p-1">名前</td>
                            <td className="border-r border-[var(--base-color)] text-[var(--base-color)] p-1">メールアドレス</td>
                            <td className=" text-[var(--base-color)] p-1">コース</td>
                        </tr>
                    </thead>
                    <tbody>
                        {students.map((student, index) => (
                            (student.name || student.email || student.courseId) &&
                            <tr key={index}>
                                <td className="border border-[var(--text-color)] w-12/4 p-1">{student.name}</td>
                                <td className="border border-[var(--text-color)] w-12/5 p-1">{student.email}</td>
                                <td className="border border-[var(--text-color)] w-12/3 p-1">{student.courseId}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
                <div className="flex justify-end w-full">
                    <Button type="button" onClick={() => { setConfirm(false) }}>戻る</Button>
                    <Button type="button" onClick={() => { addApi() }}>登録</Button>
                </div>
            </Modal>
        </>
    )
}