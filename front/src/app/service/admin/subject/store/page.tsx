"use client";

import { Loader } from "@/components/layout/Loader";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Token } from "@/api/Token";
import { List } from "@/components/layout/List";
import { SubjectStore, SubjectStoreProps } from "@/api/SubjectStore";
import { Title } from "@/components/layout/Title";
import { TeacherSelect, TeacherSelectResponse } from "@/api/TeacherSelect";
import { Modal } from "@/components/layout/Modal";
import { SubjectFormTable } from "@/components/admin/subject/subjectFormTable/subjectFormTable";
import { StoreFormController } from "@/components/layout/StoreFormController/StoreFormController";
import { StoreModalController } from "@/components/layout/StoreModalController/StoreModalController";

export default function Page() {
  const [teachers, setTeachers] = useState<TeacherSelectResponse["teachers"]>(
    [],
  );
  const [subjects, setSubjects] = useState<SubjectStoreProps["subjects"]>([
    { name: "", teacherId: null },
  ]);

  const [modalFlg, setModalFlg] = useState(false);
  const [loaderFlg, setLoaderFlg] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const selectApi = async () => {
      const response = await TeacherSelect();
      setTeachers(response.teachers);
    };

    selectApi();
  }, []);

  const storeApi = async () => {
    setLoaderFlg(true);
    const token = await Token();
    if (!token.success) {
      router.push("/site/login");
      setLoaderFlg(false);
    }

    const subjectAdd = await SubjectStore({ subjects });
    alert(subjectAdd.message);
    if (subjectAdd.success) {
      router.push("/service/admin/subject");
    } else {
      setLoaderFlg(false);
    }
  };

  if (loaderFlg) return <Loader />;

  return (
    <>
      <Title title="科目登録" icon="subject" />
      <List title="登録科目一覧" h={520}>
        <SubjectFormTable
          subjects={subjects}
          setSubjects={setSubjects}
          select={{
            teachers: teachers,
          }}
        />
      </List>
      <StoreFormController
        cancelUrl="/service/admin/subject"
        addOnClick={() =>
          setSubjects([...subjects, { name: "", teacherId: null }])
        }
        deleteOnClick={() =>
          subjects.length > 1 && setSubjects(subjects.slice(0, -1))
        }
        confirmOnClick={() =>
          subjects.every((subject) => subject.name !== "")
            ? setModalFlg(true)
            : alert("科目情報を正しく入力してください")
        }
      />

      <Modal modalFlg={modalFlg} setModalFlg={setModalFlg}>
        <SubjectFormTable
          subjects={subjects}
          setSubjects={setSubjects}
          select={{ teachers }}
          modalFlg={modalFlg}
        />
        <StoreModalController
          setModalFlg={setModalFlg}
          storeOnClick={() => storeApi}
        />
      </Modal>
    </>
  );
}
