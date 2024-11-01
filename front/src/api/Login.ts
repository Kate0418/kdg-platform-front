import axios from "axios";
import Cookies from "js-cookie";

export default async function Login(
  email: string,
  password: string,
): Promise<{ success: boolean; type?: number }> {
  const api_url = `${process.env.NEXT_PUBLIC_API_URL}/login`;
  const request_data = {
    email: email,
    password: password,
  };
  try {
    const response = await axios.post<{
      success: boolean;
      type?: number;
      token?: string;
    }>(api_url, request_data);
    if (response.data.token) {
      Cookies.set("token", response.data.token, { expires: 7 });
    }
    return {
      success: response.data.success,
      type: response.data.type,
    };
  } catch (e) {
    console.log(e);
    return { success: false };
  }
}
