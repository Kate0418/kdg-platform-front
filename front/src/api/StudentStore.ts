import axios from "axios";

export interface StudentStoreProps {
  students: Array<{
    name: string;
    email: string;
    courseId: number | null;
    gradeId: number | null;
    yearId: number | null;
  }>;
}

export interface StudentStoreResponse {
  success: boolean;
  message: string;
}

export async function StudentStore({
  students,
}: StudentStoreProps): Promise<StudentStoreResponse> {
  const api_url = `${process.env.NEXT_PUBLIC_API_URL}/student`;
  const token = localStorage.getItem("token");

  try {
    const response = await axios.post<StudentStoreResponse>(
      api_url,
      {
        students: students,
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      },
    );
    return response.data;
  } catch (e) {
    console.log(e);
    return {
      success: false,
      message: "登録に失敗しました",
    };
  }
}
