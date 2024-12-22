import axios from "axios";
import { StudentStoreProps } from "./StudentStore";

export interface StudentUpdateProps {
  students: Array<{ id: number } & StudentStoreProps["students"][number]>;
}

export interface StudentUpdateResponse {
  success: boolean;
  message: string;
}

export async function StudentUpdate({
    students,
  }: StudentUpdateProps): Promise<StudentUpdateResponse> {
    const api_url = `${process.env.NEXT_PUBLIC_API_URL}/student`;
    const token = localStorage.getItem("token");
  
    try {
      const response = await axios.put<StudentUpdateResponse>(
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
      console.error(e);
      return {
        success: false,
        message: "更新に失敗しました",
      };
    }
  }
  