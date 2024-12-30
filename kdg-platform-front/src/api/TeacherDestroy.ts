import axios from "axios";
import Cookies from "js-cookie";

export interface TeacherDestroyProps {
  teacherIds: number[];
}

export interface TeacherDestroyResponse {
  success: boolean;
  message: string;
}

export async function TeacherDestroy({
  teacherIds,
}: TeacherDestroyProps): Promise<TeacherDestroyResponse> {
  const api_url = `${process.env.NEXT_PUBLIC_API_URL}/teacher`;
  const token = Cookies.get("token");

  try {
    const response = await axios.delete<TeacherDestroyResponse>(api_url, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
      params: {
        teacherIds: teacherIds,
      },
    });
    return response.data;
  } catch (e) {
    console.error(e);
    return {
      success: false,
      message: "更新に失敗しました",
    };
  }
}
