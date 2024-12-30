import axios from "axios";
import { TeacherStoreProps } from "./TeacherStore";
import Cookies from "js-cookie";

export interface TeacherUpdateProps {
  teachers: Array<{ id: number } & TeacherStoreProps["teachers"][number]>;
}

export interface TeacherUpdateResponse {
  success: boolean;
  message: string;
}

export async function TeacherUpdate({
  teachers,
}: TeacherUpdateProps): Promise<TeacherUpdateResponse> {
  const api_url = `${process.env.NEXT_PUBLIC_API_URL}/teacher`;
  const token = Cookies.get("token");

  try {
    const response = await axios.put<TeacherUpdateResponse>(
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
    console.error(e);
    return {
      success: false,
      message: "保存に失敗しました",
    };
  }
}
