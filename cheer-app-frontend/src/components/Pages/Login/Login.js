import React from 'react';
import {withRouter} from 'react-router-dom';
import './Login.css'

const Login = props => {
    
    const loginUser = e =>{
        props.loginUser();

        props.history.push('/');
        e.preventDefault();
    }

    const loginOrganizer = e =>{
        props.loginOrganizer();

        props.history.push('/');
        e.preventDefault();
    }

    return(
        <div className="login-page">
            <div className="form">
                <form className="login-form" onSubmit={loginUser} action="/">
                    <input type="text" placeholder="username"/>
                    <input type="password" placeholder="password"/>
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