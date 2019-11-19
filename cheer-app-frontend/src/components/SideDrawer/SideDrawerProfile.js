import React from 'react';
import {Link} from 'react-router-dom';

const SideDrawerLinks = props => {
    if(props.userLoggedIn||props.organizerLoggedIn){
        return(
            <div className='side-drawer-profile'>
                <div className='side-drawer-profile-image'>
                    <img src={require('../../images/account.png')} alt='account img' />
                </div>
                <div className='side-drawer-profile-info'>
                    <h3>Hello, {props.username}</h3>
                    <button className='side-drawer-profile-view-button' > View Profile</button> 
                    <button className='side-drawer-profile-logout-button'> Log Out</button>
                </div>   
            </div>
        );
    
    }else{
        return(
            <div className='side-drawer-guest'>
                <h3>Entered ad Guest!</h3>
                <p>You can continue as guest</p>
                <p>or</p>
                <Link to='/login'>
                    <button className='side-drawer-guest-login-button' > Login</button>
                </Link>
                <Link to='/register'>
                    <button className='side-drawer-guest-register-button' type='submit' formAction="/register" > Register</button>
                </Link> 
            </div>
            
        );
    }
}

export default SideDrawerLinks;