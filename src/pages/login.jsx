import React, { useState } from 'react'
import { useHistory } from 'react-router-dom'
import { login } from './../utils/api'
import Cookies from 'universal-cookie';

const cookies = new Cookies();

function Login() {
    let history = useHistory();
    const [user, setUser] = useState({ nickName: '', password: '' })
    async function userLogin() {
        try {
            let response = await login(user)
            if (response) {
                cookies.set('token', "", { path: '/' })
                cookies.set('token', response.data.access_token, { path: '/' })
                localStorage.setItem('token', response.data.access_token)
                history.push('/home')
            }
        } catch (err) {
            console.log(err.response.data)
        }
    }

    function valueChange(event) {
        let temp = { ...user }
        temp[event.target.name] = event.target.value
        setUser(temp)
    }

    return (
        <div className="container-fluid">
            <div className="row">
                <div className="col-md-12">
                    <h4>Login</h4>
                    <form action="" className="aa-login-form">
                        <label for="">Username <span>*</span></label>
                        <input type="text" value={user.nickName} name="nickName" onChange={valueChange} placeholder="Username or email" />
                        <label for="">Password<span>*</span></label>
                        <input type="password" value={user.password} onChange={valueChange} name="password" placeholder="Password" />
                        <button type="button" onClick={userLogin} className="aa-browse-btn">Login</button>
                    </form>
                </div>
            </div>
        </div>
    )
}

export { Login }