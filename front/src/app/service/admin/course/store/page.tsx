"use client";

import { CourseStore, CourseStoreProps } from "@/api/CourseStore";
import { GradeSelect, GradeSelectResponse } from "@/api/GradeSelect";
import { SubjectSelect, SubjectSelectResponse } from "@/api/SubjectSelect";
import { ScheduleColumn } from "@/components/course/ScheduleColumn";
import { Draggable } from "@/components/dnd-kit/Draggable";
import { Droppable } from "@/components/dnd-kit/Droppable";
import { List } from "@/components/layout/List";
import { Modal } from "@/components/layout/Modal";
import { Select } from "@/components/layout/Select";
import { Title } from "@/components/layout/Title";
import { daysOfWeek, SelectItem } from "@/config";
import { DndContext, DragEndEvent } from "@dnd-kit/core";
import Image from "next/image";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Token } from "@/api/Token";
import { Loader } from "@/components/layout/Loader";

export default function Page() {
  const period = 12;
  const [grades, setGrades] = useState<GradeSelectResponse["grades"]>([]);
  const [subjects, setSubjects] = useState<SubjectSelectResponse["subjects"]>(
    [],
  );
  const [course, setCourse] = useState<CourseStoreProps["course"]>({
    name: null,
    gradeId: null,
    times: Array.from({ length: period }, (_, index) => ({
      period: index,
      startTime: "",
      endTime: "",
    })),
    lessons: [],
  });
  const [modalFlg, setModalFlg] = useState(false);
  const [loaderFlg, setLoaderFlg] = useState(false);
  const router = useRouter();

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

  const storeApi = async () => {
    setLoaderFlg(true);
    const token = await Token();
    if (!token.success) {
      router.push("/site/login");
      setLoaderFlg(false);
    }

    const storeCourse = {
      ...course,
      times: course.times.filter((time) => time.startTime && time.endTime),
    };
    const subjectAdd = await CourseStore({ course: storeCourse });
    alert(subjectAdd.message);
    if (subjectAdd.success) {
      router.push("/service/admin/course");
    } else {
      setLoaderFlg(false);
    }
  };

  if (loaderFlg) return <Loader />;

  return (
    <>
      <Title title="コース登録" icon="course" />
      <List title="登録コース" h={520}>
        <div className="flex items-center pl-2 pb-2">
          <label>コース名：</label>
          <input
            className="p-1 border border-text rounded-lg"
            onChange={(e) => setCourse({ ...course, name: e.target.value })}
          />
          <label className="pl-2">学年：</label>
          <Select
            className="w-32 border border-text rounded-lg px-2"
            options={grades}
            value={grades.find((grade) => grade.value === course.gradeId)}
            onChange={(e: SelectItem) => {
              setCourse({
                ...course,
                gradeId: e.value,
              });
            }}
          />
        </div>
        <DndContext onDragEnd={onDragEnd}>
          <div className="grid lg:grid-cols-[1fr_2fr_2fr_2fr_2fr_2fr_2fr_2fr] gap-4">
            <ScheduleColumn head="時間">
              {Array.from({ length: period }).map((_, j) => (
                <div
                  key={j}
                  className="flex flex-col justify-center items-center border-b border-text h-20"
                >
                  <div className="w-full px-1">
                    <input
                      type="time"
                      onChange={(e) => {
                        const newCourse = { ...course };
                        newCourse.times[j].startTime = e.target.value;
                        setCourse(newCourse);
                      }}
                    />
                    <input
                      type="time"
                      onChange={(e) => {
                        const newCourse = { ...course };
                        newCourse.times[j].endTime = e.target.value;
                        setCourse(newCourse);
                      }}
                    />
                  </div>
                </div>
              ))}
            </ScheduleColumn>
            {Array.from({ length: 7 }).map((_, i) => (
              <ScheduleColumn head={daysOfWeek[i]} key={i}>
                {Array.from({ length: period }).map((_, j) => (
                  <div
                    key={j}
                    className="flex flex-col justify-center items-center border-b border-text h-20"
                  >
                    <div className="w-full px-1">
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
                    </div>
                  </div>
                ))}
              </ScheduleColumn>
            ))}
          </div>
        </DndContext>
      </List>
      <div className="flex justify-between w-full">
        <a className="a" href="/service/admin/course">
          キャンセル
        </a>

        <div>
          <button
            className="button"
            type="button"
            onClick={() => {
              if (!course.name || !course.gradeId) {
                alert("コース名,学年が入力されていません");
                return;
              }
              for (let i = 0; i < 7; i++) {
                for (let j = 0; j < period; j++) {
                  if (course.times[j].startTime && course.times[j].endTime) {
                    break;
                  } else if (
                    course.lessons.some((lesson) => lesson.period === j)
                  ) {
                    alert("時間が入力されていません");
                    return;
                  }
                }
              }

              setModalFlg(true);
            }}
          >
            確認
          </button>
        </div>
      </div>

      <Modal modalFlg={modalFlg} setModalFlg={setModalFlg}>
        <div className="w-full pl-2 pb-2">
          コース名: {course.name}
          <br />
          学年: {grades.find((grade) => grade.value === course.gradeId)?.label}
        </div>

        <div className="w-full grid lg:grid-cols-[1fr_2fr_2fr_2fr_2fr_2fr_2fr_2fr] gap-4">
          <ScheduleColumn head="時間">
            {Array.from({ length: period }).map((_, j) => (
              <div
                key={j}
                className="flex flex-col justify-center items-center border-b border-text h-20"
              >
                {course.times[j].startTime && course.times[j].endTime && (
                  <div className="w-full px-1 text-center">
                    {course.times[j].startTime}
                    <br />
                    ︙
                    <br />
                    {course.times[j].endTime}
                  </div>
                )}
              </div>
            ))}
          </ScheduleColumn>
          {Array.from({ length: 7 }).map((_, i) => (
            <ScheduleColumn head={daysOfWeek[i]} key={i}>
              {Array.from({ length: period }).map((_, j) => (
                <div
                  key={j}
                  className={`flex flex-col justify-center items-center border-b border-text h-20 overflow-y-auto
                    ${
                      (!getLessonFlg(i, j) ||
                        !course.lessons[getLessonIndex(i, j)]?.subjectId) &&
                      "bg-[var(--text-color-60)]"
                    }`}
                >
                  <div className="w-full p-2 flex">
                    {
                      subjects.find(
                        (subject) =>
                          subject.value ===
                          course.lessons[getLessonIndex(i, j)]?.subjectId,
                      )?.label
                    }
                  </div>
                </div>
              ))}
            </ScheduleColumn>
          ))}
        </div>
        <div className="flex justify-end w-full">
          <button
            className="button"
            type="button"
            onClick={() => {
              setModalFlg(false);
            }}
          >
            戻る
          </button>
          <button
            className="button"
            type="button"
            onClick={() => {
              storeApi();
            }}
          >
            登録
          </button>
        </div>
      </Modal>
    </>
  );
}
