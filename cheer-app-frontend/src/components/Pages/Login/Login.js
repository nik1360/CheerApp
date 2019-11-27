import React, {useState} from 'react';
import {withRouter} from 'react-router-dom';
import './Login.css'

const Login = props => {
    
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    
    const loginUser = e =>{
        if((username===props.username)&&(password===props.password)){
            props.loginUser();
            props.history.push('/');
        }else{
            alert('Username or password incorrect');
        }
        e.preventDefault();
    }

    const loginOrganizer = e =>{
        if((username===props.username)&&(password===props.password)){
            props.loginOrganizer();
            props.history.push('/');
        }else{
            alert('Username or password incorrect');
        }
        e.preventDefault();
    }

    const updateUsername = e =>{
        setUsername(e.target.value);
    }

    const updatePassword = e =>{
        setPassword(e.target.value);
    }

    return(
        <div className="login-page">
            <div className="form">
                <form className="login-form" onSubmit={loginUser} method="post">
                    <input type="text" placeholder="username" value={username} onChange={updateUsername}/>
                    <input type="password" placeholder="password" value={password} onChange={updatePassword}/>
                    <button type="submit" >login as user</button>
                </form>
                <br/>
                <form className="login-form" onSubmit={loginOrganizer} action="/">
                    <button type="submit" >login as organizer</button>
                </form>
                <p className="message">Not registered? <a href="/register">Create an account</a></p>
            </div>
        </div>
        
    );
    
  
}
export default withRouter(Login);