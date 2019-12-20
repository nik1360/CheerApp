import React, {useState} from 'react';
import {withRouter} from 'react-router-dom';
import {loginUser,loginOrganizer} from './UserFunctions'

import './styles/LoginPage.css'

const LoginPage = props => {
    
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    
    
    const onSubmitUser = e => {
        e.preventDefault()
        const user = {
            u: username,
            p: password,
            errors:{}
        }

        loginUser(user).then(response => {
            if (!response.error) {
                props.loginUser(user.u);
                props.history.push('/');
            }else{
                alert(response.error);
            }
        })
    }

    const onSubmitOrganizer = e => {
        e.preventDefault()
        const organizer = {
            u: username,
            p: password,
            errors:{}
        }

        loginOrganizer(organizer).then(response => {
            if (!response.error) {
                props.loginOrganizer(organizer.u);
                props.history.push('/');
            }else{
                alert(response.error);
            }
        })
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
                <form className="login-form" onSubmit={onSubmitUser}>
                    <input className="form-text" type="text" placeholder="username" value={username} onChange={updateUsername}/>
                    <input className="form-text" type="password" placeholder="password" value={password} onChange={updatePassword}/>
                    <button className="form-button" type="submit" >login as user</button>
                </form>
                <br/>
                <form className="login-form" onSubmit={onSubmitOrganizer} >
                    <button className="form-button" type="submit" >login as organizer</button>
                </form>
                <p className="message">Not registered? <a href="/register">Create an account</a></p>
            </div>
        </div>
        
    );
    
  
}
export default withRouter(LoginPage);