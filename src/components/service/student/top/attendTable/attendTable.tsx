import {
  AttendStudentStore,
  AttendStudentStoreProps,
} from "@/api/AttendStudentStore";
import { TopAttendStudentResponse } from "@/api/TopAttendStudent";
import { Button } from "@/components/layout/button/button";

export interface AttendTableProps {
  lessons: TopAttendStudentResponse["lessons"];
}

export function AttendTable({ lessons }: AttendTableProps) {
  const buttonLabel = (states: (typeof lessons)[number]["states"]) => {
    if (states === "already") {
      return "出席済み";
    } else if (states === "present") {
      return "出席申請";
    } else {
      return "遅刻申請";
    }
  };

  const storeApi = async (lessonId: AttendStudentStoreProps["lessonId"]) => {
    const response = await AttendStudentStore({ lessonId });
    alert(response.message);
  };

  if (lessons.length === 0) {
    return (
      <div className="text-lg text-accent-500 font-bold">
        現在出席できる授業はありません。
      </div>
    );
  }

  return (
    <table className="w-full">
      <thead>
        <tr className="thead-tr">
          <td className="thead-td">科目名</td>
          <td className="thead-td">開始時間</td>
          <td className="thead-td">終了時間</td>
          <td className="thead-td w-28" />
        </tr>
      </thead>
      <tbody>
        {lessons.map((lesson, index) => (
          <tr key={index}>
            <td className="tbody-td p-2">{lesson.subjectName}</td>
            <td className="tbody-td p-2">{lesson.startTime}</td>
            <td className="tbody-td p-2">{lesson.endTime}</td>
            <td className="tbody-td p-2">
              <Button
                type="button"
                onClick={() => storeApi(lesson.id)}
                value={buttonLabel(lesson.states)}
                isHover={lesson.states !== "already"}
                disabled={lesson.states === "already"}
                reverse={lesson.states === "already"}
              />
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
