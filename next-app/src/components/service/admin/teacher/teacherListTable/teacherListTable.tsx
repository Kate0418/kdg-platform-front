import { TeacherResponse } from "@/api/Teacher";
import { WithZoom } from "@/config";
import Image from "next/image";
import React from "react";

type TeachersWithZoom = WithZoom<TeacherResponse["teachers"][number]>;

interface TeacherListTableProps {
  teachers: TeachersWithZoom[];
  setZoom: (e: TeachersWithZoom["id"]) => void;
}

export function TeacherListTable({ teachers, setZoom }: TeacherListTableProps) {
  return (
    <table className="w-full">
      <thead>
        <tr className="border border-text bg-text text-base">
          <td className="border-r border-base p-1">名前</td>
          <td className="border-r border-base p-1">メールアドレス</td>
          <td className="w-[50px] lg:w-[100px]"></td>
        </tr>
      </thead>
      <tbody>
        {teachers.map((teacher, index) => (
          <React.Fragment key={index}>
            <tr>
              <td className="border border-text lg:p-2">{teacher.name}</td>
              <td className="border border-text lg:p-2">{teacher.email}</td>
              <td className="border border-text lg:p-2">
                <button
                  type="button"
                  onClick={() => {
                    setZoom(teacher.id);
                  }}
                >
                  <Image
                    className="lg:w-8"
                    src={
                      teacher.zoom ? "/img/zoom_out.svg" : "/img/zoom_in.svg"
                    }
                    alt="zoom"
                    width={24}
                    height={24}
                  />
                </button>
              </td>
            </tr>
            <tr className={teacher.zoom ? "" : "hidden"}>
              <td className="border border-text" colSpan={2}>
                <div className="flex">
                  <div className="bg-text text-base w-1/6 text-center p-1 lg:py-3 ">
                    科目
                  </div>
                  <div className="flex items-center py-1 px-6">
                    {teacher.subjectNames.join(", ")}
                  </div>
                </div>
              </td>
              <td className="border border-text p-1 lg:p-3">
                <a
                  className="p-1 lg:p-3 rounded-lg bg-accent text-base"
                  href=""
                >
                  編集
                </a>
              </td>
            </tr>
          </React.Fragment>
        ))}
      </tbody>
    </table>
  );
}
