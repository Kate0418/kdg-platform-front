import axios from "axios";

export interface Props {
  keyWord: string;
  pageCount: number;
}

export interface Response {
  success: boolean;
  subjects: Array<{
    id: number;
    name: string;
    teacher_name: string;
  }>;
  total: number;
}

export async function Subject({
  keyWord,
  pageCount,
}: Props): Promise<Response> {
  const api_url = `${process.env.NEXT_PUBLIC_API_URL}/subject`;
  const token = localStorage.getItem("token");

  try {
    const response = await axios.get<Response>(api_url, {
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
      total: 0,
    };
  }
}
