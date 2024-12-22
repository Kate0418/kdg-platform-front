"use client";

import { Course, CourseResponse } from "@/api/Course";
import { CourseListTable } from "@/components/service/admin/course/courseListTable/courseListTable";
import { List } from "@/components/layout/List";
import { Pagination } from "@/components/layout/Pagination";
import { Title } from "@/components/layout/Title";
import { useEffect, useState, useCallback } from "react";
import { EditToolbar } from "@/components/layout/editToolbar/editToolbar";
import { Loader } from "@/components/layout/Loader";
import { Token } from "@/api/Token";
import { useRouter } from "next/navigation";
import { CourseDestroy } from "@/api/CourseDestroy";

export default function Page() {
  const [courses, setCourses] = useState<CourseResponse["courses"]>([]);
  const [courseIds, setCourseIds] = useState<CourseResponse["courseIds"]>([]);

  const [keyWord, setKeyWord] = useState("");
  const [pageCount, setPageCount] = useState(1);
  const [total, setTotal] = useState(0);
  const [checkIds, setCheckIds] = useState<number[]>([]);

  const [loaderFlg, setLoaderFlg] = useState(false);
  const [updateFlg, setUpdateFlg] = useState(false);
  const router = useRouter();

  const indexApi = useCallback(async () => {
    setLoaderFlg(true);
    const response = await Course({
      keyWord: keyWord,
      pageCount: pageCount,
    });
    if (response.success) {
      setCourses(response.courses);
      setCourseIds(response.courseIds);
      setTotal(response.total);
    }
    setLoaderFlg(false);
  }, [keyWord, pageCount]);

  useEffect(() => {
    indexApi();
  }, [indexApi]);

  const destroyApi = async () => {
    setUpdateFlg(true);
    const token = await Token();
    if (!token.success) {
      router.push("/site/login");
      setUpdateFlg(false);
    }

    const response = await CourseDestroy({ courseIds: checkIds });
    alert(response.message);
    setCheckIds([]);
    setUpdateFlg(false);
    indexApi();
  };

  const handleSearch = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const searchWord = formData.get("keyWord") as string;
    setKeyWord(searchWord);
    setCheckIds([]);
  };

  if (updateFlg) return <Loader />;

  return (
    <>
      <Title title="コース情報管理" icon="course" />
      <List title="コース一覧" loaderFlg={loaderFlg} h={550}>
        <div className="flex justify-end items-center">
          <form onSubmit={handleSearch}>
            <label>検索ワード：</label>
            <input
              className="p-1 border border-text-800"
              name="keyWord"
              defaultValue={keyWord}
            />
            <button className="button !p-1 lg:!p-2" type="submit">
              検索
            </button>
          </form>
          <a className="a !p-1 lg:!p-2" href="/service/admin/course/store">
            新規作成
          </a>
        </div>

        <CourseListTable
          courses={courses}
          checkIds={checkIds}
          setCheckIds={setCheckIds}
          courseIds={courseIds}
        />
      </List>
      <Pagination
        total={total}
        pageCount={pageCount}
        setPageCount={setPageCount}
      />

      <EditToolbar
        isShow={checkIds.length !== 0}
        isHiddenEdit={true}
        onClickEdit={() => console.log()}
        onClickDelete={() => destroyApi()}
      />
    </>
  );
}
