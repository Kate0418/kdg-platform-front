"use client";

import { Subject, SubjectResponse } from "@/api/Subject";
import { SubjectListTable } from "@/components/service/admin/subject/subjectListTable/subjectListTable";
import { List } from "@/components/layout/List";
import { Pagination } from "@/components/layout/Pagination";
import { Title } from "@/components/layout/Title";
import { useState, useEffect, useCallback } from "react";
import { Modal } from "@/components/layout/Modal";
import { SubjectUpdateModalTable } from "@/components/service/admin/subject/subjectUpdateModalTable/subjectUpdateModalTable";
import { UpdateController } from "@/components/layout/updateController/updateController";
import { Token } from "@/api/Token";
import { useRouter } from "next/navigation";
import { SubjectUpdate, SubjectUpdateProps } from "@/api/SubjectUpdate";
import { Loader } from "@/components/layout/Loader";
import { EditToolbar } from "@/components/layout/editToolbar/editToolbar";
import { SubjectDestroy } from "@/api/SubjectDestroy";

export default function Page() {
  const [subjects, setSubjects] = useState<SubjectResponse["subjects"]>([]);
  const [subjectIds, setSubjectIds] = useState<SubjectResponse["subjectIds"]>(
    []
  );

  const [keyWord, setKeyWord] = useState("");
  const [pageCount, setPageCount] = useState(1);
  const [total, setTotal] = useState(0);

  const [checkIds, setCheckIds] = useState<number[]>([]);

  const [loaderFlg, setLoaderFlg] = useState(false);
  const [updateModalFlg, setUpdateModalFlg] = useState(false);
  const [updateSubject, setUpdateSubject] = useState<
    SubjectUpdateProps["subjects"][number]
  >({ id: 0, name: "", teacherId: null });
  const [updateFlg, setUpdateFlg] = useState(false);

  const router = useRouter();

  const indexApi = useCallback(async () => {
    setLoaderFlg(true);
    const response = await Subject({ keyWord: keyWord, pageCount: pageCount });
    if (response.success) {
      setSubjects(response.subjects);
      setSubjectIds(response.subjectIds);
      setTotal(response.total);
    }
    setLoaderFlg(false);
  }, [keyWord, pageCount]);

  const updateApi = async () => {
    setUpdateFlg(true);
    const token = await Token();
    if (!token.success) {
      router.push("/site/login");
      setUpdateFlg(false);
    }

    const response = await SubjectUpdate({ subjects: [updateSubject] });
    alert(response.message);
    setUpdateFlg(false);
    indexApi();
  };

  const destroyApi = async() => {
    setUpdateFlg(true);
    const token = await Token();
    if (!token.success) {
      router.push("/site/login");
      setUpdateFlg(false);
    }

    const response = await SubjectDestroy({ subjectIds: checkIds});
    alert(response.message);
    setCheckIds([]);
    setUpdateFlg(false);
    indexApi();
  }

  useEffect(() => {
    indexApi();
  }, [indexApi]);

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
          <a className="a !p-1 lg:!p-2" href="/service/admin/subject/store">
            新規作成
          </a>
        </div>
        <SubjectListTable
          subjects={subjects}
          checkIds={checkIds}
          setCheckIds={setCheckIds}
          subjectIds={subjectIds}
          setUpdateSubject={setUpdateSubject}
          setUpdateModalFlg={setUpdateModalFlg}
        />
      </List>
      <Pagination
        total={total}
        pageCount={pageCount}
        setPageCount={setPageCount}
      />

      <Modal
        className="!w-96 !h-64"
        modalFlg={updateModalFlg}
        setModalFlg={setUpdateModalFlg}
      >
        <div className="flex flex-col gap-4">
          <SubjectUpdateModalTable
            updateSubject={updateSubject}
            setUpdateSubject={setUpdateSubject}
          />
          <UpdateController
            setModalFlg={setUpdateModalFlg}
            updateOnClick={() => {
              console.log(updateSubject);
              updateApi();
            }}
          />
        </div>
      </Modal>

      <EditToolbar
        isShow={checkIds.length !== 0}
        onClickEdit={() => console.log()}
        onClickDelete={() => destroyApi()}
      />
    </>
  );
}
