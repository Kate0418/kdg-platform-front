import axios from "axios";

export interface SubjectProps {
  subjects: Array<{
    name: string;
    teacherId: number | null;
  }>;
}

export interface SubjectResponse {
  success: boolean;
  message: string;
}

export async function SubjectStore({
  subjects,
}: SubjectProps): Promise<SubjectResponse> {
  const api_url = `${process.env.NEXT_PUBLIC_API_URL}/subject`;
  const token = localStorage.getItem("token");

  try {
    const response = await axios.post<SubjectResponse>(
      api_url,
      {
        subjects: subjects,
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      },
    );
    return response.data;
  } catch (e) {
    console.error(e);
    return {
      success: false,
      message: "登録に失敗しました",
    };
  }
}
