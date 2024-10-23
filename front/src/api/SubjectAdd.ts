import axios from 'axios';
import Cookies from 'js-cookie';

export interface Props {
    subjects: Array<{
        name: string,
        teacherId: {
            value: number,
            label: string,
        } | null
    }>
}

export interface Response {
    success: boolean,
    message: string
}

export async function SubjectAdd ({ subjects }: Props): Promise<Response> {
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