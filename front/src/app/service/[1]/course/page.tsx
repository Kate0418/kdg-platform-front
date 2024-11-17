"use client";

import { Course, CourseResponse } from "@/api/Course";
import { List } from "@/components/layout/List";
import { Pagination } from "@/components/layout/Pagination";
import { Title } from "@/components/layout/Title";
import { useEffect, useState, useCallback } from "react";

export default function Page() {
  const [courses, setCourses] = useState<CourseResponse["courses"]>();

  const [keyWord, setKeyWord] = useState("");
  const [pageCount, setPageCount] = useState(1);
  const [total, setTotal] = useState(0);

  const [loaderFlg, setLoaderFlg] = useState(false);

  const indexApi = useCallback(async () => {
    setLoaderFlg(true);
    const response = await Course({
      keyWord: keyWord,
      pageCount: pageCount,
    });
    if (response.success) {
      setCourses(response.courses);
      setTotal(response.total);
    }
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

  return (
    <>
      <Title title="コース情報管理ページ" />
      <List title="コース一覧" loaderFlg={loaderFlg} h={550}>
        <div className="flex justify-end items-center">
          <form onSubmit={handleSearch}>
            <label>検索ワード：</label>
            <input
              className="p-1 border border-[var(--text-color)]"
              name="keyWord"
              defaultValue={keyWord}
            />
            <button className="button !p-1 lg:!p-2" type="submit">
              検索
            </button>
          </form>
          <a className="a !p-1 lg:!p-2" href="/service/1/course/store">
            新規作成
          </a>
        </div>

        <table className="w-full">
          <thead>
            <tr className="border border-[var(--text-color)] bg-[var(--text-color)] text-[var(--base-color)]">
              <td className="border-r border-[var(--base-color)] p-1">
                コース名
              </td>
              <td className="border-r border-[var(--base-color)] p-1">学年</td>
              <td className="w-[50px] lg:w-[100px]"></td>
            </tr>
          </thead>
          <tbody>
            {Array.isArray(courses) &&
              courses.map((course, index) => (
                <tr key={index}>
                  <td className="border border-[var(--text-color)] p-2">
                    {course.name}
                  </td>
                  <td className="border border-[var(--text-color)] p-2">
                    {course.gradeName}
                  </td>
                  <td className="border border-[var(--text-color)] p-1 lg:p-3">
                    <a
                      className="p-1 lg:p-3 rounded-lg bg-[var(--accent-color)] text-[var(--base-color)]"
                      href=""
                    >
                      編集
                    </a>
                  </td>
                </tr>
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
