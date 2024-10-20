import axios from 'axios';
import Cookies from 'js-cookie';

interface apiType {
    success: boolean,
    subjects: Array<{
        value: number,
        label: string,
    }>
}

export default async function (): Promise<apiType> {
    const api_url = `${process.env.NEXT_PUBLIC_API_URL}/subject/select`;
    const token = Cookies.get('token');

    try {
        const response = await axios.post<apiType>(
            api_url,
            {},
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