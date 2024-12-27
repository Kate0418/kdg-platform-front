import { CourseSelect, CourseSelectResponse } from "@/api/CourseSelect";
import { GradeSelect, GradeSelectResponse } from "@/api/GradeSelect";
import { StudentStoreProps } from "@/api/StudentStore";
import { YearSelect, YearSelectResponse } from "@/api/YearSelect";
import { Select } from "@/components/layout/Select";
import { useEffect, useState } from "react";

export interface StudentFormTableProps {
  students: StudentStoreProps["students"];
  setStudents: React.Dispatch<
    React.SetStateAction<StudentStoreProps["students"]>
  >;
  readOnly?: boolean;
}

export function StudentFromTable({
  students,
  setStudents,
  readOnly = false,
}: StudentFormTableProps) {
  const [courses, setCourses] = useState<CourseSelectResponse["courses"]>([]);
  const [grades, setGrades] = useState<GradeSelectResponse["grades"]>([]);
  const [years, setYears] = useState<YearSelectResponse["years"]>([]);

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
  return (
    <>
      {students.map((student, index) => (
        <table key={index} className="w-full mb-16">
          <thead>
            <tr className="thead-tr">
              <td className="thead-td w-5/12">名前</td>
              <td className="thead-td w-7/12">メールアドレス</td>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td className="tbody-td !p-0">
                {readOnly ? (
                  <div className="p-2">{student.name}</div>
                ) : (
                  <input
                    type="text"
                    className="w-full p-2"
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
                )}
              </td>
              <td className="tbody-td !p-0">
                {readOnly ? (
                  <div className="p-2">{student.email}</div>
                ) : (
                  <input
                    type="text"
                    value={student.email}
                    className="w-full p-2"
                    onChange={(e) => {
                      const newStudents = [...students];
                      newStudents[index] = {
                        ...newStudents[index],
                        email: e.target.value,
                      };
                      setStudents(newStudents);
                    }}
                  />
                )}
              </td>
            </tr>
            <tr>
              <td className="border border-text-500" colSpan={2}>
                <div className="grid lg:grid-cols-[5fr_3fr_3fr]">
                  <div className="flex max-lg:border-b border-text-500">
                    <div className="w-16 bg-text-500 text-base-500 p-1 flex items-center justify-center max-lg:border-b border-base-500 font-bold">
                      コース
                    </div>
                    {readOnly ? (
                      <div className="p-2">
                        {
                          courses.find(
                            (course) => course.value === student.courseId,
                          )?.label
                        }
                      </div>
                    ) : (
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
                              courseId: e?.value,
                            };
                            setStudents(newStudents);
                          }}
                        />
                      </div>
                    )}
                  </div>
                  <div className="flex max-lg:border-b border-text-500">
                    <div className="w-16 bg-text-500 text-base-500 p-2 flex items-center justify-center max-lg:border-b border-base-500 font-bold">
                      年次
                    </div>
                    {readOnly ? (
                      <div className="p-2">
                        {
                          grades.find(
                            (grades) => grades.value === student.gradeId,
                          )?.label
                        }
                      </div>
                    ) : (
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
                              gradeId: e?.value,
                            };
                            setStudents(newStudents);
                          }}
                        />
                      </div>
                    )}
                  </div>
                  <div className="flex  max-lg:border-b border-text-500">
                    <div className="w-16 bg-text-500 text-base-500 p-2 flex items-center justify-center max-lg:border-b border-base-500 font-bold">
                      年制
                    </div>
                    {readOnly ? (
                      <div className="p-2">
                        {
                          years.find((year) => year.value === student.yearId)
                            ?.label
                        }
                      </div>
                    ) : (
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
                              yearId: e?.value,
                            };
                            setStudents(newStudents);
                          }}
                        />
                      </div>
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
