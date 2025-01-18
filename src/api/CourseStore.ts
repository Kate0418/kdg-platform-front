import axios from "axios";
import Cookies from "js-cookie";

export interface CourseStoreProps {
  course: {
    name: string;
    gradeId: number | null;
    periods: Array<{
      sequence: number;
      startTime: Date | null;
      endTime: Date | null;
      lessons: Array<{
        subjectId: number | null;
        dayOfWeek: "Mon" | "Tue" | "Wed" | "Thu" | "Fri" | "Sat" | "Sun";
      }>;
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
  const token = Cookies.get("token");

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
