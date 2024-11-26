import axios from "axios";

export interface StudentProps {
  keyWord: string;
  pageCount: number;
}

export interface StudentResponse {
  success: boolean;
  students: Array<{
    id: number;
    name: string;
    email: string;
    courseName: string;
    gradeName: string;
    yearName: string;
  }>;
  total: number;
}

export async function Student({
  keyWord,
  pageCount,
}: StudentProps): Promise<StudentResponse> {
  const api_url = `${process.env.NEXT_PUBLIC_API_URL}/student`;
  const token = localStorage.getItem("token");

  try {
    const response = await axios.get<StudentResponse>(api_url, {
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
      students: [],
      total: 0,
    };
  }
}
