import axios from 'axios';
import React,{useRef} from 'react'
import { useNavigate,Link } from 'react-router-dom';
import './register.css';

export const Register = () => {

    const navigate = useNavigate();
    const username = useRef();
    const email = useRef();
    const password = useRef();
    const passwordAgain = useRef();

    const handleClick = async (e) =>{
        e.preventDefault();
        if(passwordAgain.current.value !== password.current.value){
            password.current.setCustomValidity('The passwords don\'t match')
        }else{
            const user = {
                username:username.current.value,
                email: email.current.value,
                password:password.current.value
            }
            try{
                 const res = await axios.post('/auth/register',user,{headers:{"Content-Type" : "application/json",'Authorization': ''}});
                 console.log(res)
                 navigate('/login');

            }catch(err){
                console.log(err.message);
            }
            
        } 
    }

    return (
        <div className='login'>
            <div className="loginWrapper">
                <div className="loginLeft">
                    <h3 className='loginLogo'>Social Book</h3>
                    <span className="loginDesc">Connect with Friends</span>     
                </div>
                <div className="loginRight">
                    <form className="loginBox" onSubmit={handleClick}>
                        <input type="text" placeholder='Username' required ref={username} className="loginInput" />
                        <input type="email" placeholder='E-Mail' required ref={email} className="loginInput" />
                        <input type="password" placeholder='Password' required ref={password} className="loginInput" />
                        <input type="password" placeholder='Password Again' required ref={passwordAgain} className="loginInput" />
                        <button className="loginButton" type='submit'>Sign Up</button>
                        <Link to='/login' className='linkLogin'>
                            <button className="loginRegisterButton">Log into account</button>
                        </Link>
                        
                    </form>
                </div>
            </div>
        </div>
    )
}

export default Register
