"use client";

import { Subject, SubjectResponse } from "@/api/Subject";
import { SubjectListTable } from "@/components/admin/subject/subjectListTable/subjectListTable";
import { List } from "@/components/layout/List";
import { Pagination } from "@/components/layout/Pagination";
import { Title } from "@/components/layout/Title";
import { useState, useEffect, useCallback } from "react";

export default function Page() {
  const [subjects, setSubjects] = useState<SubjectResponse["subjects"]>([]);

  const [keyWord, setKeyWord] = useState("");
  const [pageCount, setPageCount] = useState(1);
  const [total, setTotal] = useState(0);

  const [loaderFlg, setLoaderFlg] = useState(false);

  const indexApi = useCallback(async () => {
    setLoaderFlg(true);
    const response = await Subject({ keyWord: keyWord, pageCount: pageCount });
    if (response.success) {
      setSubjects(response.subjects);
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
      <Title title="科目情報管理" icon="subject" />
      <List title="科目一覧" loaderFlg={loaderFlg} h={550}>
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
          <a className="a !p-1 lg:!p-2" href="/service/1/subject/store">
            新規作成
          </a>
        </div>
        <SubjectListTable subjects={subjects} />
      </List>
      <Pagination
        total={total}
        pageCount={pageCount}
        setPageCount={setPageCount}
      />
    </>
  );
}
