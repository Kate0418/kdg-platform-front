import axios from "axios";
import Cookies from "js-cookie";

export interface AttendStudentStoreProps {
  lessonId: number;
}

export interface AttendStudentStoreResponse {
  success: boolean;
  message: string;
}

export async function AttendStudentStore({
  lessonId,
}: AttendStudentStoreProps): Promise<AttendStudentStoreResponse> {
  const api_url = `${process.env.NEXT_PUBLIC_API_URL}/attend-student`;
  const token = Cookies.get("token");

  try {
    const response = await axios.post<AttendStudentStoreResponse>(
      api_url,
      {
        lessonId: lessonId,
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
      message: "出席に失敗しました。",
    };
  }
}
