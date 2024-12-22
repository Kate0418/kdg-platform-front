import { StudentResponse } from "@/api/Student";
import { StudentUpdateProps } from "@/api/StudentUpdate";
import { WithZoom } from "@/config";
import Image from "next/image";
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
              <input
                type="checkbox"
                className="scale-[2] accent-accent-800"
                checked={allCheckFlg}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                  setAllCheckFlg(e.target.checked);
                  setCheckIds(getAllCheckFlg() ? studentIds : []);
                }}
              />
            </div>
          </td>
          <td className="thead-td">名前</td>
          <td className="thead-td">メールアドレス</td>
          <td className="thead-td w-[50px] lg:w-[100px]"></td>
        </tr>
      </thead>
      <tbody>
        {students.map((student) => (
          <React.Fragment key={student.id}>
            <tr>
              <td className="-800">
                <div className="flex justify-center items-center">
                  <input
                    type="checkbox"
                    className="scale-[2] accent-accent-800"
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
              <td className="border border-text-800 lg:p-2">
                <button
                  className="text-text-800 hover:text-text-800 underline"
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
              <td className="border border-text-800 lg:p-2">{student.email}</td>
              <td className="border border-text-800 lg:p-2">
                <button
                  type="button"
                  onClick={() => {
                    setZoom(student.id);
                  }}
                >
                  <Image
                    className="lg:w-8"
                    src={
                      student.zoom ? "/img/zoom_out.svg" : "/img/zoom_in.svg"
                    }
                    alt="zoom"
                    width={24}
                    height={24}
                  />
                </button>
              </td>
            </tr>
            {student.zoom && (
              <tr>
                <td className="border border-text-800" colSpan={4}>
                  <div className="grid lg:grid-cols-[5fr_3fr_3fr_auto]">
                    <div className="flex">
                      <div className="w-16 bg-text-800 text-base-800 text-center p-1 lg:py-3">
                        コース
                      </div>
                      <div className="flex items-center py-1 px-6">
                        {student.course?.name}
                      </div>
                    </div>
                    <div className="flex">
                      <div className="w-14 bg-text-800 text-base-800 text-center p-1 lg:py-3">
                        年次
                      </div>
                      <div className="flex items-center py-1 px-6">
                        {student.grade.name}
                      </div>
                    </div>
                    <div className="flex">
                      <div className="w-14 bg-text-800 text-base-800 text-center p-1 lg:py-3">
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
