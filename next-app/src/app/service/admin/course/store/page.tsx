"use client";

import { CourseStore, CourseStoreProps } from "@/api/CourseStore";
import { GradeSelect, GradeSelectResponse } from "@/api/GradeSelect";
import { SubjectSelect, SubjectSelectResponse } from "@/api/SubjectSelect";
import { List } from "@/components/layout/List";
import { Modal } from "@/components/layout/Modal";
import { Title } from "@/components/layout/Title";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Token } from "@/api/Token";
import { Loader } from "@/components/layout/Loader";
import { CourseFormTable } from "@/components/service/admin/course/courseFormTable/courseFormTable";

export default function Page() {
  const period = 12;
  const [grades, setGrades] = useState<GradeSelectResponse["grades"]>([]);
  const [subjects, setSubjects] = useState<SubjectSelectResponse["subjects"]>(
    [],
  );
  const [course, setCourse] = useState<CourseStoreProps["course"]>({
    name: "",
    gradeId: null,
    times: Array.from({ length: period }, (_, index) => ({
      period: index,
      startTime: "",
      endTime: "",
    })),
    lessons: [],
  });
  const [modalFlg, setModalFlg] = useState(false);
  const [loaderFlg, setLoaderFlg] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const selectApi = async () => {
      const subjectData = await SubjectSelect();
      setSubjects(subjectData.subjects);

      const gradeData = await GradeSelect();
      setGrades(gradeData.grades);
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
      <List title="登録コース" h={520}>
        <CourseFormTable
          course={course}
          setCourse={setCourse}
          select={{ grades, subjects }}
        />
      </List>
      <div className="flex justify-between w-full">
        <a className="a" href="/service/admin/course">
          キャンセル
        </a>

        <div>
          <button
            className="button"
            type="button"
            onClick={() => {
              if (!course.name || !course.gradeId) {
                alert("コース名,学年が入力されていません");
                return;
              }
              for (let i = 0; i < 7; i++) {
                for (let j = 0; j < period; j++) {
                  if (course.times[j].startTime && course.times[j].endTime) {
                    break;
                  } else if (
                    course.lessons.some((lesson) => lesson.period === j)
                  ) {
                    alert("時間が入力されていません");
                    return;
                  }
                }
              }

              setModalFlg(true);
            }}
          >
            確認
          </button>
        </div>
      </div>

      <Modal modalFlg={modalFlg} setModalFlg={setModalFlg}>
        <CourseFormTable
          course={course}
          setCourse={setCourse}
          select={{ grades, subjects }}
          modalFlg={modalFlg}
        />
        <div className="flex justify-end w-full">
          <button
            className="button"
            type="button"
            onClick={() => {
              setModalFlg(false);
            }}
          >
            戻る
          </button>
          <button
            className="button"
            type="button"
            onClick={() => {
              storeApi();
            }}
          >
            登録
          </button>
        </div>
      </Modal>
    </>
  );
}
