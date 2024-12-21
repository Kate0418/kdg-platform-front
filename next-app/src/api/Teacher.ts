import axios from "axios";

export interface TeacherProps {
  keyWord: string;
  pageCount: number;
}

export interface TeacherResponse {
  success: boolean;
  teachers: Array<{
    id: number;
    name: string;
    email: string;
    subjects: Array<{
      id: number;
      name: string;
    }>;
  }>;
  teacherIds: number[];
  total: number;
}

export async function Teacher({
  keyWord,
  pageCount,
}: TeacherProps): Promise<TeacherResponse> {
  const api_url = `${process.env.NEXT_PUBLIC_API_URL}/teacher`;
  const token = localStorage.getItem("token");

  try {
    const response = await axios.get<TeacherResponse>(api_url, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
      params: {
        keyWord: keyWord,
        pageCount: pageCount,
      },
    });
    return response.data;
  } catch (e) {
    console.error(e);
    return {
      success: false,
      teachers: [],
      teacherIds: [],
      total: 0,
    };
  }
}
