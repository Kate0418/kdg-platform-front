import axios from "axios";

export interface CourseStoreProps {
  course: {
    name: string;
    gradeId: number | null;
    times: Array<{
      period: number;
      startTime: string;
      endTime: string;
    }>;
    lessons: Array<{
      dayOfWeek: number;
      period: number;
      subjectId: number | null;
    }>;
  };
}

export interface CourseStoreResponse {
  success: boolean;
  message: string;
}

export async function CourseStore({
  course,
}: CourseStoreProps): Promise<CourseStoreResponse> {
  const api_url = `${process.env.NEXT_PUBLIC_API_URL}/course`;
  const token = localStorage.getItem("token");

  try {
    const response = await axios.post<CourseStoreResponse>(
      api_url,
      {
        course: course,
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      },
    );
    return response.data;
  } catch (e) {
    console.error(e);
    return {
      success: false,
      message: "登録に失敗しました",
    };
  }
}
