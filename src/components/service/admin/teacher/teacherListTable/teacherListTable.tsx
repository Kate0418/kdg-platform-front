import { TeacherResponse } from "@/api/Teacher";
import { TeacherUpdateProps } from "@/api/TeacherUpdate";
import { Checkbox } from "@/components/layout/checkbox/checkbox";
import { ZoomInIcon } from "@/components/layout/icons/zoomInIcon/zoomInIcon";
import { ZoomOutIcon } from "@/components/layout/icons/zoomOutIcon/zoomOutIcon";
import { WithZoom } from "@/config";
import React from "react";
import { useState, useEffect, useCallback } from "react";

type TeachersWithZoom = WithZoom<TeacherResponse["teachers"][number]>;

interface TeacherListTableProps {
  teachers: TeachersWithZoom[];
  setZoom: (e: TeachersWithZoom["id"]) => void;
  teacherIds: TeacherResponse["teacherIds"];
  checkIds: number[];
  setUpdateTeacher: React.Dispatch<
    React.SetStateAction<TeacherUpdateProps["teachers"][number]>
  >;
  setUpdateModalFlg: React.Dispatch<React.SetStateAction<boolean>>;
  setCheckIds: React.Dispatch<React.SetStateAction<number[]>>;
}

export function TeacherListTable({
  teachers,
  setZoom,
  teacherIds,
  checkIds,
  setUpdateTeacher,
  setUpdateModalFlg,
  setCheckIds,
}: TeacherListTableProps) {
  const [allCheckFlg, setAllCheckFlg] = useState(false);
  const getAllCheckFlg = useCallback(() => {
    const sortTeacherIds = [...teacherIds].sort((a, b) => a - b);
    const sortCheckIds = [...checkIds].sort((a, b) => a - b);
    return JSON.stringify(sortTeacherIds) !== JSON.stringify(sortCheckIds);
  }, [teacherIds, checkIds]);

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
                  setCheckIds(getAllCheckFlg() ? teacherIds : []);
                }}
              />
            </div>
          </td>
          <td className="thead-td">名前</td>
          <td className="thead-td">メールアドレス</td>
          <td className="thead-td w-[50px]"></td>
        </tr>
      </thead>
      <tbody>
        {teachers.map((teacher, index) => (
          <React.Fragment key={index}>
            <tr>
              <td className="tbody-td">
                <div className="flex justify-center items-center">
                  <Checkbox
                    checked={checkIds.includes(teacher.id)}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                      let newCheckIds;
                      if (e.target.checked) {
                        newCheckIds = [...checkIds, teacher.id];
                      } else {
                        setAllCheckFlg(false);
                        newCheckIds = checkIds.filter(
                          (id) => id !== teacher.id,
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
                    setUpdateTeacher({
                      id: teacher.id,
                      name: teacher.name,
                      email: teacher.email,
                      subjectIds: teacher.subjects.map((subject) => subject.id),
                    });
                    setUpdateModalFlg(true);
                  }}
                >
                  {teacher.name}
                </button>
              </td>
              <td className="tbody-td p-1 lg:p-2">{teacher.email}</td>
              <td
                className="tbody-td p-2"
                onClick={() => {
                  setZoom(teacher.id);
                }}
              >
                {teacher.zoom ? <ZoomOutIcon /> : <ZoomInIcon />}
              </td>
            </tr>
            {teacher.zoom && (
              <tr>
                <td className="tbody-td" colSpan={4}>
                  <div className="flex">
                    <div className="bg-text-500 text-base-500 p-2 w-1/6 flex justify-center items-center font-bold">
                      科目
                    </div>
                    <div className="flex items-center py-2 px-6">
                      {teacher.subjects
                        .map((subject) => subject.name)
                        .join(", ")}
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
