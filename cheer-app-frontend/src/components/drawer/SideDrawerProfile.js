import React from 'react';
import {withRouter,Link} from 'react-router-dom';

import {logout} from '../users/UserFunctions'


const SideDrawerProfile = props => {
    
    const organizerPic = 'https://cheerapp.s3.eu-west-2.amazonaws.com/organizers/'+props.username+'.png'
    const userPic = 'https://cheerapp.s3.eu-west-2.amazonaws.com/users/'+props.username+'.png'
    
    const viewUserProfile=()=>{
        props.history.push({
            pathname: '/users/'+props.username,
            state:{
                username:props.username,
            }
        })
    }

    const viewOrganizerProfile=()=>{
        props.history.push({
            pathname: '/organizers/'+props.username,
            state:{
                username:props.username,
            }
        })
    }

    const logOut=()=>{
        logout().then(response=>{
            
            if (!response.error) {
                props.logOut();
                props.history.push('/');
            }else{
                alert(response.error);
            }
        })
    }
    if(props.userLoggedIn||props.organizerLoggedIn){
        return(
            <div className='side-drawer-profile'>
                {
                
                    props.organizerLoggedIn &&
                    <div className='side-drawer-profile-image'>
                        <img style={{width:'150px', height:'150px', borderRadius:'75px'}} src={organizerPic} onError={(e)=>{e.target.src='https://cheerapp.s3.eu-west-2.amazonaws.com/default/organizer.png'}} alt='account img'/>
                    </div>
                }
                {props.userLoggedIn &&
                    <div className='side-drawer-profile-image'>
                        <img style={{width:'150px', height:'150px', borderRadius:'75px'}} src={userPic} onError={(e)=>{e.target.src='https://cheerapp.s3.eu-west-2.amazonaws.com/default/user.png'}} alt='account img'/>
                    </div>
                }
                
                <div className='side-drawer-profile-info'>
                    <h3>Hello, {props.username}</h3>
                    {props.userLoggedIn &&
                        <button className='side-drawer-profile-view-button' onClick={viewUserProfile}> View Profile</button> 
                    }
                    {props.organizerLoggedIn &&
                        <button className='side-drawer-profile-view-button' onClick={viewOrganizerProfile} > View Profile</button> 
                    }                    
                    <button className='side-drawer-profile-logout-button' onClick={logOut}> Log Out</button>
                </div>   
            </div>
        );
    
    }else{
        return(
            <div className='side-drawer-guest'>
                <h3>Entered ad Guest!</h3>
                <p>You can continue as guest</p>
                <p>or</p>
                <br/>
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