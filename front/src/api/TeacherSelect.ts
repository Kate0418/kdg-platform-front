import axios from "axios";

export interface Response {
  success: boolean;
  teachers: Array<{
    value: number;
    label: string;
  }>;
}

export async function TeacherSelect(): Promise<Response> {
  const api_url = `${process.env.NEXT_PUBLIC_API_URL}/teacher/select`;
  const token = localStorage.getItem("token");

  try {
    const response = await axios.get<Response>(api_url, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (e) {
    return {
      success: false,
      teachers: [],
    };
  }
}
