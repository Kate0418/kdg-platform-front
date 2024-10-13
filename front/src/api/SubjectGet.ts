import axios from 'axios';
import Cookies from 'js-cookie';

interface apiType {
    success: boolean,
    subjects: Array<{
        id: number,
        name: string,
        teacher_name: string | null
    }>
}

export default async function (key_word: string): Promise<apiType> {
    const api_url = `${process.env.NEXT_PUBLIC_API_URL}/subject/get`;
    const token = Cookies.get('token');

    try {
        const response = await axios.post<apiType>(
            api_url,
            {
                key_word: key_word,
            },
            {
                headers: {
                    Authorization: `Bearer ${token}`,
                }
            }
        )
        return response.data;
    } catch (e) {
        return {
            success: false,
            subjects: []
        }
    }
}