import axios from 'axios';
import Cookies from 'js-cookie';

export default async function (students: Array<{name: string, email: string, courseId: number | null}>): Promise<{success: boolean, message: string}> {
    const api_url = `${process.env.NEXT_PUBLIC_API_URL}/student/add`;
    const token = Cookies.get('token');

    try {
        const response = await axios.post<{success: boolean, message: string}>(
            api_url,
            {
                students: students
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
