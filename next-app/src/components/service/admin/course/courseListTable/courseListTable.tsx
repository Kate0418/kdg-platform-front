import { CourseResponse } from "@/api/Course";
import { Checkbox } from "@/components/layout/checkbox/checkbox";
import Link from "next/link";
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
        <tr className="thead-tr">
          <td className="thead-td w-10">
            <div className="flex justify-center items-center">
              <Checkbox
                color="var(--base-500)"
                checked={allCheckFlg}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                  setAllCheckFlg(e.target.checked);
                  setCheckIds(getAllCheckFlg() ? courseIds : []);
                }}
              />
            </div>
          </td>
          <td className="thead-td">コース名</td>
          <td className="thead-td">学年</td>
        </tr>
      </thead>
      <tbody>
        {Array.isArray(courses) &&
          courses.map((course, index) => (
            <tr key={index}>
              <td className="tbody-td p-2">
                <div className="flex justify-center items-center">
                  <Checkbox
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
              <td className="tbody-td p-2">
                <Link className="link" href="#">
                  {course.name}
                </Link>
              </td>
              <td className="tbody-td p-2">{course.gradeName}</td>
            </tr>
          ))}
      </tbody>
    </table>
  );
}
