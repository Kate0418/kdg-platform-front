import { CourseStoreProps } from "@/api/CourseStore";
import { GradeSelect, GradeSelectResponse } from "@/api/GradeSelect";
import { SubjectSelect, SubjectSelectResponse } from "@/api/SubjectSelect";
import { Select } from "@/components/layout/Select";
import { DayOfWeekKey, daysOfWeek, SelectItem } from "@/config";
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

  useEffect(() => {
    const selectApi = async () => {
      const subjectData = await SubjectSelect();
      setSubjects(subjectData.subjects);

      const gradeData = await GradeSelect();
      setGrades(gradeData.grades);
    };

    selectApi();
  }, []);

  const getLessonIndex = (key: string, index: number) => {
    return course.periods[index].lessons.findIndex(
      (lesson) => lesson.dayOfWeek === key,
    );
  };
  const getLessonFlg = (key: string, index: number) => {
    return course.periods[index].lessons.some(
      (lesson) => lesson.dayOfWeek === key,
    );
  };

  const onDragEnd = (e: DragEndEvent) => {
    const activeId = e.active.id;
    const overId = e.over ? e.over.id : null;

    if (overId !== null) {
      const [, activeDayOfWeek, activePeriod] = String(activeId).split("-");
      const [, overDayOfWeek, overPeriod] = String(overId).split("-");
      const activePeriodNumber = Number(activePeriod);
      const overPeriodNumber = Number(overPeriod);
      const activeLessonIndex = getLessonIndex(
        activeDayOfWeek,
        activePeriodNumber,
      );
      const overLessonIndex = getLessonIndex(overDayOfWeek, overPeriodNumber); // -1の場合がある

      const newCourse = { ...course };
      const activeSubjectId = { ...course }.periods[activePeriodNumber].lessons[
        activeLessonIndex
      ].subjectId;
      const overSubjectId = { ...course }.periods[overPeriodNumber].lessons[
        overLessonIndex
      ]?.subjectId;

      if (overLessonIndex === -1) {
        newCourse.periods[overPeriodNumber].lessons.push({
          subjectId: activeSubjectId,
          dayOfWeek: activeDayOfWeek as DayOfWeekKey,
        });
        newCourse.periods[activePeriodNumber].lessons.splice(
          activeLessonIndex,
          1,
        );
      } else {
        newCourse.periods[overPeriodNumber].lessons[overLessonIndex].subjectId =
          activeSubjectId;
        newCourse.periods[activePeriodNumber].lessons[
          activeLessonIndex
        ].subjectId = overSubjectId;
      }

      setCourse(newCourse);
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
            {course.periods.map((period, index) => (
              <div
                key={index}
                className="flex flex-col justify-center items-center border-b border-text-500 h-20"
              >
                <div className="w-full flex flex-col gap-1 px-1">
                  <div className="flex gap-1 items-center">
                    <TimeIcon />
                    <TimePicker
                      className="w-16"
                      value={period.startTime}
                      onChange={(time) => {
                        if (time) {
                          const newCourse = { ...course };
                          newCourse.periods[index].startTime = time;
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
                      value={course.periods[index].endTime}
                      onChange={(time) => {
                        const newCourse = { ...course };
                        newCourse.periods[index].endTime = time;
                        setCourse(newCourse);
                      }}
                      readOnly={modalFlg}
                    />
                  </div>
                </div>
              </div>
            ))}
          </ScheduleColumn>
          {Object.entries(daysOfWeek).map(([key, value]) => (
            <ScheduleColumn head={value} key={key}>
              {course.periods.map((period, index) => (
                <div
                  key={index}
                  className="flex flex-col justify-center items-center border-b border-text-500 h-20"
                >
                  <div className="w-full px-1">
                    {modalFlg ? (
                      <div className="flex justify-center overflow-y-auto max-h-[80px]">
                        {
                          subjects.find(
                            (subject) =>
                              subject.value ===
                              period.lessons[getLessonIndex(key, index)]
                                ?.subjectId,
                          )?.label
                        }
                      </div>
                    ) : (
                      <Droppable id={`drop-${key}-${index}`} key={index}>
                        <Draggable
                          id={`drag-${key}-${index}`}
                          lessonFlg={getLessonFlg(key, index)}
                        >
                          {getLessonFlg(key, index) ? (
                            <div className="w-full p-2 flex">
                              <Select
                                className="text-xs w-5/6 font-bold"
                                options={subjects}
                                value={subjects.find(
                                  (subject) =>
                                    subject.value ===
                                    period.lessons[getLessonIndex(key, index)]
                                      ?.subjectId,
                                )}
                                onChange={(e) => {
                                  const newCourse = { ...course };
                                  newCourse.periods[index].lessons[
                                    getLessonIndex(key, index)
                                  ].subjectId = e?.value;
                                  setCourse(newCourse);
                                }}
                              />
                              <button
                                className="z-10"
                                type="button"
                                onClick={() => {
                                  const newCourse = { ...course };
                                  newCourse.periods[index].lessons.splice(
                                    getLessonIndex(key, index),
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
                                newCourse.periods[index].lessons.push({
                                  dayOfWeek: key as DayOfWeekKey,
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
