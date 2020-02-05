import React, {useState, useEffect} from 'react';

import {retrieveOrganizerDetails,insertRating, deleteRating, userAttendsEvent, userNotAttendsEvent, userEventStatus, getEventDetails, inviteToEvent} from './EventFunctions'
import TodayDate from '../TodayDate' 
import { toast } from 'react-toastify';

import '../../styles/EventProfilePage.css'
import { trackPromise } from 'react-promise-tracker';
import Popup from "reactjs-popup";
import {post} from "axios"

import api from '../Config'

const Event = props => {

    /* States tht are necessary for the correct behaviour of the component */
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
    const [friendsAttendantList, setFriendsAttendantList] = useState([])
    const [friendsNotAttendantList, setFriendsNotAttendantList] = useState([])
    const [showFriendsList, setShowFriendsList] = useState(true)
    
    const [todayDate, setTodayDate] = useState()
    const flyerURL = 'https://cheerapp.s3.eu-west-2.amazonaws.com/events/'+props.location.state.code+'.jpg'
    
    /* When the component is loaded, the client asks the server the details of the event
    and the info related to the user (attendance, friends list and review)  */
    useEffect(() => {
        const event ={
            event_code: props.location.state.code,
            user_username: props.user_username
        }
        trackPromise(
            getEventDetails(event).then(response => {
                var parsed_event = JSON.parse(response.event)
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
    
                
                if(props.userLoggedIn){
                    userEventStatus(event).then(response => {
                        if(response.friends_attend_event.length !== 0){
                            setShowFriendsList(true)
                        }else{
                            setShowFriendsList(false)
                        }
                        setFriendsAttendantList(response.friends_attend_event)
                        setFriendsNotAttendantList(response.friends_not_attend_event)
                        setShowAttend(response.show_attend)
                        setShowRating(response.show_rating)
                        setRatingValue(response.rating)
                    })
                }
            })
        )
        
    }, [props.location.state.code, props.userLoggedIn, props.user_username]);

    /* retrieve the current date and check if the event is passed */
    useEffect(() => {
        setTodayDate(TodayDate())
        setEventIsPassed(Date.parse(date)< Date.parse(todayDate))
    }, [date, todayDate, eventIsPassed]);


    /*Send an email to the organizer */
    const askOrganizer = ()=> {
        const event={
            code:props.location.state.code,
            organizer_username:organizer
        }
        trackPromise(
            retrieveOrganizerDetails(event).then(response => {

                if (!response.error) {
                    window.location.href='mailto:'+response.email+'?subject=Questions about CheerApp event "'+name+'"'
                }else{
                    console.log(response.msg)
                }
            })
        )
        
    }

    /*Rate the event */
    const submitRating = e => {
        e.preventDefault()
        
        const rating ={
            event_code:props.location.state.code,
            user_username: props.user_username ,
            organizer_username:organizer,
            rating_value: ratingValue
        }
        trackPromise(
            insertRating(rating).then(response => {

                if (!response.error) {
                    //alert(response.message)
                    toast.success('Rating submitted successfully!')
                    setShowRating(false)
                }else{
                    toast.error(response.message)
                }
            })  
        )
        
    }

    /* Delete the previous rating of the event */
    const removeRating = e => {
        e.preventDefault()
        const rating ={
            event_code:props.location.state.code,
            organizer_username:organizer,
            user_username: props.user_username,
        }
        trackPromise(
            deleteRating(rating).then(response => {
                if (!response.error) {
                    //alert(response.message)
                    toast.success('Rating removed successfully!')
                    setShowRating(true)
                }else{
                    toast.error(response.message)
                }
            }) 
        )
         
    }

    /*Attend the event */
    const attendEvent = e => {
        e.preventDefault()
        const event ={
            event_code:props.location.state.code,
            user_username: props.user_username ,
        }
        trackPromise(
            userAttendsEvent(event).then(response => {

                if (!response.error) {
                    //alert(response.message)
                    toast.success('You will now attend the event!')
                    setShowAttend(false)
                }else{
                    toast.error(response.message)
                }
            })
        )
        
        
    }

    /*Delete the attendance to the event*/
    const notAttendEvent = e => {
        e.preventDefault()
        const event ={
            event_code:props.location.state.code,
            user_username: props.user_username ,
        }
        trackPromise(
            userNotAttendsEvent(event).then(response => {

                if (!response.error) {
                    toast.warn('You will not attend the event anymore!')
                    setShowAttend(true)
                }else{
                    toast.error(response.message)
                }
            })
        )
        
    }

    /*Redirect to the login page */
    const onClickLogin =() => {
        props.history.push('/loginpage')
    }

    const viewUserProfile = f =>{
        props.history.push({
            pathname: '/users/'+f,
            state:{
                username:f,
            }
        })
    }

    const inviteFriend=f=>{
        const struct ={
            sender: props.user_username,
            recipient: f,
            event_code: props.location.state.code,
            event_name: name
        }

        trackPromise(
            inviteToEvent(struct).then(response => {
                if (!response.error) {
                    toast.success('Friend invited succesfully!')
                }else{
                    toast.error(response.message)
                }
            })
        )
    }

    const [file, setFile] = useState(null)

    const changeFile = e =>{
        setFile(e.target.files[0])
    }
    
    const onFileSubmit = () =>{
        trackPromise(
            fileUpload(file).then((response)=>{
                console.log(response.data.error)
                if(!response.data.error){
                    window.location.reload()
                    toast.success('File successfully uploaded!')
                }else{
                    toast.error(response.message)
                }
            })
        )     
        
    }

    const fileUpload= file =>{
        const url = api+'/events/'+props.location.state.code+'/uploadFlyer';
        const formData = new FormData();
        formData.append('flyer',file)
        formData.append('filename', props.location.state.code+'.jpg')
        const config = {
            headers: {
                'content-type': 'multipart/form-data'
            }
        }
        return  post(url, formData,config)
    }
    /* --------------------------------------- CONDITIONAL RENDER ---------------------------------------------- */
    function Rating(){
        if(props.organizerLoggedIn){
            return null
        }
        if(props.userLoggedIn){
            if(showRating && eventIsPassed){
                return(
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
                )
            }
            if(!showRating && eventIsPassed){
                return(
                    <div>
                        <h4 style={{marginTop:'50px', marginBottom:'20px'}}>You have already rated this event with {ratingValue} stars!</h4>
                        <button className="btn " style={{backgroundColor:'#ee4540'}} onClick={removeRating}>DELETE YOUR RATING</button>
                    </div>
                )  
            }
            if(!eventIsPassed){
                return(
                    <div>
                        <h4 style={{marginTop:'50px', marginBottom:'20px'}}>You have to wait that the event is passed to review the event!</h4>
                    </div>
                )                       
            }
        }else{
            return null
        }
    }

    function InviteFriends(){
        if(friendsNotAttendantList.length>0){
            return(
                <table id='results-table'> 
                    <tbody>
                    <tr>
                        <th colspan="2">FRIENDS</th>
                    </tr>
                    {
                        (friendsNotAttendantList).map(f =>(
                            <tr key={f} >
                                <td onClick={()=>viewUserProfile(f)}>{f}</td>
                                <td><button class="invite" onClick={()=>{inviteFriend(f)}}>Invite</button></td>
                            </tr>
                        ))
                    }
                    </tbody>
                </table>              
            )
        }else{
            return(
                <h2 style={{textAlign:'center',color:'black'}}>You have no friends that you can invite!</h2>
            )
        }
    }
    function Friends(){
        if(props.organizerLoggedIn){
            return null
        }
        if(props.userLoggedIn){
            if(showFriendsList){
                return(
                    <div>
                        <br/>
                        <div className='scrollable'>
                        <table className="attending-table">
                            <tbody>
                                <tr>
                                    <th>Friends who are going</th>
                                </tr>
                                {
                                    (friendsAttendantList).map(f =>(
                                        <tr key={f} onClick={()=>viewUserProfile(f)}>
                                            <td>{f}</td>
                                        </tr>                            
                                        ))
                                }
                            </tbody>
                        </table>    
                        </div>
                        <Popup modal trigger={<button className="invitefriends" >Invite Friends</button>} position="left center">
                                <InviteFriends/>    
                        </Popup>                      
                    </div>
                )
            }else{
                return(
                    <div>
                        <br/>
                        <h4 style={{marginTop:'0px', marginBottom:'0px'}}>None of your friends is attending the event</h4>
                        <br/>
                        <Popup trigger={<button className="invitefriends" >Invite Friends</button>} position="left center">
                            
                            <table id='results-table'> 
                                <tbody>
                                    <tr>
                                        <th colspan="2">FRIENDS</th>
                                    </tr>
                                {
                                    (friendsNotAttendantList).map(f =>(
                                        <tr key={f} >
                                            <td onClick={()=>viewUserProfile(f)}>{f}</td>
                                            <td><button class="invite" onClick={()=>{inviteFriend(f)}}>Invite</button></td>
                                        </tr>
                                    ))
                                }
                                </tbody>
                            </table>
                            
                        </Popup>
                    </div>
                )
            }
        }else{
            return null
        }
    }

    function Attendance(){
        if(props.organizerLoggedIn){
            return null
        }
        if(props.userLoggedIn){
            if(showAttend && !eventIsPassed){
                return(
                    <button className="attend" onClick={attendEvent}>I WILL ATTEND</button>
                )
            }
            if(!showAttend && !eventIsPassed){
                return(
                    <button className="noattend" onClick={notAttendEvent}>I WON'T ATTEND ANYMORE</button>
                )
            }
            if(eventIsPassed){
                return(
                    <button className="btn" disabled>EVENT IS PASSED</button>
                )
            }
            
        }else{
            return(
                <div>
                    <p><b>You have to be logged in to attend an event and buy tickets!</b></p>
                    <br/>
                    <button className="btn " style={{backgroundColor:'#ee4540'}} onClick={onClickLogin}>Login</button>
                    <br/>
                    <br/>
                </div>
            )
        }
    }

    function BuyTickets(){
        if(props.organizerLoggedIn){
            return null
        }
        if(props.userLoggedIn){
            const script = document.createElement("script");
            script.src = "https://checkout.stripe.com/checkout.js";
            script.async = true;

            document.body.appendChild(script);

            return(
                <div>
                    <br/>
                    <form style={{marginLeft:'65px'}}action="/charge" method="post">
                    <script
                        src="https://checkout.stripe.com/checkout.js"
                        className="stripe-button"
                        data-key="pk_test_vmJlznHnNFRVjoz1ed3PWCaZ00urrW39vK"
                        data-description={'Payment for event ' + name}
                        data-currency='eur'
                        data-amount={price*100}
                        data-locale="auto">
                    </script>
                    </form>
                </div>
                  
            )
        }
        else{
            return null
        }
    }

    function ContactOrganizer(){
        if(props.organizerLoggedIn){
            return null
        }else{
            return(
                <button className="btn" onClick={askOrganizer}>Contact the organizer</button>
            )
        }
    }

    
    /*------------------------------ Main render of the component    ---------------------------------*/
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
                {!props.organizerLoggedIn &&
                    <p><b>Organised by: </b><i>{organizer}</i> &nbsp; <button className='profile-view-button'>VIEW PROFILE</button></p>
                }
                
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
                    <img src={flyerURL} alt="eventflyer" width="500" height="600" onError={(e)=>{e.target.src='https://cheerapp.s3.eu-west-2.amazonaws.com/default/event_flyer.jpg'}}/> 
                </div>
            
                <div className="main"> 
                    {props.organizerLoggedIn &&
                        <div>
                            <button className="noattend" style={{width:'250px'}} >CANCEL EVENT</button><br/>
                            <Popup modal trigger={<button className = "btn"> UPDATE FLYER </button>} position="left center">
                                <div>
                                    <input  type='file' onChange={changeFile}/> <br/>
                                    <button className='btn' onClick={onFileSubmit}> Upload flyer </button>
                                </div>
                            </Popup> 
                        </div>
                        
                    }
                    <Attendance/>
                    <Friends/>
                    <br/>
                    <BuyTickets/>
                    <Rating/>
                    <br/>
                    <ContactOrganizer/>
                </div>
            </div>
        </div>
    )
};
export default Event;