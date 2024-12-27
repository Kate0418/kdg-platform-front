import { SubjectSelect, SubjectSelectResponse } from "@/api/SubjectSelect";
import { TeacherUpdateProps } from "@/api/TeacherUpdate";
import { Select } from "@/components/layout/Select";
import { SelectItem } from "@/config";
import { useEffect, useState } from "react";

export interface TeacherUpdateModalTableProps {
  updateTeacher: TeacherUpdateProps["teachers"][number];
  setUpdateTeacher: React.Dispatch<
    React.SetStateAction<TeacherUpdateProps["teachers"][number]>
  >;
}

export function TeacherUpdateModalTable({
  updateTeacher,
  setUpdateTeacher,
}: TeacherUpdateModalTableProps) {
  const [subjects, setSubjects] = useState<SubjectSelectResponse["subjects"]>(
    [],
  );

  useEffect(() => {
    const selectApi = async () => {
      const response = await SubjectSelect();
      setSubjects(response.subjects);
    };

    selectApi();
  }, []);
  return (
    <table>
      <tbody>
        <tr>
          <td className="text-base-500 bg-text-500 border border-text-500 p-2 border-b-base-500">
            名前
          </td>
          <td className="border border-text-500 p-2">
            <input
              type="text"
              value={updateTeacher.name}
              onChange={(e) =>
                setUpdateTeacher({ ...updateTeacher, name: e.target.value })
              }
            />
          </td>
        </tr>
        <tr>
          <td className="text-base-500 bg-text-500 border border-text-500 p-2 border-b-base-500">
            メールアドレス
          </td>
          <td className="border border-text-500 p-2">
            <input
              type="email"
              value={updateTeacher.email}
              onChange={(e) =>
                setUpdateTeacher({ ...updateTeacher, email: e.target.value })
              }
            />
          </td>
        </tr>
        <tr>
          <td className="text-base bg-text-500 border border-text-500 p-2">
            科目
          </td>
          <td className="border border-text-500 p-2">
            <Select
              multi={true}
              options={subjects}
              value={subjects.filter((subject) =>
                updateTeacher.subjectIds?.includes(subject.value),
              )}
              onChange={(e: SelectItem[]) =>
                setUpdateTeacher({
                  ...updateTeacher,
                  subjectIds: e.map((item) => item.value),
                })
              }
            />
          </td>
        </tr>
      </tbody>
    </table>
  );
}
