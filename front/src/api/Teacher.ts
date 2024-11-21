import axios from "axios";

export interface Props {
  keyWord: string;
  pageCount: number;
}

export interface Response {
  success: boolean;
  teachers: Array<{
    id: number;
    name: string;
    email: string;
    subjectNames: Array<{
      value: number;
      label: string;
    }>;
  }>;
  total: number;
}

export async function Teacher({
  keyWord,
  pageCount,
}: Props): Promise<Response> {
  const api_url = `${process.env.NEXT_PUBLIC_API_URL}/teacher`;
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
      teachers: [],
      total: 0,
    };
  }
}
