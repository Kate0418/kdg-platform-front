import { CourseStoreProps } from "@/api/CourseStore";
import { GradeSelect, GradeSelectResponse } from "@/api/GradeSelect";
import { SubjectSelect, SubjectSelectResponse } from "@/api/SubjectSelect";
import { Select } from "@/components/layout/Select";
import { daysOfWeek, SelectItem } from "@/config";
import { DndContext, DragEndEvent } from "@dnd-kit/core"; //ライブラリ
import { ScheduleColumn } from "../scheduleColumn/scheduleColumn";
import { Droppable } from "../droppable/droppable";
import { Draggable } from "../draggable/draggable";
import { TimePicker } from "../timePicker/timePicker";
import { TimeIcon } from "@/components/layout/icons/timeIcon/timeIcon";
import { DeleteIcon } from "@/components/layout/icons/deleteIcon/deleteIcon";
import { PlusIcon } from "@/components/layout/icons/plusIcon/plusIcon";
import { useEffect, useState } from "react";

export interface CourseFormTableProps {
  course: CourseStoreProps["course"];
  setCourse: React.Dispatch<React.SetStateAction<CourseStoreProps["course"]>>;
  modalFlg?: boolean;
}

export function CourseFormTable({
  course,
  setCourse,
  modalFlg = false,
}: CourseFormTableProps) {
  const [grades, setGrades] = useState<GradeSelectResponse["grades"]>([]);
  const [subjects, setSubjects] = useState<SubjectSelectResponse["subjects"]>(
    [],
  );
  const period = 12;

  useEffect(() => {
    const selectApi = async () => {
      const subjectData = await SubjectSelect();
      setSubjects(subjectData.subjects);

      const gradeData = await GradeSelect();
      setGrades(gradeData.grades);
    };

    selectApi();
  }, []);

  const getLessonIndex = (i: number, j: number) => {
    return course.lessons.findIndex(
      (lesson) => lesson.dayOfWeek === i && lesson.period === j,
    );
  };
  const getLessonFlg = (i: number, j: number) => {
    return course.lessons.some(
      (lesson) => lesson.dayOfWeek === i && lesson.period === j,
    );
  };

  const onDragEnd = (e: DragEndEvent) => {
    const activeId = e.active.id;
    const overId = e.over ? e.over.id : null;

    if (overId !== null) {
      const [, activeDayOfWeek, activePeriod] = String(activeId).split("-");
      const [, overDayOfWeek, overPeriod] = String(overId).split("-");

      const activeIndex = getLessonIndex(
        Number(activeDayOfWeek),
        Number(activePeriod),
      );
      // -1の場合がある
      const overIndex = getLessonIndex(
        Number(overDayOfWeek),
        Number(overPeriod),
      );

      // lessonsの配列を新しく作成
      let newLessons = [...course.lessons];

      if (overIndex === -1) {
        newLessons = newLessons.filter((_, index) => index !== activeIndex);
        newLessons.push({
          dayOfWeek: Number(overDayOfWeek),
          period: Number(overPeriod),
          subjectId: course.lessons[activeIndex].subjectId,
        });
      } else {
        // 要素の入れ替え
        const tempSubjectId = newLessons[activeIndex].subjectId;
        newLessons[activeIndex] = {
          ...newLessons[activeIndex],
          subjectId: newLessons[overIndex].subjectId,
        };
        newLessons[overIndex] = {
          ...newLessons[overIndex],
          subjectId: tempSubjectId,
        };
      }
      setCourse({
        ...course,
        lessons: newLessons,
      });
    }
  };
  return (
    <>
      <div className="flex items-center pl-2 pb-2">
        <label>コース名：</label>
        <input
          className="p-1 border border-text-500 rounded-lg"
          value={course.name}
          onChange={(e) => setCourse({ ...course, name: e.target.value })}
          readOnly={modalFlg}
        />
        <label className="pl-2">学年：</label>

        <Select
          className="w-32 border border-text-500 rounded-lg px-2"
          options={grades}
          value={grades.find((grade) => grade.value === course.gradeId)}
          onChange={(e: SelectItem) => {
            setCourse({
              ...course,
              gradeId: e?.value ?? null,
            });
          }}
          isDisabled={modalFlg}
        />
      </div>
      <DndContext onDragEnd={onDragEnd}>
        <div className="grid lg:grid-cols-[2fr_3fr_3fr_3fr_3fr_3fr_3fr_3fr] gap-2">
          <ScheduleColumn head="時間">
            {Array.from({ length: period }).map((_, j) => (
              <div
                key={j}
                className="flex flex-col justify-center items-center border-b border-text-500 h-20"
              >
                <div className="w-full flex flex-col gap-1 px-1">
                  <div className="flex gap-1 items-center">
                    <TimeIcon />
                    <TimePicker
                      className="w-16"
                      value={course.times[j].startTime}
                      onChange={(time) => {
                        if (time) {
                          const newCourse = { ...course };
                          newCourse.times[j].startTime = time;
                          setCourse(newCourse);
                        }
                      }}
                      readOnly={modalFlg}
                    />
                  </div>
                  <div className="flex gap-1 items-center">
                    <TimeIcon />
                    <TimePicker
                      className="w-16"
                      value={course.times[j].endTime}
                      onChange={(time) => {
                        const newCourse = { ...course };
                        newCourse.times[j].endTime = time;
                        setCourse(newCourse);
                      }}
                      readOnly={modalFlg}
                    />
                  </div>
                </div>
              </div>
            ))}
          </ScheduleColumn>
          {Array.from({ length: 7 }).map((_, i) => (
            <ScheduleColumn head={daysOfWeek[i]} key={i}>
              {Array.from({ length: period }).map((_, j) => (
                <div
                  key={j}
                  className="flex flex-col justify-center items-center border-b border-text-500 h-20"
                >
                  <div className="w-full px-1">
                    {modalFlg ? (
                      <div className="flex justify-center overflow-y-auto max-h-[80px]">
                        {
                          subjects.find(
                            (subject) =>
                              subject.value ===
                              course.lessons[getLessonIndex(i, j)]?.subjectId,
                          )?.label
                        }
                      </div>
                    ) : (
                      <Droppable id={`drop-${i}-${j}`} key={j}>
                        <Draggable
                          id={`drag-${i}-${j}`}
                          key={j}
                          lessonFlg={getLessonFlg(i, j)}
                        >
                          {getLessonFlg(i, j) ? (
                            <div className="w-full p-2 flex">
                              <Select
                                className="text-xs w-5/6 font-bold"
                                options={subjects}
                                value={(() => {
                                  const lessonIndex = getLessonIndex(i, j);
                                  const subjectId =
                                    course.lessons[lessonIndex]?.subjectId;
                                  return (
                                    subjects.find(
                                      (subject) => subject.value === subjectId,
                                    ) || null
                                  );
                                })()}
                                onChange={(newValue: unknown) => {
                                  const data = newValue as SelectItem;
                                  const newCourse = { ...course };
                                  newCourse.lessons[getLessonIndex(i, j)] = {
                                    ...newCourse.lessons[getLessonIndex(i, j)],
                                    subjectId: data?.value ?? null,
                                  };
                                  setCourse(newCourse);
                                }}
                              />
                              <button
                                className="z-10"
                                type="button"
                                onClick={() => {
                                  const newCourse = { ...course };
                                  newCourse.lessons.splice(
                                    getLessonIndex(i, j),
                                    1,
                                  );
                                  setCourse(newCourse);
                                }}
                              >
                                <DeleteIcon />
                              </button>
                            </div>
                          ) : (
                            <button
                              className="relative w-full h-full"
                              type="button"
                              onClick={() => {
                                const newCourse = { ...course };
                                newCourse.lessons.push({
                                  dayOfWeek: i,
                                  period: j,
                                  subjectId: null,
                                });
                                setCourse(newCourse);
                              }}
                            >
                              <div className="absolute inset-0 flex justify-center items-center">
                                <PlusIcon className="z-10" />
                              </div>
                            </button>
                          )}
                        </Draggable>
                      </Droppable>
                    )}
                  </div>
                </div>
              ))}
            </ScheduleColumn>
          ))}
        </div>
      </DndContext>
    </>
  );
}
