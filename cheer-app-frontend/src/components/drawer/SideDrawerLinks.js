import React from 'react';
import {Link} from 'react-router-dom';

const SideDrawerLinks = props => {
    if(props.userLoggedIn){
        return(
            <ul>
                <Link to="/">
                    <li>Home (user)</li>
                </Link>
                <Link to="/findeventpage">
                    <li>Find Events</li>
                </Link>
                <Link to="/">
                    <li>Suggest Me!</li>
                </Link>
                <Link to="/">
                    <li>Find Friends</li>
                </Link>
            </ul>
        );
    
    }else{
        if(props.organizerLoggedIn){
            return(
                <ul>
                    <Link to="/">
                        <li>Home (organizer)</li>
                    </Link>
                    <Link to="/">
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
                        <li>Home (guest)</li>
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