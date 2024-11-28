import { SelectItem } from "@/config";
import axios from "axios";

export interface GradeSelectResponse {
  success: boolean;
  grades: SelectItem[];
}

export async function GradeSelect(): Promise<GradeSelectResponse> {
  const api_url = `${process.env.NEXT_PUBLIC_API_URL}/grade/select`;
  const token = localStorage.getItem("token");

  try {
    const response = await axios.get<GradeSelectResponse>(api_url, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (e) {
    console.error(e);
    return {
      success: false,
      grades: [],
    };
  }
}