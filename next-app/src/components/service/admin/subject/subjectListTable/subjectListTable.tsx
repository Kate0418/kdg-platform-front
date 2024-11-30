import { SubjectResponse } from "@/api/Subject";
import { useEffect, useState, useCallback } from "react";

interface SubjectListTableProps {
  subjects: SubjectResponse["subjects"];
  subjectIds: SubjectResponse["subjectIds"];
  checkIds: number[];
  setCheckIds: React.Dispatch<React.SetStateAction<number[]>>;
}

export function SubjectListTable({
  subjects,
  subjectIds,
  checkIds,
  setCheckIds,
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
        <tr className="border border-text bg-text text-base">
          <td className="border-r border-base p-2 w-10">
            <div className="flex justify-center items-center">
              <input
                type="checkbox"
                className="scale-[2] accent-lime-600"
                checked={allCheckFlg}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                  setAllCheckFlg(e.target.checked);
                  setCheckIds(getAllCheckFlg() ? subjectIds : []);
                }}
              />
            </div>
          </td>
          <td className="border-r border-base p-2">科目名</td>
          <td className="p-2 w-[100px] lg:w-[200px]">講師名</td>
        </tr>
      </thead>
      <tbody>
        {Array.isArray(subjects) &&
          subjects.map((subject, index) => (
            <tr key={index}>
              <td className="border border-text p-2">
                <div className="flex justify-center items-center">
                  <input
                    type="checkbox"
                    className="scale-[2] accent-lime-600"
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
              <td className="border border-text p-2">{subject.name}</td>
              <td className="border border-text p-2">
                {subject.teacher_name ?? ""}
              </td>
            </tr>
          ))}
      </tbody>
    </table>
  );
}
