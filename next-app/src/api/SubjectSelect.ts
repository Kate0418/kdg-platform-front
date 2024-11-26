import { SelectItem } from "@/config";
import axios from "axios";

export interface SubjectSelectResponse {
  success: boolean;
  subjects: SelectItem[];
}

export async function SubjectSelect(): Promise<SubjectSelectResponse> {
  const api_url = `${process.env.NEXT_PUBLIC_API_URL}/subject/select`;
  const token = localStorage.getItem("token");

  try {
    const response = await axios.get<SubjectSelectResponse>(api_url, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (e) {
    console.error(e);
    return {
      success: false,
      subjects: [],
    };
  }
}
