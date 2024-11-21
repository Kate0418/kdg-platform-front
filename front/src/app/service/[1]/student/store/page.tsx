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
import { GradeSelect, GradeSelectResponse } from "@/api/GradeSelect";
import { YearSelect, YearSelectResponse } from "@/api/YearSelect";

export default function () {
  const [courses, setCourses] = useState<CourseSelectResponse["courses"]>([]);
  const [grades, setGrades] = useState<GradeSelectResponse["grades"]>([]);
  const [years, setYears] = useState<YearSelectResponse["years"]>([]);
  const [students, setStudents] = useState<StudentStoreProps["students"]>([
    { name: "", email: "", courseId: null, gradeId: null, yearId: null },
  ]);
  const [modalFlg, setModalFlg] = useState(false);
  const [loaderFlg, setLoaderFlg] = useState(false);
  const router = useRouter();

  useEffect(() => {
    //セレクトボックスの取得
    const selectApi = async () => {
      const courseData = await CourseSelect();
      setCourses(courseData.courses);

      const gradeData = await GradeSelect();
      setGrades(gradeData.grades);

      const yearData = await YearSelect();
      setYears(yearData.years);
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
        {students.map((student, index) => (
          <table key={index} className="w-full mb-16">
            <thead>
              <tr className="border border-[var(--text-color)] bg-[var(--text-color)] text-[var(--base-color)]">
                <td className="border-r border-[var(--base-color)] p-1 w-5/12">
                  名前
                </td>
                <td className="p-1 w-7/12">メールアドレス</td>
              </tr>
            </thead>
            <tbody>
              <tr>
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
                      setStudents(newStudents);
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
                      setStudents(newStudents);
                    }}
                  />
                </td>
              </tr>
              <tr>
                <td className="border border-[var(--text-color)]" colSpan={2}>
                  <div className="grid lg:grid-cols-[5fr_3fr_3fr]">
                    <div className="flex">
                      <div className="w-16 bg-[var(--text-color)] text-[var(--base-color)] p-1 flex items-center justify-center">
                        コース
                      </div>
                      <div className="w-full">
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
                            setStudents(newStudents);
                          }}
                        />
                      </div>
                    </div>
                    <div className="flex">
                      <div className="w-14 bg-[var(--text-color)] text-[var(--base-color)] p-2 flex items-center justify-center">
                        年次
                      </div>
                      <div className="w-full">
                        <Select
                          options={grades}
                          value={grades.find(
                            (grades) => grades.value === student.gradeId,
                          )}
                          onChange={(e) => {
                            const newStudents = [...students];
                            newStudents[index] = {
                              ...newStudents[index],
                              gradeId: e.value,
                            };
                            setStudents(newStudents);
                          }}
                        />
                      </div>
                    </div>
                    <div className="flex">
                      <div className="w-14 bg-[var(--text-color)] text-[var(--base-color)] p-2 flex items-center justify-center">
                        年制
                      </div>
                      <div className="w-full">
                        <Select
                          options={years}
                          value={years.find(
                            (year) => year.value === student.yearId,
                          )}
                          onChange={(e) => {
                            const newStudents = [...students];
                            newStudents[index] = {
                              ...newStudents[index],
                              yearId: e.value,
                            };
                            setStudents(newStudents);
                          }}
                        />
                      </div>
                    </div>
                  </div>
                </td>
              </tr>
            </tbody>
          </table>
        ))}
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
                {
                  name: "",
                  email: "",
                  courseId: null,
                  gradeId: null,
                  yearId: null,
                },
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
          <button
            className="button"
            type="button"
            onClick={() => {
              students.every(
                (student) =>
                  student.name != "" &&
                  student.email != "" &&
                  student.gradeId != null &&
                  student.yearId != null,
              )
                ? setModalFlg(true)
                : alert("名前,メールアドレス,年次,年制は必須です");
            }}
          >
            確認
          </button>
        </div>
      </div>

      <Modal modalFlg={modalFlg} setModalFlg={setModalFlg}>
        {students.map((student, index) => (
          <table key={index} className="w-full mb-16">
            <thead>
              <tr className="border border-[var(--text-color)] bg-[var(--text-color)] text-[var(--base-color)]">
                <td className="border-r border-[var(--base-color)] p-1">
                  名前
                </td>
                <td className="p-1 min-w-36">メールアドレス</td>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="w-full p-1 border border-[var(--text-color)]">
                  {student.name}
                </td>
                <td className="w-full p-1 border border-[var(--text-color)]">
                  {student.email}
                </td>
              </tr>
              <tr>
                <td className="border border-[var(--text-color)]" colSpan={2}>
                  <div className="grid lg:grid-cols-[5fr_3fr_3fr]">
                    <div className="flex">
                      <div className="w-16 bg-[var(--text-color)] text-[var(--base-color)] p-1 flex items-center justify-center">
                        コース
                      </div>
                      <div className="w-full flex items-center">
                        {courses.find(
                          (course) => course.value === student.courseId,
                        )?.label ?? ""}
                      </div>
                    </div>
                    <div className="flex">
                      <div className="w-14 bg-[var(--text-color)] text-[var(--base-color)] p-2 flex items-center justify-center">
                        年次
                      </div>
                      <div className="w-full flex items-center">
                        {grades.find(
                          (grades) => grades.value === student.gradeId,
                        )?.label ?? ""}
                      </div>
                    </div>
                    <div className="flex">
                      <div className="w-14 bg-[var(--text-color)] text-[var(--base-color)] p-2 flex items-center justify-center">
                        年制
                      </div>
                      <div className="w-full flex items-center">
                        {years.find((year) => year.value === student.yearId)
                          ?.label ?? ""}
                      </div>
                    </div>
                  </div>
                </td>
              </tr>
            </tbody>
          </table>
        ))}

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
