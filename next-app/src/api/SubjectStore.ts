import axios from "axios";
import Cookies from "js-cookie";

export interface SubjectStoreProps {
  subjects: Array<{
    name: string;
    teacherId: number | null;
  }>;
}

export interface SubjectStoreResponse {
  success: boolean;
  message: string;
}

export async function SubjectStore({
  subjects,
}: SubjectStoreProps): Promise<SubjectStoreResponse> {
  const api_url = `${process.env.NEXT_PUBLIC_API_URL}/subject`;
  const token = Cookies.get("token");

  try {
    const response = await axios.post<SubjectStoreResponse>(
      api_url,
      {
        subjects: subjects,
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
