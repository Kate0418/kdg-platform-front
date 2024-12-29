"use client";

import { Loader } from "@/components/layout/Loader";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { Token } from "@/api/Token";
import { List } from "@/components/layout/List";
import { SubjectStore, SubjectStoreProps } from "@/api/SubjectStore";
import { Title } from "@/components/layout/Title";
import { Modal } from "@/components/layout/Modal";
import { SubjectFormTable } from "@/components/service/admin/subject/subjectFormTable/subjectFormTable";
import { StoreFormController } from "@/components/layout/storeFormController/storeFormController";
import { StoreModalController } from "@/components/layout/storeModalController/storeModalController";
import { SubjectIcon } from "@/components/layout/icons/subjectIcon/subjectIcon";

export default function Page() {
  const [subjects, setSubjects] = useState<SubjectStoreProps["subjects"]>([
    { name: "", teacherId: null },
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
      <Title label="科目登録">
        <SubjectIcon />
      </Title>
      <List title="登録科目一覧" h={250}>
        <SubjectFormTable subjects={subjects} setSubjects={setSubjects} />
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
          modalFlg={modalFlg}
        />
        <StoreModalController
          setModalFlg={setModalFlg}
          storeOnClick={() => storeApi()}
        />
      </Modal>
    </>
  );
}
