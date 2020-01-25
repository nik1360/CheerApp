import React from 'react';
import {Link} from 'react-router-dom';

const SideDrawerLinks = props => {


    if(props.userLoggedIn){
        return(
            <ul>
                <Link to="/">
                    <li>Home</li>
                </Link>
                <Link to="/findeventpage">
                    <li>Find Events</li>
                </Link>
                <Link to="/finduserpage">
                    <li>Find Friends</li>
                </Link>
                <Link to="/suggesteventpage">
                    <li>Suggest Me!</li>
                </Link>
                
            </ul>
        );
    
    }else{
        if(props.organizerLoggedIn){
            return(
                <ul>
                    <Link to="/">
                        <li>Home</li>
                    </Link>
                    <Link to="/createeventpage">
                        <li>Create Event</li>
                    </Link>
                    <Link to="/">
                        <li>Edit Event</li>
                    </Link>
                </ul>
            );  
        }
        else{
            return(
                <ul>
                    <Link to="/">
                        <li>Home</li>
                    </Link>
                    <Link to="/findeventpage">
                        <li>Find Events</li>
                    </Link>
                    
                </ul>
            );
            
        }
    }
}

export default SideDrawerLinks;