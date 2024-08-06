import React, { useState } from 'react'
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";

const Form = () => {

    const [password, setPassword] = useState("");
    const [passwordType, setPasswordType] = useState("password");

  return (
    <div className='grid place-items-center h-screen w-full scroll pb-40'>

        <form className='border p-10 w-1/2'>
                <p className='text-5xl flex justify-center p-5'>ログイン</p>
                <hr />

                <div className='py-3.5'>
                    <label className='text-xl p-1'>ログインID</label>
                    <input className='w-full p-4 border text-lg' type='text' placeholder='ログインID' name='login_id'/>
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
                    <button className='p-4 border text-lg rounded-xl'>ログイン</button>
                </div>
        </form>

    </div>
  )
}

export default Form