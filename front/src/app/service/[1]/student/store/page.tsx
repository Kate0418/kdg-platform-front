"use client";

import { CourseSelect, CourseSelectResponse } from "@/api/CourseSelect";
import { Loader } from "@/components/layout/Loader";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Token } from "@/api/Token";
import { StudentStore, StudentStoreProps } from "@/api/StudentStore";
import { List } from "@/components/layout/List";
import { Modal } from "@/components/layout/Modal";
import { Title } from "@/components/layout/Title";
import { Select } from "@/components/layout/Select";

export default function () {
  const [courses, setCourses] = useState<CourseSelectResponse["courses"]>([]);
  const [students, setStudents] = useState<StudentStoreProps["students"]>([
    { name: "", email: "", courseId: null },
  ]);
  const [modalFlg, setModalFlg] = useState(false);
  const [loaderFlg, setLoaderFlg] = useState(false);
  const router = useRouter();

  useEffect(() => {
    //セレクトボックスの取得
    const selectApi = async () => {
      const courseData = await CourseSelect();
      setCourses(courseData.courses);
    };

    selectApi();
  }, []);

  const storeApi = async () => {
    setLoaderFlg(true);
    const token = await Token();
    if (!token.success) {
      router.push("/site/login");
      setLoaderFlg(false);
    }

    const studentStore = await StudentStore({ students });
    alert(studentStore.message);
    if (studentStore.success) {
      router.push("/service/1/student");
    } else {
      setLoaderFlg(false);
    }
  };

  if (loaderFlg) return <Loader />;

  return (
    <>
      <Title title="生徒登録ページ" />
      <List title="登録生徒一覧" h={520}>
        <table className="w-full">
          <thead className="">
            <tr className="border border-[var(--text-color)] bg-[var(--text-color)]">
              <td className="border-r border-[var(--base-color)] text-[var(--base-color)] p-1">
                名前
              </td>
              <td className="border-r border-[var(--base-color)] text-[var(--base-color)] p-1">
                メールアドレス
              </td>
              <td className="text-[var(--base-color)] p-1">コース</td>
            </tr>
          </thead>
          <tbody>
            {students.map((student, index) => (
              <tr key={index}>
                <td className="border border-[var(--text-color)]">
                  <input
                    type="text"
                    className="w-full p-1"
                    value={student.name}
                    onChange={(e) => {
                      const newStudents = [...students];
                      newStudents[index] = {
                        ...newStudents[index],
                        name: e.target.value,
                      };
                    }}
                  />
                </td>
                <td className="border border-[var(--text-color)]">
                  <input
                    type="text"
                    className="w-full p-1"
                    value={student.email}
                    onChange={(e) => {
                      const newStudents = [...students];
                      newStudents[index] = {
                        ...newStudents[index],
                        email: e.target.value,
                      };
                    }}
                  />
                </td>
                <td className="border border-[var(--text-color)]">
                  <Select
                    options={courses}
                    value={courses.find(
                      (course) => course.value === student.courseId,
                    )}
                    onChange={(e) => {
                      const newStudents = [...students];
                      newStudents[index] = {
                        ...newStudents[index],
                        courseId: e.value,
                      };
                    }}
                  />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </List>
      <div className="flex justify-between w-full">
        <a className="a" href="/service/1/student">
          キャンセル
        </a>

        <div className="flex">
          <button
            className="button"
            type="button"
            onClick={() =>
              setStudents([
                ...students,
                { name: "", email: "", courseId: null },
              ])
            }
          >
            追加
          </button>
          <button
            className="button"
            type="button"
            onClick={() =>
              students.length > 1 && setStudents(students.slice(0, -1))
            }
          >
            削除
          </button>
          <button className="button" type="button" onClick={() => {}}>
            確認
          </button>
        </div>
      </div>

      <Modal modalFlg={modalFlg} setModalFlg={setModalFlg}>
        <table className="w-full mb-5">
          <thead>
            <tr className="border border-[var(--text-color)] bg-[var(--text-color)]">
              <td className="border-r border-[var(--base-color)] text-[var(--base-color)] p-1">
                名前
              </td>
              <td className="border-r border-[var(--base-color)] text-[var(--base-color)] p-1">
                メールアドレス
              </td>
              <td className=" text-[var(--base-color)] p-1">コース</td>
            </tr>
          </thead>
          <tbody>
            {students.map(
              (student, index) =>
                (student.name || student.email || student.courseId) && (
                  <tr key={index}>
                    <td className="border border-[var(--text-color)] w-12/4 p-1">
                      {student.name}
                    </td>
                    <td className="border border-[var(--text-color)] w-12/5 p-1">
                      {student.email}
                    </td>
                    <td className="border border-[var(--text-color)] w-12/3 p-1">
                      {student.courseId}
                    </td>
                  </tr>
                ),
            )}
          </tbody>
        </table>
        <div className="flex justify-end w-full">
          <button
            className="button"
            type="button"
            onClick={() => {
              setModalFlg(false);
            }}
          >
            戻る
          </button>
          <button
            className="button"
            type="button"
            onClick={() => {
              storeApi();
            }}
          >
            登録
          </button>
        </div>
      </Modal>
    </>
  );
}
