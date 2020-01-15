import React, {useState, useEffect} from 'react';

import {retrieveOrganizerDetails,insertRating, deleteRating, userAttendsEvent, userNotAttendsEvent, userEventStatus} from './EventFunctions'

import '../../styles/Event.css'


const Event = props => {

    const [ratingValue, setRatingValue] = useState(1)
    const [showAttend, setShowAttend] = useState(true)
    const [showRating, setShowRating] = useState(true)
    
    useEffect(() => {
        const event ={
            user_username: props.user_username,
            event_code: props.location.state.code
        }
        userEventStatus(event).then(response => {
            setShowAttend(response.show_attend)
            setShowRating(response.show_rating)
            setRatingValue(response.rating)
        })
    }, []);
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

    const submitRating = e => {
        e.preventDefault()
        const rating ={
            event_code:props.location.state.code,
            user_username: props.user_username ,
            organizer_username:props.location.state.organizer,
            rating_value: ratingValue
        }
        insertRating(rating).then(response => {

            if (!response.error) {
                //alert(response.message)
                setShowRating(false)
            }else{
                alert(response.message)
            }
        })
        
    }

    const removeRating = e => {
        e.preventDefault()
        const rating ={
            event_code:props.location.state.code,
            user_username: props.user_username ,
        }
        deleteRating(rating).then(response => {
            if (!response.error) {
                //alert(response.message)
                setShowRating(true)
            }else{
                alert(response.message)
            }
        })  
    }


    const attendEvent = e => {
        e.preventDefault()
        const event ={
            event_code:props.location.state.code,
            user_username: props.user_username ,
        }
        userAttendsEvent(event).then(response => {

            if (!response.error) {
                //alert(response.message)
                setShowAttend(false)
            }else{
                alert(response.message)
            }
        })
        
    }

    const notAttendEvent = e => {
        e.preventDefault()
        const event ={
            event_code:props.location.state.code,
            user_username: props.user_username ,
        }
        userNotAttendsEvent(event).then(response => {

            if (!response.error) {
                alert(response.message)
                setShowAttend(true)
            }else{
                alert(response.message)
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
                    
                    {props.userLoggedIn &&
                        <div>
                            {showAttend &&
                                <div>
                                    <button className="btn" onClick={attendEvent}>I WILL ATTEND</button>
                                </div>
                            }
                            {!showAttend &&
                                <div>
                                    <button className="btn" onClick={notAttendEvent}>I WON'T ATTEND ANYMORE</button>
                                </div>
                            }
                            
                            <br/>
                            <br/>
                            <button className="btn ticket">BUY TICKETS</button> 
                            <br/>
                            <br/>
                            <h5 style={{marginTop:'0px', marginBottom:'0px'}}>Friends who are going</h5>
                            <div className='scrollable'>
                                <p> Friend1,<br/> Friend2 <br/>and <br/> others <br/> are <br/>interested <br/> Friend4,<br/> Friend5 <br/>and <br/>others are going</p>
                            <p/>
                            </div>
                            
                            { showRating &&
                                <div>
                                    <h5 style={{marginTop:'15px', marginBottom:'0px'}}>Rate this event!</h5>
                                    <form id="rating" method="post" onSubmit={submitRating}>
                                        <fieldset className="rating">
                                            <input name="rating" type="radio" id="rating5" value="5" onClick={() => {setRatingValue(5)}}/>
                                            <label htmlFor="rating5" title="5 stars">☆</label>

                                            <input name="rating" type="radio" id="rating4" value="4" onClick={() => {setRatingValue(4)}}/>
                                            <label htmlFor="rating4" title="4 stars">☆</label>

                                            <input name="rating" type="radio" id="rating3" value="3" onClick={() => {setRatingValue(3)}}/>
                                            <label htmlFor="rating3" title="3 stars">☆</label>

                                            <input name="rating" type="radio" id="rating2" value="2" onClick={() => {setRatingValue(2)}}/>
                                            <label htmlFor="rating2" title="2 stars">☆</label>

                                            <input name="rating" type="radio" id="rating1" value="1" onClick={() => {setRatingValue(1)}}/>
                                            <label htmlFor="rating1" title="1 stars">☆</label>
                                        </fieldset>
                                        <button className="btn" type="submit"  value="Submit">Submit your rating!</button>
                                     </form>
                                </div>
                            }
                            {!showRating &&
                                <div>
                                    <h4 style={{marginTop:'50px', marginBottom:'20px'}}>You have already rated this event with {ratingValue} stars!</h4>
                                    <button className="btn " style={{backgroundColor:'#ee4540'}} onClick={removeRating}>DELETE YOUR RATING</button>
                                </div>
                                
                            }

                        </div>


                    }
                    {!props.userLoggedIn&&
                        <div>
                            <p><b>You have to be logged in to attend an event and buy tickets!</b></p>
                            <button className="btn " style={{backgroundColor:'#ee4540'}} onClick={onClickLogin}>Login</button>
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