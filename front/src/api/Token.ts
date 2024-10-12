import axios from 'axios';
import Cookies from 'js-cookie';

export default async function Token(): Promise<boolean> {
    const api_url = `${process.env.NEXT_PUBLIC_API_URL}/token`;
    const token = Cookies.get('token');
    if (!token) {
        return false;
    }

    try {
        const response = await axios.get<{success: true}>(api_url, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });
        return response.data.success
    } catch (e) {
        console.error(e);
        return false;
    }
}