import { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import axios from 'axios';
import Auth from './Auth';

function Form (): JSX.Element {

    const [loginId, setLoginId] = useState("")
    const [password, setPassword] = useState("")
    const [passwordType, setPasswordType] = useState("password")
    const [errorMessage, setErrorMessage] = useState("")
    const navigate = useNavigate();

  return (
    <div className='flex flex-col justify-center items-center h-[calc(100vh-100px)] w-screen'>
        <p className='p-3'>{errorMessage}</p>
        <form className='border p-10 w-1/2' onSubmit={(e) => {
            e.preventDefault();
            try {
                if (Auth(loginId, password).status === 200) {
                    navigate('/top')
                } else {
                    throw new Error('ログイン情報が正しくありません。');
                }
            } catch (e) {
                setErrorMessage("ログイン情報が正しくありません。")
            }
        }}>
            <p className='text-5xl flex justify-center p-5'>ログイン</p>
            <hr />
            <div className='py-3.5'>
                <label className='text-xl p-1'>ログインID</label>
                <input
                    className='w-full p-4 border text-lg'
                    value={loginId}
                    type='text'
                    placeholder='ログインID'
                    name='loginId'
                    onChange={(e) => setLoginId(e.target.value)}
                />
            </div>
            <div className='py-3.5'>
                <label className='text-xl p-1'>パスワード</label>
                {passwordType === "password" && (
                    <VisibilityOffIcon
                        onClick={() => setPasswordType("text")}
                        className="pb-1"
                    />
                )}
                {passwordType === "text" && (
                    <VisibilityIcon
                        onClick={() => setPasswordType("password")}
                        className="pb-1"
                    />
                )}
                <input
                    className='w-full p-4 border text-lg'
                    value={password}
                    type={passwordType}
                    placeholder='パスワード'
                    name='password'
                    onChange={(e) => setPassword(e.target.value)}
                />
            </div>
            <div className='pt-2 pr-2 flex justify-end'>
                <button className='p-4 border text-lg rounded-xl' type='submit'>ログイン</button>
            </div>
        </form>

    </div>
  )
}

export default Form