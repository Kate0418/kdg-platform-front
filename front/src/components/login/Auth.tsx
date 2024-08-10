import axios from 'axios';

async function Auth (loginId: string, password: string) {
    const url = `${import.meta.env.VITE_API_URL}/login`;
    const response = await axios.post(url, {
        login_id: loginId,
        password: password,
    });
    return response;
}

export default Auth