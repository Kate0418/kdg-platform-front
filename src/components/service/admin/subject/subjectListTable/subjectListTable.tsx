import { SubjectResponse } from "@/api/Subject";
import { SubjectUpdateProps } from "@/api/SubjectUpdate";
import { Checkbox } from "@/components/layout/checkbox/checkbox";
import { useEffect, useState, useCallback } from "react";

interface SubjectListTableProps {
  subjects: SubjectResponse["subjects"];
  subjectIds: SubjectResponse["subjectIds"];
  checkIds: number[];
  setCheckIds: React.Dispatch<React.SetStateAction<number[]>>;
  setUpdateSubject: React.Dispatch<
    React.SetStateAction<SubjectUpdateProps["subjects"][number]>
  >;
  setUpdateModalFlg: React.Dispatch<React.SetStateAction<boolean>>;
}

export function SubjectListTable({
  subjects,
  subjectIds,
  checkIds,
  setCheckIds,
  setUpdateSubject,
  setUpdateModalFlg,
}: SubjectListTableProps) {
  const [allCheckFlg, setAllCheckFlg] = useState(false);

  const getAllCheckFlg = useCallback(() => {
    const sortSubjectIds = [...subjectIds].sort((a, b) => a - b);
    const sortCheckIds = [...checkIds].sort((a, b) => a - b);
    return JSON.stringify(sortSubjectIds) !== JSON.stringify(sortCheckIds);
  }, [subjectIds, checkIds]);

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
                  setCheckIds(getAllCheckFlg() ? subjectIds : []);
                }}
              />
            </div>
          </td>
          <td className="thead-td">科目名</td>
          <td className="thead-td w-[100px] lg:w-[200px]">講師名</td>
        </tr>
      </thead>
      <tbody>
        {Array.isArray(subjects) &&
          subjects.map((subject, index) => (
            <tr key={index}>
              <td className="tbody-td p-2">
                <div className="flex justify-center items-center">
                  <Checkbox
                    checked={checkIds.includes(subject.id)}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                      let newCheckIds;
                      if (e.target.checked) {
                        newCheckIds = [...checkIds, subject.id];
                      } else {
                        setAllCheckFlg(false);
                        newCheckIds = checkIds.filter(
                          (id) => id !== subject.id,
                        );
                      }
                      setCheckIds(newCheckIds);
                    }}
                  />
                </div>
              </td>
              <td className="tbody-td p-2">
                <button
                  className="link"
                  onClick={() => {
                    setUpdateSubject({
                      id: subject.id,
                      name: subject.name,
                      teacherId: subject.teacher?.id ?? null,
                    });
                    setUpdateModalFlg(true);
                  }}
                >
                  {subject.name}
                </button>
              </td>
              <td className="tbody-td p-2">
                {subject.teacher ? subject.teacher.name : ""}
              </td>
            </tr>
          ))}
      </tbody>
    </table>
  );
}
