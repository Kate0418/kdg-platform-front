import axios from 'axios';
import Cookies from 'js-cookie';

export interface Props {
    keyWord: string;
}

export interface Response {
    success: boolean,
    subjects: Array<{
        id: number,
        name: string,
        teacher_name: string
    }>
}

export async function SubjectGet ({ keyWord }: Props): Promise<Response> {
    const api_url = `${process.env.NEXT_PUBLIC_API_URL}/subject/get`;
    const token = Cookies.get('token');

    try {
        const response = await axios.post<Response>(
            api_url,
            {
                keyWord: keyWord,
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