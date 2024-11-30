"use client";

import { SubjectSelect, SubjectSelectResponse } from "@/api/SubjectSelect";
import { Loader } from "@/components/layout/Loader";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Token } from "@/api/Token";
import React from "react";
import { TeacherStore, TeacherStoreProps } from "@/api/TeacherStore";
import { Title } from "@/components/layout/Title";
import { List } from "@/components/layout/List";
import { Modal } from "@/components/layout/Modal";
import { TeacherFormTable } from "@/components/service/admin/teacher/teacherFormTable/teacherFormTable";
import { StoreFormController } from "@/components/layout/storeFormController/storeFormController";
import { StoreModalController } from "@/components/layout/storeModalController/storeModalController";

export default function Page() {
  const [subjects, setSubjects] = useState<SubjectSelectResponse["subjects"]>(
    [],
  );
  const [teachers, setTeachers] = useState<TeacherStoreProps["teachers"]>([
    { name: "", email: "", subjectIds: [] },
  ]);
  const [modalFlg, setModalFlg] = useState(false);
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  useEffect(() => {
    //セレクトボックスの取得
    const selectApi = async () => {
      const data = await SubjectSelect();
      setSubjects(data.subjects);
    };

    selectApi();
  }, []);

  const storeApi = async () => {
    setLoading(true);
    const token = await Token();
    if (!token.success) {
      router.push("/site/login");
      setLoading(false);
    }

    const response = await TeacherStore({ teachers });
    alert(response.message);
    if (response.success) {
      router.push("/service/admin/teacher");
    } else {
      setLoading(false);
    }
  };

  if (loading) {
    return <Loader />;
  }

  return (
    <>
      <Title title="講師登録" icon="teacher" />
      <List title="登録講師一覧" h={520}>
        <TeacherFormTable
          teachers={teachers}
          setTeachers={setTeachers}
          select={{ subjects }}
        />
      </List>

      <StoreFormController
        cancelUrl="/service/admin/teacher"
        addOnClick={() =>
          setTeachers([...teachers, { name: "", email: "", subjectIds: [] }])
        }
        deleteOnClick={() =>
          teachers.length > 1 && setTeachers(teachers.slice(0, -1))
        }
        confirmOnClick={() =>
          teachers.every(
            (teacher) => teacher.name !== "" && teacher.email !== "",
          )
            ? setModalFlg(true)
            : alert("講師情報を正しく入力してください")
        }
      />

      <Modal modalFlg={modalFlg} setModalFlg={setModalFlg}>
        <TeacherFormTable
          teachers={teachers}
          setTeachers={setTeachers}
          select={{ subjects }}
          modalFlg={modalFlg}
        />
        <StoreModalController
          setModalFlg={setModalFlg}
          storeOnClick={storeApi}
        />
      </Modal>
    </>
  );
}
