import { CourseResponse } from "@/api/Course";

export interface CourseListTableProps {
  courses: CourseResponse["courses"];
}

export function CourseListTable({ courses }: CourseListTableProps) {
  return (
    <table className="w-full">
      <thead>
        <tr className="border border-text bg-text text-base">
          <td className="border-r border-base p-1">コース名</td>
          <td className="border-r border-base p-1">学年</td>
          <td className="w-[50px] lg:w-[100px]"></td>
        </tr>
      </thead>
      <tbody>
        {Array.isArray(courses) &&
          courses.map((course, index) => (
            <tr key={index}>
              <td className="border border-text p-2">{course.name}</td>
              <td className="border border-text p-2">{course.gradeName}</td>
              <td className="border border-text p-1 lg:p-3">
                <a
                  className="p-1 lg:p-3 rounded-lg bg-accent text-base"
                  href=""
                >
                  編集
                </a>
              </td>
            </tr>
          ))}
      </tbody>
    </table>
  );
}
