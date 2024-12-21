import axios from "axios";
import { SubjectStoreProps } from "./SubjectStore";

export interface SubjectUpdateProps {
  subjects: Array<{ id: number } & SubjectStoreProps["subjects"][number]>;
}

export interface SubjectUpdateResponse {
  success: boolean;
  message: string;
}

export async function SubjectUpdate({
  subjects,
}: SubjectUpdateProps): Promise<SubjectUpdateResponse> {
  const api_url = `${process.env.NEXT_PUBLIC_API_URL}/subject`;
  const token = localStorage.getItem("token");

  try {
    const response = await axios.put<SubjectUpdateResponse>(
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
      message: "更新に失敗しました",
    };
  }
}
