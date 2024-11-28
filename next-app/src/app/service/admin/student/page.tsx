"use client";

import { Student, StudentResponse } from "@/api/Student";
import React from "react";
import { useState, useEffect, useCallback } from "react";
import { Title } from "@/components/layout/Title";
import { List } from "@/components/layout/List";
import Image from "next/image";
import { Pagination } from "@/components/layout/Pagination";

type StudentsWithZoom = StudentResponse["students"][number] & { zoom: boolean };

export default function Page() {
  const [keyWord, setKeyWord] = useState("");
  const [pageCount, setPageCount] = useState(1);
  const [students, setStudents] = useState<StudentsWithZoom[]>([]);
  const [loaderFlg, setLoaderFlg] = useState(false);
  const [total, setTotal] = useState(0);

  const indexApi = useCallback(async () => {
    setLoaderFlg(true);
    const response = await Student({ keyWord, pageCount });
    setStudents(
      response.students.map((student) => ({
        ...student,
        zoom: false,
      })),
    );
    setTotal(response.total);
    setLoaderFlg(false);
  }, [keyWord, pageCount]);

  useEffect(() => {
    indexApi();
  }, [indexApi]);

  const handleSearch = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const searchWord = formData.get("keyWord") as string;
    setKeyWord(searchWord);
  };

  const setZoom = (id: number) => {
    setStudents((students) =>
      students.map((student) =>
        student.id === id ? { ...student, zoom: !student.zoom } : student,
      ),
    );
  };

  return (
    <>
      <Title title="生徒情報管理" icon="student" />
      <div className="flex"></div>
      <List title="生徒一覧" h={550} loaderFlg={loaderFlg}>
        <div className="flex justify-end items-center">
          <form onSubmit={handleSearch}>
            <label>検索ワード：</label>
            <input
              className="p-1 border border-text"
              name="keyWord"
              defaultValue={keyWord}
            />
            <button className="button !p-1 lg:!p-2" type="submit">
              検索
            </button>
          </form>
          <a className="a !p-1 lg:!p-2" href="/service/admin/student/store">
            新規作成
          </a>
        </div>
        <table className="w-full mb-16">
          <thead>
            <tr className="border border-text bg-text text-base">
              <td className="border-r border-base p-1">名前</td>
              <td className="border-r border-base p-1">メールアドレス</td>
              <td className="w-[50px] lg:w-[100px]"></td>
            </tr>
          </thead>
          <tbody>
            {students.map((student) => (
              <React.Fragment key={student.id}>
                <tr>
                  <td className="border border-text lg:p-2">{student.name}</td>
                  <td className="border border-text lg:p-2">{student.email}</td>
                  <td className="border border-text lg:p-2">
                    <button
                      type="button"
                      onClick={() => {
                        setZoom(student.id);
                      }}
                    >
                      <Image
                        className="lg:w-8"
                        src={
                          student.zoom
                            ? "/img/zoom_out.svg"
                            : "/img/zoom_in.svg"
                        }
                        alt="zoom"
                        width={24}
                        height={24}
                      />
                    </button>
                  </td>
                </tr>
                {student.zoom && (
                  <tr>
                    <td className="border border-text" colSpan={2}>
                      <div className="grid lg:grid-cols-[5fr_3fr_3fr_auto]">
                        <div className="flex">
                          <div className="w-16 bg-text text-base text-center p-1 lg:py-3">
                            コース
                          </div>
                          <div className="flex items-center py-1 px-6">
                            {student.courseName}
                          </div>
                        </div>
                        <div className="flex">
                          <div className="w-14 bg-text text-base text-center p-1 lg:py-3">
                            年次
                          </div>
                          <div className="flex items-center py-1 px-6">
                            {student.gradeName}
                          </div>
                        </div>
                        <div className="flex">
                          <div className="w-14 bg-text text-base text-center p-1 lg:py-3">
                            年制
                          </div>
                          <div className="flex items-center py-1 px-6">
                            {student.yearName}
                          </div>
                        </div>
                      </div>
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
                )}
              </React.Fragment>
            ))}
          </tbody>
        </table>
      </List>
      <Pagination
        total={total}
        pageCount={pageCount}
        setPageCount={setPageCount}
      />
    </>
  );
}
