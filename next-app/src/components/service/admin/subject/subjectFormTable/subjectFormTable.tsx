import { SubjectStoreProps } from "@/api/SubjectStore";
import { TeacherSelectResponse } from "@/api/TeacherSelect";
import { Select } from "@/components/layout/Select";
import { SelectItem } from "@/config";

interface SubjectFormTableProps {
  subjects: SubjectStoreProps["subjects"];
  setSubjects: React.Dispatch<
    React.SetStateAction<SubjectStoreProps["subjects"]>
  >;
  select: {
    teachers: TeacherSelectResponse["teachers"];
  };
  modalFlg?: boolean;
}

export function SubjectFormTable({
  subjects,
  setSubjects,
  select,
  modalFlg = false,
}: SubjectFormTableProps) {
  return (
    <table className="w-full mb-5 mt-2">
      <thead>
        <tr className="border border-text-800 bg-text-800 text-base-800">
          <td className="border-r border-base-800 p-1 w-1/2">科目名</td>
          <td className="p-1 w-1/2">講師</td>
        </tr>
      </thead>
      <tbody className="overflow-auto">
        {subjects.map((subject, index) => (
          <tr key={index}>
            <td className="border border-text-800">
              {modalFlg ? (
                <div className="w-full p-1 font-bold">{subject.name}</div>
              ) : (
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
              )}
            </td>
            <td className="border border-text-800">
              {modalFlg ? (
                <div>
                  {select.teachers.find(
                    (teacher) => teacher.value === subject.teacherId,
                  )?.label ?? ""}
                </div>
              ) : (
                <Select
                  options={select.teachers}
                  value={select.teachers.find(
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
              )}
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
