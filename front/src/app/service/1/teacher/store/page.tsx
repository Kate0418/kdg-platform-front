"use client";

import { SubjectSelect, SubjectSelectResponse } from "@/api/SubjectSelect";
import { Loader } from "@/components/layout/Loader";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Token } from "@/api/Token";
import React from "react";
import { TeacherStore, TeacherStoreProps } from "@/api/TeacherStore";
import { Title } from "@/components/layout/Title";
import { Select } from "@/components/layout/Select";
import { List } from "@/components/layout/List";
import { Modal } from "@/components/layout/Modal";
import { SelectItem } from "@/config";

export default function Page() {
  const [subjects, setSubjects] = useState<SubjectSelectResponse["subjects"]>(
    [],
  );
  const [teachers, setTeachers] = useState<TeacherStoreProps["teachers"]>([
    { name: "", email: "", subjectIds: [] },
  ]);
  const [modalFlg, setModalFlg] = useState(false);
  const [adds, setAdds] = useState(0);
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  useEffect(() => {
    //セレクトボックスの取得
    const selectApi = async () => {
      const data = await SubjectSelect();
      setSubjects(data.subjects);
    };

    selectApi();
  }, []);

  useEffect(() => {
    // 正しいデータかの検証
    const count = teachers.filter(
      (teachers) => teachers.name && teachers.email,
    ).length;
    setAdds(count);
  }, [teachers]);

  const handleInputChange = (
    index: number,
    field: string,
    value: string | SelectItem[],
  ) => {
    const updatedTeachers = [...teachers];
    updatedTeachers[index] = { ...updatedTeachers[index], [field]: value };
    setTeachers(updatedTeachers);
  };

  const storeApi = async () => {
    setLoading(true);
    if (!(await Token)) {
      router.push("/site/login");
      setLoading(false);
    }

    const response = await TeacherStore({ teachers });
    alert(response.message);
    if (response.success) {
      router.push("/service/1/teacher");
    } else {
      setLoading(false);
    }
  };

  if (loading) {
    return <Loader />;
  }

  return (
    <>
      <Title title="講師登録" icon="teacher" />
      <List title="登録講師一覧" h={520}>
        {teachers.map((teacher, index) => (
          <table key={index} className="w-full mb-16">
            <thead>
              <tr className="border border-text bg-text text-base">
                <td className="border-r border-base p-1 w-5/12">名前</td>
                <td className="p-1 w-7/12">メールアドレス</td>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="border border-text">
                  <input
                    type="text"
                    className="w-full p-1"
                    value={teacher.name}
                    onChange={(e) =>
                      handleInputChange(index, "name", e.target.value)
                    }
                  />
                </td>
                <td className="border border-text">
                  <input
                    type="text"
                    className="w-full p-1"
                    value={teacher.email}
                    onChange={(e) =>
                      handleInputChange(index, "email", e.target.value)
                    }
                  />
                </td>
              </tr>
              <tr>
                <td className="border border-text" colSpan={2}>
                  <div className="flex">
                    <div className="bg-text text-base p-1 w-1/6 text-center">
                      科目
                    </div>
                    <div className="w-5/6">
                      <Select
                        multi={true}
                        options={subjects}
                        value={subjects.filter((subject) =>
                          teacher.subjectIds.includes(subject.value),
                        )}
                        onChange={(e: SelectItem[]) => {
                          const newTeachers = [...teachers];
                          newTeachers[index] = {
                            ...newTeachers[index],
                            subjectIds: e.map((item) => item.value),
                          };
                          setTeachers(newTeachers);
                        }}
                      />
                    </div>
                  </div>
                </td>
              </tr>
            </tbody>
          </table>
        ))}
      </List>

      <div className="flex justify-between w-full">
        <a className="a" href="/service/1/teacher">
          キャンセル
        </a>

        <div className="flex">
          <button
            className="button"
            type="button"
            onClick={() =>
              setTeachers([
                ...teachers,
                { name: "", email: "", subjectIds: [] },
              ])
            }
          >
            追加
          </button>
          <button
            className="button"
            type="button"
            onClick={() =>
              teachers.length > 1 && setTeachers(teachers.slice(0, -1))
            }
          >
            削除
          </button>
          <button
            className="button"
            type="button"
            onClick={() =>
              teachers.length === adds
                ? setModalFlg(true)
                : alert("講師情報を正しく入力してください")
            }
          >
            確認
          </button>
        </div>
      </div>

      <Modal modalFlg={modalFlg} setModalFlg={setModalFlg}>
        {teachers.map((teacher, index) => (
          <table key={index} className="w-full mb-16">
            <thead>
              <tr className="border border-text bg-text text-base">
                <td className="border-r border-base p-1 w-5/12">名前</td>
                <td className="p-1 w-7/12">メールアドレス</td>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="border border-text p-1">{teacher.name}</td>
                <td className="border border-text p-1">{teacher.email}</td>
              </tr>
              <tr>
                <td className="border border-text" colSpan={2}>
                  <div className="flex">
                    <div className="bg-text text-base p-1 w-1/6 text-center">
                      科目
                    </div>
                    <div className="w-5/6 p-1">
                      {subjects
                        .filter((subject) =>
                          teacher.subjectIds.includes(subject.value),
                        )
                        .map((item) => item.label)
                        .join(", ")}
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
