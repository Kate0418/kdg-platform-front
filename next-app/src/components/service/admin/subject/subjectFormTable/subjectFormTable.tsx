import { SubjectStoreProps } from "@/api/SubjectStore";
import { TeacherSelect, TeacherSelectResponse } from "@/api/TeacherSelect";
import { Select } from "@/components/layout/Select";
import { SelectItem } from "@/config";
import { useEffect, useState } from "react";

interface SubjectFormTableProps {
  subjects: SubjectStoreProps["subjects"];
  setSubjects: React.Dispatch<
    React.SetStateAction<SubjectStoreProps["subjects"]>
  >;
  modalFlg?: boolean;
}

export function SubjectFormTable({
  subjects,
  setSubjects,
  modalFlg = false,
}: SubjectFormTableProps) {
  const [teachers, setTeachers] = useState<TeacherSelectResponse["teachers"]>(
    [],
  );

  useEffect(() => {
    const selectApi = async () => {
      const response = await TeacherSelect();
      setTeachers(response.teachers);
    };

    selectApi();
  }, []);
  return (
    <table className="w-full mb-5 mt-2">
      <thead>
        <tr className="thead-tr">
          <td className="thead-td w-1/2">科目名</td>
          <td className="thead-td w-1/2">講師</td>
        </tr>
      </thead>
      <tbody className="overflow-auto">
        {subjects.map((subject, index) => (
          <tr key={index}>
            <td className="tbody-td">
              {modalFlg ? (
                <div className="w-full p-2">{subject.name}</div>
              ) : (
                <input
                  type="text"
                  className="w-full p-2"
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
              )}
            </td>
            <td className="tbody-td">
              {modalFlg ? (
                <div>
                  {teachers.find(
                    (teacher) => teacher.value === subject.teacherId,
                  )?.label ?? ""}
                </div>
              ) : (
                <Select
                  options={teachers}
                  value={teachers.find(
                    (teacher) => teacher.value === subject.teacherId,
                  )}
                  onChange={(e: SelectItem) => {
                    const newSubjects = [...subjects];
                    newSubjects[index] = {
                      ...newSubjects[index],
                      teacherId: e?.value ?? null,
                    };
                    setSubjects(newSubjects);
                  }}
                />
              )}
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
