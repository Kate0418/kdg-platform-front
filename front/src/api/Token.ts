import axios from 'axios';

export default async function Token(): Promise<boolean> {
    const api_url = `${process.env.NEXT_PUBLIC_API_URL}/user`;
    const token = localStorage.getItem('token');
    if (!token) {
        return false;
    }

    try {
        const response = await axios.get(api_url, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });
        if (response.data) {
            localStorage.setItem('user', JSON.stringify(response.data));
            return true;
        }
    } catch (e) {
        return false;
    }

    return false;
}