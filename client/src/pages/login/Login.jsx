import React,{useContext, useRef} from 'react'
import './login.css'
import { loginCall } from '../../apiCalls';
import { AuthContext } from '../../context/AuthContext';
import {Link} from 'react-router-dom';
//import CircularProgress from '@mui/material/CircularProgress'
export const Login = () => {
    const email = useRef();
    const password = useRef();

    const {user,isFetching,isError,dispatch} = useContext(AuthContext) 

    const handleClick= (e) =>{
        e.preventDefault();
        loginCall({email:email.current.value,password:password.current.value},dispatch)
        console.log(user);
        localStorage.setItem('user',user);
    }

    return (
        <div className='login'>
            <div className="loginWrapper">
                <div className="loginLeft">
                    <h3 className='loginLogo'>Social Book</h3>
                    <span className="loginDesc">Connect with Friends</span>     
                </div>
                <div className="loginRight">
                    <form onSubmit={handleClick} className="loginBox">
                        <input type="email" placeholder='E-Mail' className="loginInput" required ref={email} />
                        <input type="password" placeholder='Password' className="loginInput" required min-length='6' ref={password}/>
                        <button className="loginButton" type='submit' disabled={isFetching}>{isFetching ? 'Loading' : 'Log In'}</button>
                        <span className="loginForgot">Forgot Password</span>
                        <button className="loginRegisterButton">
                            <Link to='/register'>Create new account</Link>
                        </button>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default Login
