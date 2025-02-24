import { StudentResponse } from "@/api/Student";
import { StudentUpdateProps } from "@/api/StudentUpdate";
import { Checkbox } from "@/components/layout/checkbox/checkbox";
import { ZoomInIcon } from "@/components/layout/icons/zoomInIcon/zoomInIcon";
import { ZoomOutIcon } from "@/components/layout/icons/zoomOutIcon/zoomOutIcon";
import { WithZoom } from "@/config";
import React, { useCallback, useEffect, useState } from "react";

type StudentWithZoom = WithZoom<StudentResponse["students"][number]>;

interface StudentListTableProps {
  students: StudentWithZoom[];
  setZoom: (e: StudentWithZoom["id"]) => void;
  studentIds: StudentResponse["studentIds"];
  checkIds: number[];
  setUpdateStudent: React.Dispatch<
    React.SetStateAction<StudentUpdateProps["students"][number]>
  >;
  setUpdateModalFlg: React.Dispatch<React.SetStateAction<boolean>>;
  setCheckIds: React.Dispatch<React.SetStateAction<number[]>>;
}

export function StudentListTable({
  students,
  setZoom,
  studentIds,
  checkIds,
  setUpdateStudent,
  setUpdateModalFlg,
  setCheckIds,
}: StudentListTableProps) {
  const [allCheckFlg, setAllCheckFlg] = useState(false);
  const getAllCheckFlg = useCallback(() => {
    const sortStudentIds = [...studentIds].sort((a, b) => a - b);
    const sortCheckIds = [...checkIds].sort((a, b) => a - b);
    return JSON.stringify(sortStudentIds) !== JSON.stringify(sortCheckIds);
  }, [studentIds, checkIds]);

  useEffect(() => {
    if (!getAllCheckFlg()) setAllCheckFlg(true);
  }, [getAllCheckFlg]);

  return (
    <table className="w-full mb-16">
      <thead>
        <tr className="thead-tr">
          <td className="thead-td w-10">
            <div className="flex justify-center items-center">
              <Checkbox
                color="var(--base-500)"
                checked={allCheckFlg}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                  setAllCheckFlg(e.target.checked);
                  setCheckIds(getAllCheckFlg() ? studentIds : []);
                }}
              />
            </div>
          </td>
          <td className="thead-td w-32">名前</td>
          <td className="thead-td break-words whitespace-normal">
            メールアドレス
          </td>
          <td className="thead-td w-[50px]"></td>
        </tr>
      </thead>
      <tbody>
        {students.map((student) => (
          <React.Fragment key={student.id}>
            <tr>
              <td className="tbody-td w-10">
                <div className="flex justify-center items-center">
                  <Checkbox
                    checked={checkIds.includes(student.id)}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                      let newCheckIds;
                      if (e.target.checked) {
                        newCheckIds = [...checkIds, student.id];
                      } else {
                        setAllCheckFlg(false);
                        newCheckIds = checkIds.filter(
                          (id) => id !== student.id,
                        );
                      }
                      setCheckIds(newCheckIds);
                    }}
                  />
                </div>
              </td>
              <td className="tbody-td p-1 lg:p-2">
                <button
                  className="link"
                  onClick={() => {
                    setUpdateStudent({
                      id: student.id,
                      name: student.name,
                      email: student.email,
                      courseId: student.course?.id ?? null,
                      gradeId: student.grade.id,
                      yearId: student.year.id,
                    });
                    setUpdateModalFlg(true);
                  }}
                >
                  {student.name}
                </button>
              </td>
              <td className="tbody-td p-1 lg:p-2">{student.email}</td>
              <td
                className="tbody-td p-2"
                onClick={() => {
                  setZoom(student.id);
                }}
              >
                {student.zoom ? <ZoomOutIcon /> : <ZoomInIcon />}
              </td>
            </tr>
            {student.zoom && (
              <tr>
                <td className="tbody-td" colSpan={4}>
                  <div className="grid lg:grid-cols-[5fr_3fr_3fr]">
                    <div className="flex max-lg:border-b border-text-500">
                      <div className="w-16 bg-text-500 text-base-500 text-center p-2 max-lg:border-b border-base-500 font-bold">
                        コース
                      </div>
                      <div className="flex items-center py-1 px-6">
                        {student.course?.name}
                      </div>
                    </div>
                    <div className="flex max-lg:border-b border-text-500">
                      <div className="w-16 bg-text-500 text-base-500 text-center p-2 max-lg:border-b border-base-500 font-bold">
                        年次
                      </div>
                      <div className="flex items-center py-1 px-6">
                        {student.grade.name}
                      </div>
                    </div>
                    <div className="flex max-lg:border-b border-text-500">
                      <div className="w-16 bg-text-500 text-base-500 text-center p-2 max-lg:border-b border-base-500 font-bold">
                        年制
                      </div>
                      <div className="flex items-center py-1 px-6">
                        {student.year.name}
                      </div>
                    </div>
                  </div>
                </td>
              </tr>
            )}
          </React.Fragment>
        ))}
      </tbody>
    </table>
  );
}
