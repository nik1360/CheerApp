import React from 'react';

import {retrieveOrganizerDetails} from './EventFunctions'

import '../../styles/Event.css'


const Event = props => {

    const askOrganizer = ()=> {
        const event={
            code:props.location.state.code,
            organizer_username:props.location.state.organizer
        }
        retrieveOrganizerDetails(event).then(response => {

            if (!response.error) {
                window.location.href='mailto:'+response.email+'?subject=Questions about CheerApp event "'+props.location.state.name+'"'
            }else{
                console.log(response.msg)
            }
        })

    }
    const onClickLogin =() => {
        props.history.push('/loginpage')
    }
    return(
        <div>
            <div className="header">
                <h1>{props.location.state.name}</h1>
                <p><b>Where: </b>{props.location.state.venue.name} - {props.location.state.venue.address} - {props.location.state.venue.city}</p>
                <p><b>When: </b>{props.location.state.date} <b>from </b> {props.location.state.start_time}<b> to </b> {props.location.state.end_time}</p>
                <p><b>Organised by: </b><i>{props.location.state.organizer}</i> &nbsp; <button className='profile-view-button'>VIEW PROFILE</button></p>
            </div>


            <div className="row">
                <div className="side">
                    <span >
                        <b>Music type:</b> &nbsp;
                    </span>
                    <span >
                        {
                            (props.location.state.genres).map(g =>(
                                <button type='button' className='genre-btn' key={g}> {g} </button>
                            ))
                        }
                    </span>
                        
                    
                    <span> <b>Income price: </b>{props.location.state.price}€ </span>
                    <br/>
                    <h4><b>Event description:</b></h4>
                    <p> {props.location.state.description} </p>
                    <h4><b>Event flyer:</b></h4>
                    <img src="https://pic.pikbest.com/01/56/02/48dpIkbEsTMpR.jpg-1.jpg!bw700" alt="eventflyer" width="400" height="600"/> 
                </div>
            
                <div className="main">
                    
                    {props.userLoggedIn&&
                        <div>
                            <button className="btn ">ATTEND</button>
                            <br/>
                            <br/>
                            <button className="btn ticket">BUY TICKETS</button> 
                            <br/>
                            <br/>
                            <h5>Friends who are going</h5>
                            <div className='scrollable'>
                                <p> Friend1,<br/> Friend2 <br/>and <br/> others <br/> are <br/>interested <br/> Friend4,<br/> Friend5 <br/>and <br/>others are going</p>
                            <p/>
                            </div>
                        </div>


                    }
                    {!props.userLoggedIn&&
                        <div>
                            <p><b>You have to be logged in to attend an event and buy tickets!</b></p>
                            <button className="btn " style={{backgroundColor:'red'}} onClick={onClickLogin}>Login</button>
                            <br/>
                            <br/>
                        </div>

                    }
                    
                    
                    
                    
                    <br/>
                    <button className="btn" onClick={askOrganizer}>Contact the organizer</button>
                </div>
            </div>
        </div>
    )

};
export default Event;