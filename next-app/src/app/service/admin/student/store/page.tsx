"use client";

import { Loader } from "@/components/layout/Loader";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { Token } from "@/api/Token";
import { StudentStore, StudentStoreProps } from "@/api/StudentStore";
import { List } from "@/components/layout/List";
import { Modal } from "@/components/layout/Modal";
import { Title } from "@/components/layout/Title";
import { StudentFromTable } from "@/components/service/admin/student/studentFormTable/studentFormTable";
import { StoreFormController } from "@/components/layout/storeFormController/storeFormController";
import { StoreModalController } from "@/components/layout/storeModalController/storeModalController";

export default function Page() {
  const [students, setStudents] = useState<StudentStoreProps["students"]>([
    { name: "", email: "", courseId: null, gradeId: null, yearId: null },
  ]);
  const [modalFlg, setModalFlg] = useState(false);
  const [loaderFlg, setLoaderFlg] = useState(false);
  const router = useRouter();

  const storeApi = async () => {
    setLoaderFlg(true);
    const token = await Token();
    if (!token.success) {
      router.push("/site/login");
      setLoaderFlg(false);
    }

    const studentStore = await StudentStore({ students });
    alert(studentStore.message);
    if (studentStore.success) {
      router.push("/service/admin/student");
    } else {
      setLoaderFlg(false);
      setModalFlg(false);
    }
  };

  if (loaderFlg) return <Loader />;

  return (
    <>
      <Title title="生徒登録" icon="student" />
      <List title="登録生徒一覧" h={250}>
        <StudentFromTable students={students} setStudents={setStudents} />
      </List>
      <StoreFormController
        cancelUrl="/service/admin/student"
        addOnClick={() =>
          setStudents([
            ...students,
            {
              name: "",
              email: "",
              courseId: null,
              gradeId: null,
              yearId: null,
            },
          ])
        }
        deleteOnClick={() =>
          students.length > 1 && setStudents(students.slice(0, -1))
        }
        confirmOnClick={() => {
          students.every(
            (student) =>
              student.name != "" &&
              student.email != "" &&
              student.gradeId != null &&
              student.yearId != null,
          )
            ? setModalFlg(true)
            : alert("名前,メールアドレス,年次,年制は必須です");
        }}
      />

      <Modal modalFlg={modalFlg} setModalFlg={setModalFlg}>
        <StudentFromTable
          students={students}
          setStudents={setStudents}
          readOnly={true}
        />

        <StoreModalController
          setModalFlg={setModalFlg}
          storeOnClick={() => {
            storeApi();
          }}
        />
      </Modal>
    </>
  );
}
