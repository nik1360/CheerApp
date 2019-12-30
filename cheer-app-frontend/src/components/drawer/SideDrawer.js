import React from 'react';
import SideDrawerLinks from './SideDrawerLinks'
import SideDrawerProfile from './SideDrawerProfile'

import'../../styles/SideDrawer.css';

const SideDrawer = props =>{
    let drawerClasses = 'side-drawer'

    if(props.show){
        drawerClasses = 'side-drawer open'
    }
    
    return(
        <nav className={drawerClasses}>
            <div className = 'side-drawer-logo'>
                <img src={require('../../images/cheerApp_logo.png')} alt='cheerApp_logo' />
            </div>
            <SideDrawerProfile userLoggedIn={props.user} organizerLoggedIn={props.organizer}
                username={props.username} logOut={props.logOut}/>
            <SideDrawerLinks userLoggedIn={props.user} organizerLoggedIn={props.organizer}/>
        </nav>
    )  
};




export default SideDrawer;
