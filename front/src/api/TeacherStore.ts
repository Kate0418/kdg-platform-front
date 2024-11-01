import axios from "axios";
import Cookies from "js-cookie";

export interface Props {
  teachers: Array<{
    name: string;
    email: string;
    subjectIds: Array<{
      value: number;
      label: string;
    }>;
  }>;
}

export interface Response {
  success: boolean;
  message: string;
}

export async function TeacherStore({ teachers }: Props): Promise<Response> {
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
