"use client";

import React from "react";
import { useState, useEffect, useCallback } from "react";
import { Title } from "@/components/layout/Title";
import { List } from "@/components/layout/List";
import { Teacher, TeacherResponse } from "@/api/Teacher";
import { Pagination } from "@/components/layout/Pagination";
import { TeacherListTable } from "@/components/service/admin/teacher/teacherListTable/teacherListTable";
import { WithZoom } from "@/config";

type TeachersWithZoom = WithZoom<TeacherResponse["teachers"][number]>;

export default function Page() {
  const [keyWord, setKeyWord] = useState("");
  const [pageCount, setPageCount] = useState(1);
  const [teachers, setTeachers] = useState<TeachersWithZoom[]>([]);
  const [loaderFlg, setLoaderFlg] = useState(false);
  const [total, setTotal] = useState(0);

  const indexApi = useCallback(async () => {
    setLoaderFlg(true);
    const response = await Teacher({ keyWord, pageCount });
    setTeachers(
      response.teachers.map((teacher) => ({
        ...teacher,
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

  const setZoom = (id: TeachersWithZoom["id"]) => {
    setTeachers((rows) =>
      rows.map((row) => (row.id === id ? { ...row, zoom: !row.zoom } : row)),
    );
  };

  return (
    <>
      <Title title="講師情報管理" icon="teacher" />
      <List title="講師一覧" h={520} loaderFlg={loaderFlg}>
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
          <a className="a !p-1 lg:!p-2" href="/service/admin/teacher/store">
            新規作成
          </a>
        </div>
        <TeacherListTable teachers={teachers} setZoom={setZoom} />
      </List>
      <Pagination
        total={total}
        pageCount={pageCount}
        setPageCount={setPageCount}
      />
    </>
  );
}
