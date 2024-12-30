import axios from "axios";
import Cookies from "js-cookie";

export interface SubjectDestroyProps {
  subjectIds: number[];
}

export interface SubjectDestroyResponse {
  success: boolean;
  message: string;
}

export async function SubjectDestroy({
  subjectIds,
}: SubjectDestroyProps): Promise<SubjectDestroyResponse> {
  const api_url = `${process.env.NEXT_PUBLIC_API_URL}/subject`;
  const token = Cookies.get("token");

  try {
    const response = await axios.delete<SubjectDestroyResponse>(api_url, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
      params: {
        subjectIds: subjectIds,
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
