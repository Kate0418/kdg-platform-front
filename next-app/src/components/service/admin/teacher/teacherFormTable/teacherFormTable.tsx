import { SubjectSelectResponse } from "@/api/SubjectSelect";
import { TeacherStoreProps } from "@/api/TeacherStore";
import { Select } from "@/components/layout/Select";
import { SelectItem } from "@/config";

export interface TeacherFormTableProps {
  teachers: TeacherStoreProps["teachers"];
  setTeachers: React.Dispatch<
    React.SetStateAction<TeacherStoreProps["teachers"]>
  >;
  select: {
    subjects: SubjectSelectResponse["subjects"];
  };
  modalFlg?: boolean;
}

export function TeacherFormTable({
  teachers,
  setTeachers,
  select,
  modalFlg = false,
}: TeacherFormTableProps) {
  return (
    <>
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
                {modalFlg ? (
                  <div className="w-full p-1">{teacher.name}</div>
                ) : (
                  <input
                    type="text"
                    className="w-full p-1"
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
              <td className="border border-text">
                {modalFlg ? (
                  <div className="w-full p-1">{teacher.email}</div>
                ) : (
                  <input
                    type="text"
                    className="w-full p-1"
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
              <td className="border border-text" colSpan={2}>
                <div className="flex">
                  <div className="bg-text text-base p-1 w-1/6 text-center">
                    科目
                  </div>
                  <div className="w-5/6">
                    {modalFlg ? (
                      <div className="p-1">
                        {select.subjects
                          .filter((subject) =>
                            teacher.subjectIds.includes(subject.value),
                          )
                          .map((item) => item.label)
                          .join(", ")}
                      </div>
                    ) : (
                      <Select
                        multi={true}
                        options={select.subjects}
                        value={select.subjects.filter((subject) =>
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
