import axios from 'axios';
import Cookies from 'js-cookie';

interface apiType {
    success: boolean,
    message: string
}

export default async function (subjects: Array<{name: string, teacherId: number | null}>): Promise<apiType> {
    const api_url = `${process.env.NEXT_PUBLIC_API_URL}/subject/add`;
    const token = Cookies.get('token');

    try {
        const response = await axios.post<{success: boolean, message: string}>(
            api_url,
            {
                subjects: subjects
            },
            {
                headers: {
                Authorization: `Bearer ${token}`,
                }
            }
        );
        return response.data
    } catch (e) {
        console.log(e);
        return {
            success: false,
            message: "登録に失敗しました"
        };
    }
}