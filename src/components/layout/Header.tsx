"use client";

import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import Image from "next/image";
import Cookies from "js-cookie";
import { StudentIcon } from "./icons/studentIcon/studentIcon";
import { TeacherIcon } from "./icons/teacherIcon/teacherIcon";
import { SubjectIcon } from "./icons/subjectIcon/subjectIcon";
import { CourseIcon } from "./icons/courseIcon/courseIcon";
import { HeaderIcon } from "./icons/headerIcon/headerIcon";

type Pages = {
  [key: string]: Array<{
    name: string;
    type: string;
    icon: React.ReactNode;
  }>;
};

export default function Header() {
  const [menu, setMenu] = useState(false);
  const site_flg = usePathname().startsWith("/site/");
  const [userType, setUserType] = useState("");
  const pages: Pages = {
    admin: [
      {
        name: "生徒情報管理",
        type: "student",
        icon: <StudentIcon className="w-6 h-6" />,
      },
      {
        name: "講師情報管理",
        type: "teacher",
        icon: <TeacherIcon className="w-6 h-6" />,
      },
      {
        name: "科目情報管理",
        type: "subject",
        icon: <SubjectIcon className="w-6 h-6" />,
      },
      {
        name: "コース情報管理",
        type: "course",
        icon: <CourseIcon className="w-6 h-6" />,
      },
    ],
  };

  useEffect(() => setUserType(Cookies.get("type") ?? ""), []);

  return (
    <>
      <header className="bg-text-500 border-base-500 w-screen h-20 p-4 fixed">
        <div className="flex items-center px-2">
          <a href={site_flg ? "/site/login" : `/service/${userType}/top`}>
            <HeaderIcon />
          </a>
          {site_flg || (
            <div className="flex justify-end w-full">
              <button
                className="border"
                onClick={function () {
                  setMenu(true);
                }}
              >
                <Image
                  className="p-2"
                  src="/img/menu.svg"
                  alt="close"
                  width={42}
                  height={42}
                />
              </button>
            </div>
          )}
        </div>
        <div className="border-b border-base-500 h-2"></div>
      </header>

      {menu && (
        <>
          <div
            className="fixed w-screen h-screen z-20 bg-accent-500 opacity-30"
            onClick={() => setMenu(false)}
          />
          <div className="fixed top-0 right-0 h-screen z-30 w-80 bg-base-500 p-6">
            <button
              className="fixed right-6"
              onClick={function () {
                setMenu(false);
              }}
            >
              <Image
                className="p-2"
                src="/img/close.svg"
                alt="close"
                width={42}
                height={42}
              />
            </button>
            <div className="flex flex-col gap-4 pt-12">
              {userType &&
                pages[userType]?.map((page, index) => (
                  <a key={index} href={`/service/${userType}/${page.type}`}>
                    <div className="flex text-xl gap-1 pb-1 border-b border-text-500 items-center">
                      {page.icon}
                      {page.name}
                    </div>
                  </a>
                ))}
            </div>
          </div>
        </>
      )}
    </>
  );
}
