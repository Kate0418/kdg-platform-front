"use client";

import {
  TopAttendStudent,
  TopAttendStudentResponse,
} from "@/api/TopAttendStudent";
import { TopIcon } from "@/components/layout/icons/topIcon/topIcon";
import { List } from "@/components/layout/List";
import { Title } from "@/components/layout/Title";
import { AttendTable } from "@/components/service/student/top/attendTable/attendTable";
import { useEffect, useState } from "react";

export default function Page() {
  const [loadingFlg, setLoadingFlg] = useState(true);
  const [lessons, setLessons] = useState<TopAttendStudentResponse["lessons"]>(
    [],
  );

  useEffect(() => {
    (async () => {
      const response = await TopAttendStudent();
      setLessons(response.lessons);
      setLoadingFlg(false);
    })();
  });

  return (
    <>
      <Title label="トップページ">
        <TopIcon />
      </Title>
      <div className="grid lg:grid-cols-2">
        <List title="出席可能授業" h={500} loaderFlg={loadingFlg}>
          <AttendTable lessons={lessons} />
        </List>
        <div />
      </div>
    </>
  );
}
