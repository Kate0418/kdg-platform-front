import { CourseStoreProps } from "@/api/CourseStore";
import { GradeSelectResponse } from "@/api/GradeSelect";
import { SubjectSelectResponse } from "@/api/SubjectSelect";
import { Select } from "@/components/layout/Select";
import { daysOfWeek, SelectItem } from "@/config";
import { DndContext, DragEndEvent } from "@dnd-kit/core"; //ライブラリ
import { ScheduleColumn } from "../scheduleColumn/scheduleColumn";
import { Droppable } from "../droppable/droppable";
import { Draggable } from "../draggable/draggable";
import Image from "next/image";
import { TimePicker } from "../timePicker/timePicker";

export interface CourseFormTableProps {
  course: CourseStoreProps["course"];
  setCourse: React.Dispatch<React.SetStateAction<CourseStoreProps["course"]>>;
  select: {
    grades: GradeSelectResponse["grades"];
    subjects: SubjectSelectResponse["subjects"];
  };
  modalFlg?: boolean;
}

export function CourseFormTable({
  course,
  setCourse,
  select,
  modalFlg = false,
}: CourseFormTableProps) {
  const period = 12;

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
          options={select.grades}
          value={select.grades.find((grade) => grade.value === course.gradeId)}
          onChange={(e: SelectItem) => {
            setCourse({
              ...course,
              gradeId: e.value,
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
                <div className="w-full px-1 flex flex-col gap-1">
                  <div className="flex gap-1">
                    <Image
                      src="/img/time.svg"
                      alt="time"
                      width={20}
                      height={20}
                    />
                    <TimePicker
                      value={course.times[j].startTime}
                      onChange={(time) => {
                        if (time) {
                          const newCourse = { ...course };
                          newCourse.times[j].startTime = time;
                          setCourse(newCourse);
                          console.log(newCourse);
                        }
                      }}
                      readOnly={modalFlg}
                    />
                  </div>
                  <div className="flex gap-1">
                    <Image
                      src="/img/time.svg"
                      alt="time"
                      width={20}
                      height={20}
                    />
                    <TimePicker
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
                          select.subjects.find(
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
                                options={select.subjects}
                                value={(() => {
                                  const lessonIndex = getLessonIndex(i, j);
                                  const subjectId =
                                    course.lessons[lessonIndex]?.subjectId;
                                  return (
                                    select.subjects.find(
                                      (subject) => subject.value === subjectId,
                                    ) || null
                                  );
                                })()}
                                onChange={(newValue: unknown) => {
                                  const data = newValue as SelectItem;
                                  const newCourse = { ...course };
                                  newCourse.lessons[getLessonIndex(i, j)] = {
                                    ...newCourse.lessons[getLessonIndex(i, j)],
                                    subjectId: data.value,
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
                                <Image
                                  src="/img/delete.svg"
                                  alt="delete"
                                  width={24}
                                  height={24}
                                />
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
                                <Image
                                  className="z-10"
                                  src="/img/plus.svg"
                                  alt="plus"
                                  width={24}
                                  height={24}
                                />
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
