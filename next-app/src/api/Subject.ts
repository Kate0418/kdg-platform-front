import axios from "axios";

export interface SubjectProps {
  keyWord: string;
  pageCount: number;
}

export interface SubjectResponse {
  success: boolean;
  subjects: Array<{
    id: number;
    name: string;
    teacher: {
      id: number;
      name: string;
    } | null;
  }>;
  subjectIds: number[];
  total: number;
}

export async function Subject({
  keyWord,
  pageCount,
}: SubjectProps): Promise<SubjectResponse> {
  const api_url = `${process.env.NEXT_PUBLIC_API_URL}/subject`;
  const token = localStorage.getItem("token");

  try {
    const response = await axios.get<SubjectResponse>(api_url, {
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
      subjects: [],
      subjectIds: [],
      total: 0,
    };
  }
}
