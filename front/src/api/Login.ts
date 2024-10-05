import axios from 'axios';

export default async function (email: string, password: string): Promise<boolean> {
    const api_url = `${process.env.NEXT_PUBLIC_API_URL}/login`;
    const request_data = {
        email: email,
        password: password
    }
    try {
        const response = await axios.post(api_url, request_data)
        if (response.data.success) {
            localStorage.setItem('token', response.data.token);
        }
        return response.data.success;
    } catch (e) {
        return false;
    }
}