import { SubjectSelect, SubjectSelectResponse } from "@/api/SubjectSelect";
import { TeacherStoreProps } from "@/api/TeacherStore";
import { Select } from "@/components/layout/Select";
import { SelectItem } from "@/config";
import { useEffect, useState } from "react";

export interface TeacherFormTableProps {
  teachers: TeacherStoreProps["teachers"];
  setTeachers: React.Dispatch<
    React.SetStateAction<TeacherStoreProps["teachers"]>
  >;
  modalFlg?: boolean;
}

export function TeacherFormTable({
  teachers,
  setTeachers,
  modalFlg = false,
}: TeacherFormTableProps) {
  const [subjects, setSubjects] = useState<SubjectSelectResponse["subjects"]>(
    [],
  );
  useEffect(() => {
    //セレクトボックスの取得
    const selectApi = async () => {
      const data = await SubjectSelect();
      setSubjects(data.subjects);
    };

    selectApi();
  }, []);

  return (
    <>
      {teachers.map((teacher, index) => (
        <table key={index} className="w-full mb-20">
          <thead>
            <tr className="thead-tr">
              <td className="thead-td w-5/12">名前</td>
              <td className="thead-td w-7/12">メールアドレス</td>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td className="tbody-td !p-0">
                {modalFlg ? (
                  <div className="p-2">{teacher.name}</div>
                ) : (
                  <input
                    type="text"
                    className="w-full p-2"
                    value={teacher.name}
                    onChange={(e) => {
                      const newTeachers = [...teachers];
                      newTeachers[index] = {
                        ...newTeachers[index],
                        name: e.target.value,
                      };
                      setTeachers(newTeachers);
                    }}
                  />
                )}
              </td>
              <td className="tbody-td !p-0">
                {modalFlg ? (
                  <div className="p-2">{teacher.email}</div>
                ) : (
                  <input
                    type="text"
                    className="w-full p-2"
                    value={teacher.email}
                    onChange={(e) => {
                      const newTeachers = [...teachers];
                      newTeachers[index] = {
                        ...newTeachers[index],
                        email: e.target.value,
                      };
                      setTeachers(newTeachers);
                    }}
                  />
                )}
              </td>
            </tr>
            <tr>
              <td className="border border-text-500" colSpan={2}>
                <div className="flex">
                  <div className="bg-text-500 text-base-500 p-1 w-1/6 flex justify-center items-center font-bold">
                    科目
                  </div>
                  <div className="w-5/6">
                    {modalFlg ? (
                      <div className="p-2">
                        {subjects
                          .filter((subject) =>
                            teacher.subjectIds?.includes(subject.value),
                          )
                          .map((item) => item.label)
                          .join(", ")}
                      </div>
                    ) : (
                      <Select
                        className="w-full p-2"
                        multi={true}
                        options={subjects}
                        value={subjects.filter((subject) =>
                          teacher.subjectIds?.includes(subject.value),
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
                    )}
                  </div>
                </div>
              </td>
            </tr>
          </tbody>
        </table>
      ))}
    </>
  );
}
