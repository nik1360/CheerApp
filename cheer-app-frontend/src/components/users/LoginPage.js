import React, {useState} from 'react';
import {withRouter} from 'react-router-dom';
import {loginUser,loginOrganizer} from './UserFunctions'
import { toast } from 'react-toastify';

import '../../styles/LoginRegisterPage.css'
import { trackPromise } from 'react-promise-tracker';

const LoginPage = props => {
    
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    
    const onSubmitUser = e => {
        e.preventDefault()
        const user = {
            u: username.trim(),
            p: password,
            errors:{}
        }
        trackPromise(
            loginUser(user).then(response => {
                if (!response.error) {
                    props.loginUser(response.username);
                    toast.success('You are logged in as '+ response.username)
                    props.history.goBack();
                }else{
                    toast.error(response.message)
                }
            })
        )
        
    }

    const onSubmitOrganizer = e => {
        e.preventDefault()
        const organizer = {
            u: username.trim(),
            p: password,
            errors:{}
        }

        trackPromise(
            loginOrganizer(organizer).then(response => {
                if (!response.error) {
                    props.loginOrganizer(organizer.u);
                    toast.success('You are logged in as '+ organizer.u)
                    props.history.goBack();
                }else{
                    toast.error(response.message);
                }
            })
        )
        
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
                <form  onSubmit={onSubmitUser}>
                    <input className="form-text" type="text" placeholder="username" value={username} onChange={updateUsername}/>
                    <input className="form-text" type="password" placeholder="password" value={password} onChange={updatePassword}/>
                    <button className="form-button" type="submit" >login as user</button>
                </form>
                <br/>
                <form  onSubmit={onSubmitOrganizer} >
                    <button className="form-button" type="submit" >login as organizer</button>
                </form>
                <p className="message">Not registered? <a href="/registerpage">Create an account</a></p>
            </div>
        </div>
        
    );
    
  
}
export default withRouter(LoginPage);