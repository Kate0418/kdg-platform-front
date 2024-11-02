"use client";

import { Response, SubjectSelect } from "@/api/SubjectSelect";
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

type Lessons = {
  [key: number]: {
    data: {
      value: number | null;
      label: string | null;
    } | null;
  };
};

export default function Page() {
  const [subjects, setSubjects] = useState<Response["subjects"]>([]);
  const [lessons, setLessons] = useState<Lessons>(() => {
    const lessons: Lessons = {};
    for (let i = 0; i < 7 * 12; i++) {
      lessons[i] = { data: null };
    }
    return lessons;
  });

  useEffect(() => {
    //セレクトボックスの取得
    const selectApi = async () => {
      const data = await SubjectSelect();
      setSubjects(data.subjects);
    };

    selectApi();
  }, []);

  const onDragEnd = (e: DragEndEvent) => {
    const activeId = Number(e.active.id);
    const overId = e.over ? Number(e.over.id) : null;

    if (overId !== null) {
      setLessons((prevLessons) => {
        const newLessons = { ...prevLessons };
        newLessons[overId] = { ...prevLessons[activeId] }; // overIdにactiveIdのデータを設定
        newLessons[activeId] = { ...prevLessons[overId] }; // activeIdにoverIdのデータを設定
        return newLessons;
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
                          lessonFlg={lessons[i * 12 + j].data}
                        >
                          {lessons[i * 12 + j].data ? (
                            <div className="w-full p-2 flex">
                              <Select
                                className="text-xs w-5/6 font-bold"
                                options={subjects}
                                value={lessons[i * 12 + j].data}
                                onChange={(newValue: unknown) => {
                                  const data = newValue as SelectItem;
                                  setLessons({
                                    ...lessons,
                                    [i * 12 + j]: {
                                      data: data,
                                    },
                                  });
                                }}
                              />
                              <button
                                className="z-10"
                                type="button"
                                onClick={() => {
                                  setLessons({
                                    ...lessons,
                                    [i * 12 + j]: {
                                      data: null,
                                    },
                                  });
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
                                setLessons({
                                  ...lessons,
                                  [i * 12 + j]: {
                                    data: {
                                      value: null,
                                      label: null,
                                    },
                                  },
                                });
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
