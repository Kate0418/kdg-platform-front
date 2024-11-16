"use client";

import { Loader } from "@/components/layout/Loader";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Token } from "@/api/Token";
import { List } from "@/components/layout/List";
import { SubjectStore, Props } from "@/api/SubjectStore";
import { Title } from "@/components/layout/Title";
import { Button } from "@/components/layout/Button";
import { A } from "@/components/layout/A";
import { Select } from "@/components/layout/Select";
import { TeacherSelect, Response } from "@/api/TeacherSelect";
import { Modal } from "@/components/layout/Modal";

export default function Page() {
  const [teachers, setTeachers] = useState<Response["teachers"]>([]);
  const [subjects, setSubjects] = useState<Props["subjects"]>([
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

  const handleInputChange = (index: number, field: string, value: any) => {
    const updatedTables = [...subjects];
    updatedTables[index] = { ...updatedTables[index], [field]: value };
    setSubjects(updatedTables);
  };

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

  if (loaderFlg) {
    return <Loader />;
  }

  return (
    <>
      <Title title="科目登録ページ" />
      <List title="登録科目一覧" h={520}>
        <table className="w-full mb-5 mt-2">
          <thead>
            <tr className="border border-[var(--text-color)] bg-[var(--text-color)] text-[var(--base-color)]">
              <td className="border-r border-[var(--base-color)] p-1 w-1/2">
                科目名
              </td>
              <td className="p-1 w-1/2">講師</td>
            </tr>
          </thead>
          <tbody className="overflow-auto">
            {subjects.map((subject, index) => (
              <tr key={index}>
                <td className="border border-[var(--text-color)]">
                  <input
                    type="text"
                    className="w-full p-1 font-bold"
                    value={subject.name}
                    onChange={(e) =>
                      handleInputChange(index, "name", e.target.value)
                    }
                  />
                </td>
                <td className="border border-[var(--text-color)]">
                  <Select
                    options={teachers}
                    value={subject.teacherId}
                    onChange={(e) => handleInputChange(index, "teacherId", e)}
                  />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </List>

      <div className="flex justify-between w-full">
        <A href="/service/1/subject">戻る</A>

        <div className="flex">
          <Button
            type="button"
            onClick={() =>
              setSubjects([...subjects, { name: "", teacherId: null }])
            }
          >
            追加
          </Button>
          <Button
            type="button"
            onClick={() =>
              subjects.length > 1 && setSubjects(subjects.slice(0, -1))
            }
          >
            削除
          </Button>
          <Button
            type="button"
            onClick={() =>
              addFlg
                ? setModalFlg(true)
                : alert("科目情報を正しく入力してください")
            }
          >
            確認
          </Button>
        </div>
      </div>

      <Modal modalFlg={modalFlg}>
        <table className="w-full mb-5">
          <thead>
            <tr className="border border-[var(--text-color)] bg-[var(--text-color)] text-[var(--base-color)]">
              <td className="border-r border-[var(--base-color)] p-1 w-1/2">
                科目名
              </td>
              <td className="p-1 w-1/2">講師名</td>
            </tr>
          </thead>
          <tbody>
            {subjects.map((subject, index) => (
              <tr key={index}>
                <td className="border border-[var(--text-color)] p-1">
                  {subject.name}
                </td>
                <td className="border border-[var(--text-color)] p-1">
                  {subject.teacherId ? subject.teacherId.label : ""}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <div className="flex justify-end w-full">
          <Button
            type="submit"
            onClick={() => {
              setModalFlg(false);
            }}
          >
            戻る
          </Button>
          <Button
            type="submit"
            onClick={() => {
              storeApi();
            }}
          >
            登録
          </Button>
        </div>
      </Modal>
    </>
  );
}
