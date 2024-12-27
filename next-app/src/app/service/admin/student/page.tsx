"use client";

import { Student, StudentResponse } from "@/api/Student";
import React from "react";
import { useState, useEffect, useCallback } from "react";
import { Title } from "@/components/layout/Title";
import { List } from "@/components/layout/List";
import { Pagination } from "@/components/layout/pagination/pagination";
import { StudentListTable } from "@/components/service/admin/student/studentListTable/studentListTable";
import { StudentUpdate, StudentUpdateProps } from "@/api/StudentUpdate";
import { Loader } from "@/components/layout/Loader";
import { Modal } from "@/components/layout/Modal";
import { StudentUpdateModalTable } from "@/components/service/admin/student/studentUpdateModalTable/studentUpdateModalTable";
import { UpdateController } from "@/components/layout/updateController/updateController";
import { Token } from "@/api/Token";
import { useRouter } from "next/navigation";
import { EditToolbar } from "@/components/layout/editToolbar/editToolbar";
import { StudentDestroy } from "@/api/StudentDestroy";
import { Button } from "@/components/layout/button/button";
import { Checkbox } from "@/components/layout/checkbox/checkbox";

type StudentsWithZoom = StudentResponse["students"][number] & { zoom: boolean };

export default function Page() {
  const [keyWord, setKeyWord] = useState("");
  const [pageCount, setPageCount] = useState(1);
  const [students, setStudents] = useState<StudentsWithZoom[]>([]);
  const [loaderFlg, setLoaderFlg] = useState(false);
  const [total, setTotal] = useState(0);
  const [studentIds, setStudentIds] = useState<StudentResponse["studentIds"]>(
    [],
  );
  const [checkIds, setCheckIds] = useState<number[]>([]);
  const [updateModalFlg, setUpdateModalFlg] = useState(false);
  const [updateStudent, setUpdateStudent] = useState<
    StudentUpdateProps["students"][number]
  >({
    id: 0,
    name: "",
    email: "",
    courseId: null,
    gradeId: null,
    yearId: null,
  });
  const [updateFlg, setUpdateFlg] = useState(false);
  const router = useRouter();

  const indexApi = useCallback(async () => {
    setLoaderFlg(true);
    const response = await Student({ keyWord, pageCount });
    setStudents(
      response.students.map((student) => ({
        ...student,
        zoom: false,
      })),
    );
    setStudentIds(response.studentIds);
    setTotal(response.total);
    setLoaderFlg(false);
  }, [keyWord, pageCount]);

  useEffect(() => {
    indexApi();
  }, [indexApi]);

  const updateApi = async () => {
    setUpdateFlg(true);
    const token = await Token();
    if (!token.success) {
      router.push("/site/login");
      setUpdateFlg(false);
    }

    const response = await StudentUpdate({ students: [updateStudent] });
    alert(response.message);
    setUpdateModalFlg(false);
    setUpdateFlg(false);
    indexApi();
  };

  const destroyApi = async () => {
    setUpdateFlg(true);
    const token = await Token();
    if (!token.success) {
      router.push("/site/login");
      setUpdateFlg(false);
    }

    const response = await StudentDestroy({ studentIds: checkIds });
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
  };

  const setZoom = (id: number) => {
    setStudents((students) =>
      students.map((student) =>
        student.id === id ? { ...student, zoom: !student.zoom } : student,
      ),
    );
  };

  if (updateFlg) return <Loader />;

  return (
    <>
      <Title title="生徒情報管理" icon="student" />
      <div className="flex"></div>
      <List title="生徒一覧" h={250} loaderFlg={loaderFlg}>
        <form
          onSubmit={handleSearch}
          className="flex justify-end items-center gap-2 py-2"
        >
          <div>
            <label>検索ワード：</label>
            <input
              className="p-1 border border-text-500"
              name="keyWord"
              defaultValue={keyWord}
            />
          </div>
          <Button value="検索" type="submit" />
          <Button
            value="新規作成"
            type="link"
            href="/service/admin/student/store"
          />
        </form>
        <StudentListTable
          students={students}
          setZoom={setZoom}
          studentIds={studentIds}
          checkIds={checkIds}
          setCheckIds={setCheckIds}
          setUpdateModalFlg={setUpdateModalFlg}
          setUpdateStudent={setUpdateStudent}
        />
      </List>
      <Pagination
        total={total}
        pageCount={pageCount}
        setPageCount={setPageCount}
      />

      <Modal
        className="!w-[720px] !h-80"
        modalFlg={updateModalFlg}
        setModalFlg={setUpdateModalFlg}
      >
        <StudentUpdateModalTable
          updatStudent={updateStudent}
          setUpdatStudent={setUpdateStudent}
        />
        <UpdateController
          setModalFlg={setUpdateModalFlg}
          updateOnClick={() => updateApi()}
        />
      </Modal>

      <EditToolbar
        isShow={checkIds.length > 0}
        onClickEdit={() => console.log()}
        onClickDelete={() => destroyApi()}
      />
    </>
  );
}
