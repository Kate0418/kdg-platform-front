import axios from 'axios';
import Cookies from 'js-cookie';

export default async function (): Promise<any[]> {
    const api_url = `${process.env.NEXT_PUBLIC_API_URL}/course/select`;
    const token = Cookies.get('token');

    if (!token) {
        return [];
    }
    try {
        const response = await axios.post<{ courses: any[]}>(
            api_url,
            {},
            {
                headers: {
                    Authorization: `Bearer ${token}`,
                }
            }
        )
        return response.data.courses;
    } catch (e) {
        return [];
    }
}