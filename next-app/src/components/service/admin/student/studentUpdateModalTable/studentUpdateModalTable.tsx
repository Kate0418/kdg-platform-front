import { CourseSelect, CourseSelectResponse } from "@/api/CourseSelect";
import { GradeSelect, GradeSelectResponse } from "@/api/GradeSelect";
import { StudentUpdateProps } from "@/api/StudentUpdate";
import { YearSelect, YearSelectResponse } from "@/api/YearSelect";
import { Select } from "@/components/layout/Select";
import { useEffect, useState } from "react";

export interface StudentUpdateTableProps {
  updatStudent: StudentUpdateProps["students"][number];
  setUpdatStudent: React.Dispatch<
    React.SetStateAction<StudentUpdateProps["students"][number]>
  >;
}

export function StudentUpdateModalTable({
  updatStudent,
  setUpdatStudent,
}: StudentUpdateTableProps) {
  const [courses, setCourses] = useState<CourseSelectResponse["courses"]>([]);
  const [grades, setGrades] = useState<GradeSelectResponse["grades"]>([]);
  const [years, setYears] = useState<YearSelectResponse["years"]>([]);

  useEffect(() => {
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

  const theadTd = "bg-text text-base border-base p-2";
  return (
    <table className="w-full">
      <tbody>
        <tr>
          <td className={`${theadTd} border-b`}>名前</td>
          <td className="tbody-td">{updatStudent.name}</td>
        </tr>
        <tr>
          <td className={`${theadTd} border-b`}>メールアドレス</td>
          <td className="tbody-td">{updatStudent.email}</td>
        </tr>
        <tr>
          <td className={`${theadTd} border-b`}>コース</td>
          <td className="tbody-td">
            <Select
              options={courses}
              value={courses.find(
                (course) => course.value === updatStudent.courseId
              )}
              onChange={(e) => {
                setUpdatStudent({
                  ...updatStudent,
                  courseId: e.value,
                });
              }}
            />
          </td>
        </tr>
        <tr>
          <td className={`${theadTd} border-b`}>年次</td>
          <td className="tbody-td">
            <Select
              options={grades}
              value={grades.find(
                (grade) => grade.value === updatStudent.gradeId
              )}
              onChange={(e) => {
                setUpdatStudent({
                  ...updatStudent,
                  gradeId: e.value,
                });
              }}
            />
          </td>
        </tr>
        <tr>
          <td className={theadTd}>年制</td>
          <td className="tbody-td">
            <Select
              options={years}
              value={years.find((year) => year.value === updatStudent.yearId)}
              onChange={(e) => {
                setUpdatStudent({
                  ...updatStudent,
                  yearId: e.value,
                });
              }}
            />
          </td>
        </tr>
      </tbody>
    </table>
  );
}
