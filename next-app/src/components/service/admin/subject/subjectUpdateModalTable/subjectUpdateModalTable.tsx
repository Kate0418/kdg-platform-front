import { SubjectUpdateProps } from "@/api/SubjectUpdate";
import { TeacherSelect, TeacherSelectResponse } from "@/api/TeacherSelect";
import { Select } from "@/components/layout/Select";
import { SelectItem } from "@/config";
import { useEffect, useState } from "react";

export interface SubjectUpdateModalTableProps {
  updateSubject: SubjectUpdateProps["subjects"][number];
  setUpdateSubject: React.Dispatch<
    React.SetStateAction<SubjectUpdateProps["subjects"][number]>
  >;
}

export function SubjectUpdateModalTable({
  updateSubject,
  setUpdateSubject,
}: SubjectUpdateModalTableProps) {
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
    <table className="w-full">
      <tbody>
        <tr>
          <td className="text-base bg-text border border-text p-2 border-b-base">
            科目名
          </td>
          <td className="border border-text p-2">
            <input
              value={updateSubject.name}
              onChange={(e) =>
                setUpdateSubject({ ...updateSubject, name: e.target.value })
              }
            />
          </td>
        </tr>
        <tr>
          <td className="text-base bg-text border border-text p-2">講師名</td>
          <td className="border border-text p-2">
            <Select
              options={teachers}
              value={teachers.find(
                (teacher) => teacher.value === updateSubject.teacherId,
              )}
              onChange={(e: SelectItem) => {
                setUpdateSubject({
                  ...updateSubject,
                  teacherId: e.value,
                });
              }}
            />
          </td>
        </tr>
      </tbody>
    </table>
  );
}
