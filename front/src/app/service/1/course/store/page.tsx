"use client";

import { List } from "@/components/layout/List";
import { Title } from "@/components/layout/Title";
import { useState, useEffect } from 'react'
import { DndContext, DragEndEvent } from '@dnd-kit/core';
import { Draggable } from "@/components/dnd-kit/Draggable";
import { Droppable } from '@/components/dnd-kit/Droppable';
import { SubjectSelect, Response } from "@/api/SubjectSelect";
import { Select } from "@/components/layout/Select";
import { daysOfWeek } from "@/config";

type Lessons = {
    [key: number]: {
        data: {
            value: number | null,
            label: string | null,
        } | null
    }
};

export default function() {
    const [lesson, setLesson] = useState<{
        value: number,
        label: string,
    } | null>(null);

    const [editIndex, setEditIndex] = useState(0);
    const [modalFlg, setModalFlg] = useState(false);
    const [subjects, setSubjects] = useState<Response["subjects"]>([]);
    const [lessons, setLessons] = useState<Lessons>(() => {
        const lessons: Lessons = {};
        for (let i = 0; i < 7 * 12; i++) {
            lessons[i] = { data: null };
        }
        return lessons;
    });

    useEffect(() => { //セレクトボックスの取得
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
    }
    return (
        <>
            <Title title="コース登録ページ" />
            <List title="登録コース" h={520}>
                <DndContext onDragEnd={onDragEnd}>
                        <div className="grid grid-cols-[1fr_2fr_2fr_2fr_2fr_2fr_2fr_2fr]">
                            <div></div>
                            {Array.from({ length: 7 }).map((_, i) => (
                                <div className="flex flex-col border border-[var(--text-color)] m-2 rounded-xl" key={`${i}`}>
                                    <div className="bg-[var(--text-color)] text-[var(--base-color)] rounded-t-lg text-center h-6">{daysOfWeek[i]}</div>
                                    {Array.from({ length: 12 }).map((_, j) => (
                                        <Droppable id={`${i * 12 + j}`} key={`${i * 12 + j}`}>
                                            <Draggable id={`${ i * 12 + j}`} key={`${ i * 12 + j}`} lessonFlg={lessons[i * 12 + j].data}>
                                                {
                                                    lessons[i * 12 + j].data
                                                        ? <div className="w-full p-2 flex">
                                                            <Select
                                                                className="text-xs w-5/6 font-bold"
                                                                options={subjects}
                                                                value={lessons[i * 12 + j].data}
                                                                onChange={(e: any) => {
                                                                    setLessons({
                                                                        ...lessons,
                                                                        [i * 12 + j]: {
                                                                            data: e
                                                                        }
                                                                    });
                                                                }}
                                                            />
                                                            <button className="z-10" type="button" onClick={() => {
                                                                setLessons({
                                                                    ...lessons,
                                                                    [i * 12 + j]: {
                                                                        data: null
                                                                    }
                                                                });
                                                            }}>
                                                                <img src="/img/delete.svg" />
                                                            </button>
                                                        </div>
                                                        :
                                                        <button className="w-full h-full" type="button" onClick={() => {
                                                                setLessons({
                                                                    ...lessons,
                                                                    [i * 12 + j]: {
                                                                        data: {
                                                                            value: null,
                                                                            label: null,
                                                                        }
                                                                    }
                                                                });
                                                            }}>
                                                                <div className="w-full h-full bg-[var(--text-color-60)] rounded-lg flex justify-center items-center">
                                                                    <img src="/img/plus.svg" />
                                                                </div>
                                                            </button>
                                                }
                                            </Draggable>
                                        </Droppable>
                                    ))}
                                    <div className="bg-[var(--text-color)] rounded-b-lg text-center h-6" />
                                </div>
                            ))}
                        </div>
                </DndContext>
            </List>
        </>
    )
}