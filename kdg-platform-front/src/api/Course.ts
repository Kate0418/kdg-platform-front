import axios from "axios";
import Cookies from "js-cookie";

export interface CourseProps {
  keyWord: string;
  pageCount: number;
}

export interface CourseResponse {
  success: boolean;
  courses: Array<{
    id: number;
    name: string;
    gradeName: string;
  }>;
  courseIds: number[];
  total: number;
}

export async function Course({
  keyWord,
  pageCount,
}: CourseProps): Promise<CourseResponse> {
  const api_url = `${process.env.NEXT_PUBLIC_API_URL}/course`;
  const token = Cookies.get("token");

  try {
    const response = await axios.get<CourseResponse>(api_url, {
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
      courses: [],
      courseIds: [],
      total: 0,
    };
  }
}
