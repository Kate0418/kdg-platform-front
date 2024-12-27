"use client";

import { CourseStore, CourseStoreProps } from "@/api/CourseStore";
import { List } from "@/components/layout/List";
import { Modal } from "@/components/layout/Modal";
import { Title } from "@/components/layout/Title";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Token } from "@/api/Token";
import { Loader } from "@/components/layout/Loader";
import { CourseFormTable } from "@/components/service/admin/course/courseFormTable/courseFormTable";
import { StoreModalController } from "@/components/layout/storeModalController/storeModalController";
import { StoreFormController } from "@/components/layout/storeFormController/storeFormController";

export default function Page() {
  const period = 12;
  const [course, setCourse] = useState<CourseStoreProps["course"]>({
    name: "",
    gradeId: null,
    times: Array.from({ length: period }, (_, index) => ({
      period: index,
      startTime: null,
      endTime: null,
    })),
    lessons: [],
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
      times: course.times.filter((time) => time.startTime && time.endTime),
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
      <Title title="コース登録" icon="course" />
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
          for (let i = 0; i < 7; i++) {
            for (let j = 0; j < period; j++) {
              if (course.times[j].startTime && course.times[j].endTime) {
                break;
              } else if (course.lessons.some((lesson) => lesson.period === j)) {
                alert("時間が入力されていません");
                return;
              }
            }
          }

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
