import { SubjectResponse } from "@/api/Subject";

interface StudentListTableProps {
  subjects: SubjectResponse["subjects"];
}

export function SubjectListTable({ subjects }: StudentListTableProps) {
  return (
    <table className="w-full">
      <thead>
        <tr className="border border-text bg-text text-base">
          <td className="border-r border-base p-1">科目名</td>
          <td className="border-r border-base p-1">講師名</td>
          <td className="w-[50px] lg:w-[100px]"></td>
        </tr>
      </thead>
      <tbody>
        {Array.isArray(subjects) &&
          subjects.map((subject, index) => (
            <tr key={index}>
              <td className="border border-text p-2">{subject.name}</td>
              <td className="border border-text p-2">
                {subject.teacher_name ?? ""}
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
          ))}
      </tbody>
    </table>
  );
}
