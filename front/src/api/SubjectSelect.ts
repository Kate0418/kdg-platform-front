import axios from "axios";
import Cookies from "js-cookie";

export interface Response {
  success: boolean;
  subjects: Array<{
    value: number;
    label: string;
  }>;
}

export async function SubjectSelect(): Promise<Response> {
  const api_url = `${process.env.NEXT_PUBLIC_API_URL}/subject/select`;
  const token = Cookies.get("token");

  try {
    const response = await axios.get<Response>(api_url, {
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
