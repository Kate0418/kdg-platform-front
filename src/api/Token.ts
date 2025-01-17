import axios from "axios";
import Cookies from "js-cookie";

export interface Response {
  success: boolean;
}

export async function Token(): Promise<Response> {
  const api_url = `${process.env.NEXT_PUBLIC_API_URL}/token`;
  const token = Cookies.get("token");
  if (!token) {
    return { success: false };
  }

  try {
    const response = await axios.get<{ success: true }>(api_url, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (e) {
    console.error(e);
    return { success: false };
  }
}
