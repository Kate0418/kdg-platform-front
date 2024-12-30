import axios from "axios";
import Cookies from "js-cookie";

export interface StudentDestroyProps {
  studentIds: number[];
}

export interface StudentDestroyResponse {
  success: boolean;
  message: string;
}

export async function StudentDestroy({
  studentIds,
}: StudentDestroyProps): Promise<StudentDestroyResponse> {
  const api_url = `${process.env.NEXT_PUBLIC_API_URL}/student`;
  const token = Cookies.get("token");
  try {
    const response = await axios.delete<StudentDestroyResponse>(api_url, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
      params: {
        studentIds: studentIds,
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
