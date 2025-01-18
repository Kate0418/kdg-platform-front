"use client";

import { CourseStore, CourseStoreProps } from "@/api/CourseStore";
import { List } from "@/components/layout/List";
import { Modal } from "@/components/layout/Modal";
import { Title } from "@/components/layout/Title";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { Token } from "@/api/Token";
import { Loader } from "@/components/layout/Loader";
import { CourseFormTable } from "@/components/service/admin/course/courseFormTable/courseFormTable";
import { StoreModalController } from "@/components/layout/storeModalController/storeModalController";
import { StoreFormController } from "@/components/layout/storeFormController/storeFormController";
import { CourseIcon } from "@/components/layout/icons/courseIcon/courseIcon";

export default function Page() {
  const periodCount = 12;
  const [course, setCourse] = useState<CourseStoreProps["course"]>({
    name: "",
    gradeId: null,
    periods: Array.from({ length: periodCount }, (_, index) => ({
      sequence: index + 1,
      startTime: null,
      endTime: null,
      lessons: [],
    })),
  });
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

    const storeCourse = {
      ...course,
      periods: course.periods.filter(
        (period) => period.startTime && period.endTime,
      ),
    };
    const subjectAdd = await CourseStore({ course: storeCourse });
    alert(subjectAdd.message);
    if (subjectAdd.success) {
      router.push("/service/admin/course");
    } else {
      setLoaderFlg(false);
    }
  };

  if (loaderFlg) return <Loader />;

  return (
    <>
      <Title label="コース登録">
        <CourseIcon />
      </Title>
      <List title="登録コース" h={250}>
        <CourseFormTable course={course} setCourse={setCourse} />
      </List>

      <StoreFormController
        isHidden={true}
        cancelUrl="/service/admin/course"
        confirmOnClick={() => {
          if (!course.name || !course.gradeId) {
            alert("コース名,学年が入力されていません");
            return;
          }
          course.periods.forEach((period) => {
            if (
              period.startTime === null &&
              period.endTime === null &&
              period.lessons.length > 0
            ) {
              alert("授業があるコマに時間が入力されていません");
            }
          });
          setModalFlg(true);
        }}
      />

      <Modal modalFlg={modalFlg} setModalFlg={setModalFlg}>
        <CourseFormTable
          course={course}
          setCourse={setCourse}
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
