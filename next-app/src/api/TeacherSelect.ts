import { SelectItem } from "@/config";
import axios from "axios";
import Cookies from "js-cookie";

export interface TeacherSelectResponse {
  success: boolean;
  teachers: SelectItem[];
}

export async function TeacherSelect(): Promise<TeacherSelectResponse> {
  const api_url = `${process.env.NEXT_PUBLIC_API_URL}/teacher/select`;
  const token = Cookies.get("token");

  try {
    const response = await axios.get<TeacherSelectResponse>(api_url, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (e) {
    console.error(e);
    return {
      success: false,
      teachers: [],
    };
  }
}
