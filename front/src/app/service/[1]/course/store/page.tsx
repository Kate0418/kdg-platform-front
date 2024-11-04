"use client";

import { SubjectSelect, SubjectSelectResponse } from "@/api/SubjectSelect";
import { GradeSelect, GradeSelectResponse } from "@/api/GradeSelect";
import { ScheduleColumn } from "@/components/course/ScheduleColumn";
import { Draggable } from "@/components/dnd-kit/Draggable";
import { Droppable } from "@/components/dnd-kit/Droppable";
import { A } from "@/components/layout/A";
import { Button } from "@/components/layout/Button";
import { List } from "@/components/layout/List";
import { Select } from "@/components/layout/Select";
import { Title } from "@/components/layout/Title";
import { daysOfWeek, SelectItem } from "@/config";
import { DndContext, DragEndEvent } from "@dnd-kit/core";
import Image from "next/image";
import { useEffect, useState } from "react";

interface Course {
  name: string | null;
  grade_id: number | null;
  times: Array<{ start: string; end: string }>;
  lessons: Array<{
    action: boolean;
    data: number | null;
  }>;
}

export default function Page() {
  const [grades, setGrades] = useState<GradeSelectResponse["grades"]>([]);
  const [subjects, setSubjects] = useState<SubjectSelectResponse["subjects"]>(
    [],
  );
  const [course, setCourse] = useState<Course>({
    name: null,
    grade_id: null,
    times: Array.from({ length: 12 }, () => ({ start: "", end: "" })),
    lessons: Array.from({ length: 7 * 12 }, () => ({
      action: false,
      data: null,
    })),
  });

  useEffect(() => {
    const selectApi = async () => {
      const subjectData = await SubjectSelect();
      setSubjects(subjectData.subjects);

      const gradeData = await GradeSelect();
      setGrades(gradeData.grades);
    };

    selectApi();
  }, []);

  const onDragEnd = (e: DragEndEvent) => {
    const activeId = Number(e.active.id);
    const overId = e.over ? Number(e.over.id) : null;

    if (overId !== null) {
      setCourse((prevCourse) => {
        const newCourse = {
          ...prevCourse,
          lessons: [...prevCourse.lessons],
        };
        newCourse.lessons[overId] = prevCourse.lessons[activeId]; // overIdにactiveIdのデータを設定
        newCourse.lessons[activeId] = prevCourse.lessons[overId]; // activeIdにoverIdのデータを設定
        return newCourse;
      });
    }
  };
  return (
    <>
      <Title title="コース登録ページ" />
      <List title="登録コース" h={520}>
        <div className="flex items-center pl-2 pb-2">
          <label>コース名：</label>
          <input className="p-1 border border-[var(--text-color)] rounded-lg" />
          <label className="pl-2">学年：</label>
          <Select
            className="w-32"
            options={grades}
            value={grades.find((grade) => grade.value === course.grade_id)}
            onChange={(newValue: unknown) => {
              const data = newValue as SelectItem;
              setCourse({
                ...course,
                grade_id: data.value,
              });
            }}
          />
        </div>
        <DndContext onDragEnd={onDragEnd}>
          <div className="grid lg:grid-cols-[1fr_2fr_2fr_2fr_2fr_2fr_2fr_2fr] gap-4">
            <ScheduleColumn head="時間">
              {Array.from({ length: 12 }).map((_, j) => (
                <div
                  key={j}
                  className="flex flex-col justify-center items-center border-b border-[var(--text-color)] h-20"
                >
                  <div className="w-full px-1">
                    <input type="time" />
                    <input type="time" />
                  </div>
                </div>
              ))}
            </ScheduleColumn>
            {Array.from({ length: 7 }).map((_, i) => (
              <ScheduleColumn head={daysOfWeek[i]} key={i}>
                {Array.from({ length: 12 }).map((_, j) => (
                  <div
                    key={j}
                    className="flex flex-col justify-center items-center border-b border-[var(--text-color)] h-20"
                  >
                    <div className="w-full px-1">
                      <Droppable id={`${i * 12 + j}`} key={`${i * 12 + j}`}>
                        <Draggable
                          id={`${i * 12 + j}`}
                          key={`${i * 12 + j}`}
                          lessonFlg={course.lessons[i * 12 + j].action}
                        >
                          {course.lessons[i * 12 + j].action ? (
                            <div className="w-full p-2 flex">
                              <Select
                                className="text-xs w-5/6 font-bold"
                                options={subjects}
                                value={subjects.find(
                                  (subject) =>
                                    subject.value ===
                                    course.lessons[i * 12 + j].data,
                                )}
                                onChange={(newValue: unknown) => {
                                  const data = newValue as SelectItem;
                                  const newCourse = { ...course };
                                  newCourse.lessons[i * 12 + j] = {
                                    ...newCourse.lessons[i * 12 + j],
                                    data: data.value,
                                  };
                                  setCourse(newCourse);
                                }}
                              />
                              <button
                                className="z-10"
                                type="button"
                                onClick={() => {
                                  const newCourse = { ...course };
                                  newCourse.lessons[i * 12 + j] = {
                                    action: false,
                                    data: null,
                                  };
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
                                newCourse.lessons[i * 12 + j] = {
                                  ...newCourse.lessons[i * 12 + j],
                                  action: true,
                                };
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
        <A href="/service/1/course">戻る</A>

        <div>
          <Button type="button">確認</Button>
        </div>
      </div>
    </>
  );
}
