import { CourseStoreProps } from "@/api/CourseStore";
import { GradeSelect, GradeSelectResponse } from "@/api/GradeSelect";
import { SubjectSelect, SubjectSelectResponse } from "@/api/SubjectSelect";
import { Select } from "@/components/layout/Select";
import { DayOfWeekKey, daysOfWeeks, SelectItem } from "@/config";
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

  const getPeriodIndex = (sequence: number) =>
    course.periods.findIndex((period) => period.sequence === sequence);
  const getLessonIndex = (dayOfWeekKey: string, sequence: number) =>
    course.periods[getPeriodIndex(sequence)].lessons.findIndex(
      (lesson) => lesson.dayOfWeek === dayOfWeekKey,
    );
  const getLessonFlg = (dayOfWeekKey: string, sequence: number) => {
    return course.periods[getPeriodIndex(sequence)]?.lessons.some(
      (lesson) => lesson.dayOfWeek === dayOfWeekKey,
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

      const activePeriodIndex = getPeriodIndex(activePeriodNumber);
      const overPeriodIndex = getPeriodIndex(overPeriodNumber);
      const activeLessonIndex = getLessonIndex(
        activeDayOfWeek,
        activePeriodNumber,
      );
      const overLessonIndex = getLessonIndex(overDayOfWeek, overPeriodNumber); // -1の場合がある

      const newCourse = structuredClone(course);
      const activeSubjectId =
        course.periods[activePeriodIndex].lessons[activeLessonIndex].subjectId;
      const overSubjectId =
        course.periods[overPeriodIndex].lessons[overLessonIndex]?.subjectId;

      if (overLessonIndex === -1) {
        newCourse.periods[overPeriodIndex].lessons.push({
          subjectId: activeSubjectId,
          dayOfWeek: overDayOfWeek as DayOfWeekKey,
        });
        newCourse.periods[activePeriodIndex].lessons.splice(
          activeLessonIndex,
          1,
        );
      } else {
        newCourse.periods[overPeriodIndex].lessons[overLessonIndex].subjectId =
          activeSubjectId;
        newCourse.periods[activePeriodIndex].lessons[
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
            {Array.from({ length: course.periods.length }, (_, i) => i + 1).map(
              (sequence) => (
                <div
                  key={sequence}
                  className="flex flex-col justify-center items-center border-b border-text-500 h-20"
                >
                  <div className="w-full flex flex-col gap-1 px-1">
                    <div className="flex gap-1 items-center">
                      <TimeIcon />
                      <TimePicker
                        className="w-16"
                        value={
                          course.periods[getPeriodIndex(sequence)]?.startTime
                        }
                        onChange={(time) => {
                          const newCourse = { ...course };
                          newCourse.periods[
                            getPeriodIndex(sequence)
                          ].startTime = time;
                          setCourse(newCourse);
                        }}
                        readOnly={modalFlg}
                      />
                    </div>
                    <div className="flex gap-1 items-center">
                      <TimeIcon />
                      <TimePicker
                        className="w-16"
                        value={
                          course.periods[getPeriodIndex(sequence)]?.endTime
                        }
                        onChange={(time) => {
                          const newCourse = { ...course };
                          newCourse.periods[getPeriodIndex(sequence)].endTime =
                            time;
                          setCourse(newCourse);
                        }}
                        readOnly={modalFlg}
                      />
                    </div>
                  </div>
                </div>
              ),
            )}
          </ScheduleColumn>
          {Object.entries(daysOfWeeks).map(
            ([daysOfWeekKey, daysOfWeekValue]) => (
              <ScheduleColumn head={daysOfWeekValue} key={daysOfWeekKey}>
                {Array.from(
                  { length: course.periods.length },
                  (_, i) => i + 1,
                ).map((sequence) => (
                  <div
                    key={sequence}
                    className="flex flex-col justify-center items-center border-b border-text-500 h-20"
                  >
                    <div className="w-full px-1">
                      {modalFlg ? (
                        <div className="flex justify-center overflow-y-auto max-h-[80px]">
                          {
                            subjects.find(
                              (subject) =>
                                subject.value ===
                                course.periods[getPeriodIndex(sequence)]
                                  .lessons[
                                  getLessonIndex(daysOfWeekKey, sequence)
                                ]?.subjectId,
                            )?.label
                          }
                        </div>
                      ) : (
                        <Droppable
                          id={`drop-${daysOfWeekKey}-${sequence}`}
                          key={sequence}
                        >
                          <Draggable
                            id={`drag-${daysOfWeekKey}-${sequence}`}
                            lessonFlg={getLessonFlg(daysOfWeekKey, sequence)}
                          >
                            {getLessonFlg(daysOfWeekKey, sequence) ? (
                              <div className="w-full p-2 flex">
                                <Select
                                  className="text-xs w-5/6 font-bold"
                                  options={subjects}
                                  value={
                                    subjects.find(
                                      (subject) =>
                                        subject.value ===
                                        course.periods[getPeriodIndex(sequence)]
                                          .lessons[
                                          getLessonIndex(
                                            daysOfWeekKey,
                                            sequence,
                                          )
                                        ]?.subjectId,
                                    ) ?? null
                                  }
                                  onChange={(e) => {
                                    const newCourse = { ...course };
                                    newCourse.periods[
                                      getPeriodIndex(sequence)
                                    ].lessons[
                                      getLessonIndex(daysOfWeekKey, sequence)
                                    ].subjectId = e?.value;
                                    setCourse(newCourse);
                                  }}
                                />
                                <button
                                  className="z-10"
                                  type="button"
                                  onClick={() => {
                                    const newCourse = { ...course };
                                    newCourse.periods[
                                      getPeriodIndex(sequence)
                                    ].lessons.splice(
                                      getLessonIndex(daysOfWeekKey, sequence),
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
                                  newCourse.periods[
                                    getPeriodIndex(sequence)
                                  ].lessons.push({
                                    dayOfWeek: daysOfWeekKey as DayOfWeekKey,
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
            ),
          )}
        </div>
      </DndContext>
    </>
  );
}
