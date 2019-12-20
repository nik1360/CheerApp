import React from 'react';
import {withRouter,Link} from 'react-router-dom';

const SideDrawerProfile = props => {
    const logOut=()=>{
        props.logOut();
        props.history.push('/');
    }
    if(props.userLoggedIn||props.organizerLoggedIn){
        return(
            <div className='side-drawer-profile'>
                {props.organizerLoggedIn &&
                    <div className='side-drawer-profile-image'>
                        <img src={require('../../images/organizer.png')} alt='account img' />
                    </div>
                }
                {props.userLoggedIn &&
                    <div className='side-drawer-profile-image'>
                        <img src={require('../../images/user.png')} alt='account img' />
                    </div>
                }
                
                <div className='side-drawer-profile-info'>
                    <h3>Hello, {props.username}</h3>
                    <button className='side-drawer-profile-view-button' > View Profile</button> 
                    <button className='side-drawer-profile-logout-button'onClick={logOut}> Log Out</button>
                </div>   
            </div>
        );
    
    }else{
        return(
            <div className='side-drawer-guest'>
                <h3>Entered ad Guest!</h3>
                <p>You can continue as guest</p>
                <p>or</p>
                <Link to='/loginpage'>
                    <button className='side-drawer-guest-login-button' > Login</button>
                </Link>
                <Link to='/registerpage'>
                    <button className='side-drawer-guest-register-button' type='submit' formAction="/register" > Register</button>
                </Link> 
            </div>
            
        );
    }
}

export default withRouter(SideDrawerProfile);