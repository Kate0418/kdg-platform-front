"use client";

import { Loader } from "@/components/layout/Loader";
import { useState } from "react";
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
import { TeacherIcon } from "@/components/layout/icons/teacherIcon/teacherIcon";

export default function Page() {
  const [teachers, setTeachers] = useState<TeacherStoreProps["teachers"]>([
    { name: "", email: "", subjectIds: [] },
  ]);
  const [modalFlg, setModalFlg] = useState(false);
  const [loading, setLoading] = useState(false);
  const router = useRouter();

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
      <Title label="講師登録">
        <TeacherIcon />
      </Title>
      <List title="登録講師一覧" h={250}>
        <TeacherFormTable teachers={teachers} setTeachers={setTeachers} />
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
            : alert("名前, メールアドレスは必須です")
        }
      />

      <Modal modalFlg={modalFlg} setModalFlg={setModalFlg}>
        <TeacherFormTable
          teachers={teachers}
          setTeachers={setTeachers}
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
