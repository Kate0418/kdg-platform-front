import axios from "axios";
import Cookies from "js-cookie";

export interface TopAttendStudentResponse {
  success: boolean;
  lessons: Array<{
    id: number;
    subjectName: string;
    startTime: string;
    endTime: string;
    states: "already" | "present" | "late";
  }>;
}

export async function TopAttendStudent(): Promise<TopAttendStudentResponse> {
  const api_url = `${process.env.NEXT_PUBLIC_API_URL}/top/attend-student`;
  const token = Cookies.get("token");

  try {
    const response = await axios.get<TopAttendStudentResponse>(api_url, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (e) {
    console.error(e);
    return {
      success: false,
      lessons: [],
    };
  }
}
