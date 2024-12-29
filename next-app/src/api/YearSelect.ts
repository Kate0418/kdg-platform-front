import { SelectItem } from "@/config";
import axios from "axios";
import Cookies from "js-cookie";

export interface YearSelectResponse {
  success: boolean;
  years: SelectItem[];
}

export async function YearSelect(): Promise<YearSelectResponse> {
  const api_url = `${process.env.NEXT_PUBLIC_API_URL}/year/select`;
  const token = Cookies.get("token");

  try {
    const response = await axios.get<YearSelectResponse>(api_url, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (e) {
    console.error(e);
    return {
      success: false,
      years: [],
    };
  }
}
