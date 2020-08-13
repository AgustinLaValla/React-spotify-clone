import React from 'react'
import { loginUrl } from '../spotify';

export const Login = () => {
    return (
        <div className="login">
            <h2>Login page</h2>
            
            <img
                src="https://getheavy.com/wp-content/uploads/2019/12/spotify2019-830x350.jpg"
                alt=""
            />
            
            <a href={loginUrl}>LOGIN WITH SPOTIFY</a>
        </div>
    )
}
