"use client"

import CourseSelect from "@/api/CourseSelect"
import Loader from "@/components/layout/Loader";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Token from "@/api/Token";
import StudentAdd from "@/api/StudentAdd";

export default function () {
    const [courses, setCourses] = useState<Array<{id: number, name: string}>>([]);
    const [students, setStudents] = useState<Array<{name: string, email: string, courseId: number | null}>>([
        { name: "", email: "", courseId: null }
      ]);
    const [confirm ,setConfirm] = useState(false);
    const [adds, setAdds] = useState(0);
    const [loading, setLoading] = useState(false);
    const router = useRouter();

    useEffect(() => {
        const fetchCourses = async () => {
            const data: Array<{id: number, name: string}> = await CourseSelect(); 
            setCourses(data);
        };

        fetchCourses();
    }, []);

    useEffect(() => {
        const count = students.filter(student => student.name || student.email || student.courseId).length;
        setAdds(count);
      }, [students]);

    const handleInputChange = (index: number, field: string, value: string | number) => {
        const updatedTables = [...students];
        updatedTables[index] = { ...updatedTables[index], [field]: value };
        setStudents(updatedTables);
    };

    const Api = async() => {
        setLoading(true);
        if (!await Token) {
            router.push("/site/login");
            setLoading(false);
        }

        const studentAdd = await StudentAdd(students);
        alert(studentAdd.message);
        if (studentAdd.success) {
            router.push("/service/0/student")
        } else {
            setLoading(false);
        }
    }

    if (loading) {
        return <Loader />
    }

    return (
        <>
            <div className="flex flex-col w-screen items-center">
                <div className="w-4/5 pt-5">
                    <div className="border-b border-[var(--text-color)] w-full">
                        <div className="text-3xl pl-2 pb-2">生徒登録ページ</div>
                    </div>

                    <div className="pt-5 pb-8">
                        <div className="border border-[var(--text-color)] rounded-lg bg-white">
                            <div className="bg-[var(--text-color)] text-[var(--base-color)] p-1">生徒登録</div>
                            <div className="flex flex-col items-center p-8">
                            <table className="w-11/12 mb-5">
                                <thead>
                                    <tr className="border border-[var(--text-color)] bg-[var(--text-color)]">
                                        <td className="border-r border-[var(--base-color)] text-[var(--base-color)] p-1">名前</td>
                                        <td className="border-r border-[var(--base-color)] text-[var(--base-color)] p-1">メールアドレス</td>
                                        <td className=" text-[var(--base-color)] p-1">コース</td>
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
                                <div className="flex justify-end w-full">
                                    <button className="mr-5 p-3 rounded-lg" type="submit" onClick={() => {setStudents([...students,{ name: "", email: "", courseId: null }])}}>追加</button>
                                    <button className="mr-5 p-3 rounded-lg" type="submit" onClick={() => students.length > 1 && setStudents(students.slice(0, -1))}>削除</button>
                                    <button className="mr-5 p-3 rounded-lg" type="submit" onClick={() => { adds ? setConfirm(true) : alert("登録する生徒情報を入力してください") }}>確認</button>
                                </div>
                            </div>
                        </div>
                    </div>
                    {confirm && (
                        <div className="fixed top-0 left-0 p-40">
                            <div className="fixed top-0 left-0 w-screen h-screen z-40 bg-[var(--text-color)] opacity-60"></div>
                            <div className="fixed bg-white z-50 inset-x-60 flex flex-col items-center p-8 rounded-lg h-[500px] overflow-auto">
                                <table className="w-11/12 mb-5">
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
                                    <button className="mr-5 p-3 rounded-lg" type="submit" onClick={() => { setConfirm(false) }}>戻る</button>
                                    <button className="mr-5 p-3 rounded-lg" type="submit" onClick={() => { Api() }}>登録</button>
                                </div>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </>
    )
}