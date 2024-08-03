import React, { useState } from 'react'
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";

const Form = () => {

    const [password, setPassword] = useState("");
    const [passwordType, setPasswordType] = useState("password");

  return (
    <div className='Form'>

        <form>
            <div className='form_whole'>
                <h1>ログイン</h1>
                <hr />

                <div className='form_part'>
                    <label>ログインID</label>
                    <input type='text' placeholder='ログインID' name='login_id'/>
                </div>
                <div className='form_part'>
                    <label>パスワード</label>
                    <input
                        value={password}
                        type={passwordType}
                        placeholder='パスワード'
                        name='password'
                        onChange={(e) => setPassword(e.target.value)}
                    />
                    {passwordType === "password" && (
                        <VisibilityOffIcon
                            onClick={() => setPasswordType("text")}
                            className="Password__visual"
                        />
                    )}
                    {passwordType === "text" && (
                        <VisibilityIcon
                            onClick={() => setPasswordType("password")}
                            className="Password__visual"
                        />
                    )}
                </div>

                <button>ログイン</button>

            </div>
        </form>

    </div>
  )
}

export default Form