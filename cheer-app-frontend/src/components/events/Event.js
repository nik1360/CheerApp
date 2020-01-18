import React, {useState, useEffect} from 'react';

import {retrieveOrganizerDetails,insertRating, deleteRating, userAttendsEvent, userNotAttendsEvent, userEventStatus, getEventDetails} from './EventFunctions'

import '../../styles/EventProfilePage.css'


const Event = props => {
    const [name, setName] = useState('')
    const [description, setDescription] = useState('')
    const [date, setDate] = useState('')
    const [startTime, setStartTime] = useState('23:00')
    const [endTime, setEndTime] = useState('04:00')
    const [city, setCity] = useState('')
    const [address, setAddress] = useState('')
    const [venue, setVenue] = useState('')
    const [price, setPrice] = useState('')
    const [organizer, setOrganizer] = useState('')

    const [flagRock, setFlagRock] = useState(false);
    const [flagHipHop, setFlagHipHop] = useState(false);
    const [flagReggae, setFlagReggae] = useState(false);
    const [flagReggaeton, setFlagReggaeton] = useState(false);
    const [flagTechno, setFlagTechno] = useState(false);
    const [flagElectronic, setFlagElectronic] = useState(false);

    const [ratingValue, setRatingValue] = useState(1)
    const [showAttend, setShowAttend] = useState(true)
    const [showRating, setShowRating] = useState(true)
    const [eventIsPassed, setEventIsPassed] = useState()
    const [friendsList, setFriendsList] = useState([])
    const [showFriendsList, setShowFriendsList] = useState(true)
    
    const [todayDate, setTodayDate] = useState()
    
    useEffect(() => {
        const event ={
            event_code: props.location.state.code
        }
        getEventDetails(event).then(response => {
            var parsed_event = JSON.parse(response.event)
            console.log(parsed_event)
            setName(parsed_event.name)
            setDescription(parsed_event.description)
            setDate(parsed_event.date)
            setStartTime(parsed_event.start_time)
            setEndTime(parsed_event.end_time)
            setCity(parsed_event.venue.city)
            setAddress(parsed_event.venue.address)
            setVenue(parsed_event.venue.name)
            setPrice(parsed_event.price)
            setOrganizer(parsed_event.organizer)

            setFlagRock(parsed_event.music_genres.rock)
            setFlagHipHop(parsed_event.music_genres.hiphop)
            setFlagReggae(parsed_event.music_genres.reggae)
            setFlagReggaeton(parsed_event.music_genres.reggaeton)
            setFlagTechno(parsed_event.music_genres.techno)
            setFlagElectronic(parsed_event.music_genres.electronic) 
        })
    }, [props.location.state.code]);

    useEffect(() => {
        const event ={
            user_username: props.user_username,
            event_code: props.location.state.code
        }
        userEventStatus(event).then(response => {
            if(response.friends_attend_event.length !== 0){
                setShowFriendsList(true)
            }else{
                setShowFriendsList(false)
            }
            setFriendsList(response.friends_attend_event)
            setShowAttend(response.show_attend)
            setShowRating(response.show_rating)
            setRatingValue(response.rating)
        })

        var today = new Date()
        var yyyy=today.getFullYear()
        var mm = today.getMonth()+1
        var dd = today.getDate()
        if(dd<10){
            dd='0'+dd
        }
        if(mm<10){
            mm='0'+mm
        }
        setTodayDate(`${yyyy}-${mm}-${dd}`)

        if(Date.parse(date)< Date.parse(todayDate)){
            setEventIsPassed(true)
        }else{
            setEventIsPassed(false)
        }

    }, [props.location.state.code, date, props.user_username, todayDate, eventIsPassed]);

    const askOrganizer = ()=> {
        const event={
            code:props.location.state.code,
            organizer_username:organizer
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
            organizer_username:organizer,
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
                setShowAttend(true)
            }else{
                alert(response.message)
            }
        })
    }

    const onClickLogin =() => {
        props.history.push('/loginpage')
    }


    const handleClick =() =>{
        const modal = document.querySelector(".modal")
        const closeBtn = document.querySelector(".close")
        modal.style.display = "block";
        closeBtn.addEventListener("click", () => {
          modal.style.display = "none";
        })
    }

    return(
        <div>
            <div className="modal">
                <div className="modal_content">
                <span className="close">&times;</span>
                 <p>You unsuscribed from this event</p>
                </div>
            </div>
            <div className="header">
                <h1>{name}</h1>
                <p><b>Where: </b>{venue} - {address} - {city}</p>
                <p><b>When: </b>{date} <b>from </b> {startTime}<b> to </b> {endTime}</p>
                <p><b>Organised by: </b><i>{organizer}</i> &nbsp; <button className='profile-view-button'>VIEW PROFILE</button></p>
            </div>


            <div className="row">
                <div className="side">
                    <span >
                        <b>Music type:</b> &nbsp;
                    </span>
                    <span >
                        {(flagRock===1) && < button className="genre-btn">Rock</button>}
                        {(flagHipHop===1) && < button className="genre-btn">HipHop</button>}
                        {(flagReggae===1) && < button className="genre-btn">Reggae</button>}
                        {(flagReggaeton===1) && < button className="genre-btn">Reggaeton</button>}
                        {(flagTechno===1) && < button className="genre-btn">Techno</button>}
                        {(flagElectronic===1) && < button className="genre-btn">Electronic</button>}
                        
                    </span>
                        
                    
                    <span> <b>Income price: </b>{price}€ </span>
                    <br/>
                    <h4><b>Event description:</b></h4>
                    <p> {description} </p>
                    <h4><b>Event flyer:</b></h4>
                    <img src="https://pic.pikbest.com/01/56/02/48dpIkbEsTMpR.jpg-1.jpg!bw700" alt="eventflyer" width="400" height="600"/> 
                </div>
            
                <div className="main">
                    
                    {props.userLoggedIn &&
                        <div>
                            {showAttend && !eventIsPassed &&
                                <div>
                                    <button className="btn" onClick={attendEvent}>I WILL ATTEND</button>
                                </div>
                            }
                            {!showAttend && !eventIsPassed &&
                                <div>
                                    <button className="btn" onClick={notAttendEvent}>I WON'T ATTEND ANYMORE</button>
                                </div>
                            }

                            {eventIsPassed &&
                                <div>
                                    <button className="btn" disabled>CAN'T ATTEND, EVENT IS PASSED</button>
                                </div>
                            }
                            
                            <br/>
                            <br/>
                            <button className="btn ticket">BUY TICKETS</button> 
                            <br/>
                            <br/>
                            {showFriendsList &&
                                <div>
                                    <h5 style={{marginTop:'0px', marginBottom:'0px'}}>Friends who are going</h5>
                                    <div className='scrollable'>
                                        <p>
                                            {
                                                (friendsList).map(f =>(
                                                    <i key={f}> {f} <br/> </i> 
                                                ))
                                            }
                                        </p>
                                        
                                    </div>
                                </div>
                                
                            }
                            {!showFriendsList &&
                                <div>
                                    <h5 style={{marginTop:'0px', marginBottom:'0px'}}>Non of your friends is attending the event</h5>
                                    
                                </div>
                                
                            }
                            
                            
                            {showRating && eventIsPassed &&
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

                            {!eventIsPassed &&
                                <div>
                                    <h4 style={{marginTop:'50px', marginBottom:'20px'}}>You have to wait that the event is passed to review the event!</h4>
                                </div>
                                
                            }

                            {!showRating && eventIsPassed &&
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