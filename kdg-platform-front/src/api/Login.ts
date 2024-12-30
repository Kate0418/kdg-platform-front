import axios from "axios";

export interface LoginProps {
  email: string;
  password: string;
}

export interface LoginResponse {
  success: boolean;
  type?: string;
  token?: string;
}

export async function Login({
  email,
  password,
}: LoginProps): Promise<LoginResponse> {
  const api_url = `${process.env.NEXT_PUBLIC_API_URL}/login`;

  try {
    const response = await axios.post<LoginResponse>(api_url, {
      email: email,
      password: password,
    });

    return response.data;
  } catch (e) {
    console.log(e);
    return { success: false };
  }
}
