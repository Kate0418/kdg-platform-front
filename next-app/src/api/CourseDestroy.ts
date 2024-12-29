import axios from "axios";
import Cookies from "js-cookie";

export interface CourseDestroyProps {
  courseIds: number[];
}

export interface CourseDestroyResponse {
  success: boolean;
  message: string;
}

export async function CourseDestroy({
  courseIds,
}: CourseDestroyProps): Promise<CourseDestroyResponse> {
  const api_url = `${process.env.NEXT_PUBLIC_API_URL}/course`;
  const token = Cookies.get("token");

  try {
    const response = await axios.delete<CourseDestroyResponse>(api_url, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
      params: {
        courseIds: courseIds,
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
