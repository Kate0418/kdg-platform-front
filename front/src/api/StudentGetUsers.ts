import axios from 'axios';
import Cookies from 'js-cookie';

export default async function (key_word: string|null, course_id: number|null): Promise<{ id: number; name: string; email: string; course_id: number | null; zoom: boolean }[]> {
    const api_url = `${process.env.NEXT_PUBLIC_API_URL}/student/get_users`;
    const token = Cookies.get('token');

    if (!token) {
        return [];
    }

    try {
        const response = await axios.post(
            api_url,
            {
                key_word: key_word,
                course_id: course_id
            },
            {
                headers: {
                Authorization: `Bearer ${token}`,
                }
            }
        );
        if (response.data) {
            const users = response.data.map((user: any) => ({
                ...user,
                zoom: false
            }));
            return users;
        }
    } catch (e) {
        console.log(e);
        return [];
    }

    return [];
}