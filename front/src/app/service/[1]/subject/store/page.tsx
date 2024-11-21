"use client";

import { Loader } from "@/components/layout/Loader";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Token } from "@/api/Token";
import { List } from "@/components/layout/List";
import { SubjectStore, SubjectProps } from "@/api/SubjectStore";
import { Title } from "@/components/layout/Title";
import { Select } from "@/components/layout/Select";
import { TeacherSelect, Response } from "@/api/TeacherSelect";
import { Modal } from "@/components/layout/Modal";
import { SelectItem } from "@/config";

export default function Page() {
  const [teachers, setTeachers] = useState<Response["teachers"]>([]);
  const [subjects, setSubjects] = useState<SubjectProps["subjects"]>([
    { name: "", teacherId: null },
  ]);

  const [modalFlg, setModalFlg] = useState(false);
  const [addFlg, setAddFlg] = useState(false);
  const [loaderFlg, setLoaderFlg] = useState(false);
  const router = useRouter();

  useEffect(() => {
    // 正しいデータかの検証
    const okData = subjects.filter((subject) => subject.name).length;
    const allData = subjects.length;

    setAddFlg(okData === allData);
  }, [subjects]);

  useEffect(() => {
    const selectApi = async () => {
      const response = await TeacherSelect();
      setTeachers(response.teachers);
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

    const subjectAdd = await SubjectStore({ subjects });
    alert(subjectAdd.message);
    if (subjectAdd.success) {
      router.push("/service/1/subject");
    } else {
      setLoaderFlg(false);
    }
  };

  if (loaderFlg) return <Loader />;

  return (
    <>
      <Title title="科目登録" icon="subject" />
      <List title="登録科目一覧" h={520}>
        <table className="w-full mb-5 mt-2">
          <thead>
            <tr className="border border-text bg-text text-base">
              <td className="border-r border-base p-1 w-1/2">科目名</td>
              <td className="p-1 w-1/2">講師</td>
            </tr>
          </thead>
          <tbody className="overflow-auto">
            {subjects.map((subject, index) => (
              <tr key={index}>
                <td className="border border-text">
                  <input
                    type="text"
                    className="w-full p-1 font-bold"
                    value={subject.name}
                    onChange={(e) => {
                      const newSubjects = [...subjects];
                      newSubjects[index] = {
                        ...newSubjects[index],
                        name: e.target.value,
                      };
                      setSubjects(newSubjects);
                    }}
                  />
                </td>
                <td className="border border-text">
                  <Select
                    options={teachers}
                    value={teachers.find(
                      (teacher) => teacher.value === subject.teacherId,
                    )}
                    onChange={(e: SelectItem) => {
                      const newSubjects = [...subjects];
                      newSubjects[index] = {
                        ...newSubjects[index],
                        teacherId: e.value,
                      };
                      setSubjects(newSubjects);
                    }}
                  />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </List>

      <div className="flex justify-between w-full">
        <a className="a" href="/service/1/subject">
          キャンセル
        </a>

        <div className="flex">
          <button
            className="button"
            type="button"
            onClick={() =>
              setSubjects([...subjects, { name: "", teacherId: null }])
            }
          >
            追加
          </button>
          <button
            className="button"
            type="button"
            onClick={() =>
              subjects.length > 1 && setSubjects(subjects.slice(0, -1))
            }
          >
            削除
          </button>
          <button
            className="button"
            type="button"
            onClick={() =>
              addFlg
                ? setModalFlg(true)
                : alert("科目情報を正しく入力してください")
            }
          >
            確認
          </button>
        </div>
      </div>

      <Modal modalFlg={modalFlg} setModalFlg={setModalFlg}>
        <table className="w-full mb-5">
          <thead>
            <tr className="border border-text bg-text text-base">
              <td className="border-r border-base p-1 w-1/2">科目名</td>
              <td className="p-1 w-1/2">講師名</td>
            </tr>
          </thead>
          <tbody>
            {subjects.map((subject, index) => (
              <tr key={index}>
                <td className="border border-text p-1">{subject.name}</td>
                <td className="border border-text p-1">
                  {teachers.find(
                    (teacher) => teacher.value === subject.teacherId,
                  )?.label ?? ""}
                </td>
              </tr>
            ))}
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
