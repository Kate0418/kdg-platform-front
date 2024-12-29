import axios from "axios";
import Cookies from "js-cookie";

export interface TeacherStoreProps {
  teachers: Array<{
    name: string;
    email: string;
    subjectIds: number[] | null;
  }>;
}

export interface TeacherStoreResponse {
  success: boolean;
  message: string;
}

export async function TeacherStore({
  teachers,
}: TeacherStoreProps): Promise<TeacherStoreResponse> {
  const api_url = `${process.env.NEXT_PUBLIC_API_URL}/teacher`;
  const token = Cookies.get("token");

  try {
    const response = await axios.post<{ success: boolean; message: string }>(
      api_url,
      {
        teachers: teachers,
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      },
    );
    return response.data;
  } catch (e) {
    console.log(e);
    return {
      success: false,
      message: "登録に失敗しました",
    };
  }
}
