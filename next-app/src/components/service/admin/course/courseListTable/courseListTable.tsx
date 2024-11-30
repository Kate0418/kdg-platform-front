import { CourseResponse } from "@/api/Course";
import { useState, useEffect, useCallback } from "react";

export interface CourseListTableProps {
  courses: CourseResponse["courses"];
  courseIds: CourseResponse["courseIds"];
  checkIds: number[];
  setCheckIds: React.Dispatch<React.SetStateAction<number[]>>;
}

export function CourseListTable({
  courses,
  courseIds,
  checkIds,
  setCheckIds,
}: CourseListTableProps) {
  const [allCheckFlg, setAllCheckFlg] = useState(false);
  const getAllCheckFlg = useCallback(() => {
    console.log(courseIds);
    const sortCourseIds = [...courseIds].sort((a, b) => a - b);
    const sortCheckIds = [...checkIds].sort((a, b) => a - b);
    return JSON.stringify(sortCourseIds) !== JSON.stringify(sortCheckIds);
  }, [courseIds, checkIds]);

  useEffect(() => {
    if (!getAllCheckFlg()) setAllCheckFlg(true);
  }, [getAllCheckFlg]);

  return (
    <table className="w-full">
      <thead>
        <tr className="border border-text bg-text text-base">
          <td className="border-r border-base p-2 w-10">
            <div className="flex justify-center items-center">
              <input
                type="checkbox"
                className="scale-[2] accent-lime-600"
                checked={allCheckFlg}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                  setAllCheckFlg(e.target.checked);
                  setCheckIds(getAllCheckFlg() ? courseIds : []);
                }}
              />
            </div>
          </td>
          <td className="border-r border-base p-2">コース名</td>
          <td className="border-r border-base p-2">学年</td>
          <td className="w-[50px] lg:w-[100px]"></td>
        </tr>
      </thead>
      <tbody>
        {Array.isArray(courses) &&
          courses.map((course, index) => (
            <tr key={index}>
              <td className="border border-text p-2">
                <div className="flex justify-center items-center">
                  <input
                    type="checkbox"
                    className="scale-[2] accent-lime-600"
                    checked={checkIds.includes(course.id)}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                      let newCheckIds;
                      if (e.target.checked) {
                        newCheckIds = [...checkIds, course.id];
                      } else {
                        setAllCheckFlg(false);
                        newCheckIds = checkIds.filter((id) => id !== course.id);
                      }
                      setCheckIds(newCheckIds);
                    }}
                  />
                </div>
              </td>
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
