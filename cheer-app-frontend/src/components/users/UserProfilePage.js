import React, {useState, useEffect, useCallback} from 'react';
import { toast } from 'react-toastify';
import { trackPromise } from 'react-promise-tracker';
import Popup from "reactjs-popup";
import {post} from 'axios'

import { getUserDetails, checkIfFriend, addUserAsFriend, deleteFriend, acceptInvitation, refuseInvitation } from './UserFunctions';


import TodayDate from '../TodayDate'
import api from '../Config'

import '../../styles/EventProfilePage.css'



const UserProfilePage = props => {
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [dateOfBirth, setDateOfBirth] = useState('');

    const [city, setCity] = useState('');
    const [nationality, setNationality] = useState('');
    const [flagRock, setFlagRock] = useState(false);
    const [flagHipHop, setFlagHipHop] = useState(false);
    const [flagReggae, setFlagReggae] = useState(false);
    const [flagReggaeton, setFlagReggaeton] = useState(false);
    const [flagTechno, setFlagTechno] = useState(false);
    const [flagElectronic, setFlagElectronic] = useState(false);

    const [friendsList, setFriendsList] = useState([])
    const [eventsList, setEventsList] = useState([])
    const [invitationsList, setInvitationsList] = useState([])
    const [loggedUserProfile, setLoggedUserProfile] = useState(true)
    const [loggeUserIsFriend, setLoggedUserIsFriend] = useState(false)
    


    const [todayDate, setTodayDate] = useState()

    const profilePicURL='https://cheerapp.s3.eu-west-2.amazonaws.com/users/'+props.location.state.username+'.png'
    
    useEffect(() => {
        setTodayDate(TodayDate())
    }, []);

    const retrieveDetails = useCallback(
        ()=>{
            const user ={
                username: props.location.state.username,
            }
            trackPromise(
                getUserDetails(user).then(response => {
                    var parsed_user= JSON.parse(response.user)
                    var parsed_friends = JSON.parse(response.friends)
                    var parsed_events = JSON.parse(response.joined_events)
                    var parsed_invitations = JSON.parse(response.invitations)
                    setUsername( parsed_user.username)
                    setEmail( parsed_user.email)
                    setFirstName( parsed_user.name)
                    setLastName( parsed_user.surname)
                    setDateOfBirth( parsed_user.date_of_birth)
                    setCity( parsed_user.city)
                    setNationality( parsed_user.nationality)
                    setFlagRock(parsed_user.music_tastes.rock)
                    setFlagHipHop(parsed_user.music_tastes.hiphop)
                    setFlagReggae(parsed_user.music_tastes.reggae)
                    setFlagReggaeton(parsed_user.music_tastes.reggaeton)
                    setFlagTechno(parsed_user.music_tastes.techno)
                    setFlagElectronic(parsed_user.music_tastes.electronic)
                    setEventsList(parsed_events)
                    setInvitationsList(parsed_invitations)
                    
                    /*the following is to extract the arrays (don't know why it is needed)*/
                    if (parsed_friends[0]!== null){ //check if friends are present
                        parsed_friends.map(f=>{
                            setFriendsList(f)
                            return null
                        })  
                    }  
                })
            )   
        },[props.location.state.username]
    )
    
    useEffect(() => {
        /* Check if it's the logged user profile page */
        if(props.location.state.username === props.loggedInUsername){
            retrieveDetails()
            setLoggedUserProfile(true)
        }else{
            setLoggedUserProfile(false)
        }
        if(!loggedUserProfile){
            /*Check if the logged user and the user are friends */
            const users ={
                loggedusername: props.loggedInUsername,
                username2: props.location.state.username 
            }
            trackPromise(
                checkIfFriend(users).then(response=>{
                    if(!response.error){
                        setLoggedUserIsFriend(true)
                    }
                })
            )
            /* Retrieve the user details */
            if(loggeUserIsFriend){
                retrieveDetails()
            }
        }
    }, [props.location.state.username, props.loggedInUsername, retrieveDetails,loggedUserProfile, loggeUserIsFriend]);
    
    

    const seeEventPage = code =>{
        props.history.push({
            pathname: '/events/'+code,
            state:{
                code:code,
            }
        })
   }

    const follow = () =>{
        const users ={
            loggedusername: props.loggedInUsername,
            username2: props.location.state.username 
        }
        setLoggedUserIsFriend(true)
        trackPromise(
            addUserAsFriend(users).then(response => {
                if(!response.error){
                    setLoggedUserIsFriend(true)
                    toast.success('You and ' + props.location.state.username + ' are now friends!')
                }else{
                    toast.error(response.message)
                }
            })
        )
        
    }

    const unfollow = () =>{
        const users ={
            loggedusername: props.loggedInUsername,
            username2: props.location.state.username 
        }
        
        trackPromise(
            deleteFriend(users).then(response => {
                if(!response.error){
                    setLoggedUserIsFriend(false)
                    toast.warn('You and ' + props.location.state.username + ' are not friends anymore!')
                }else{
                    toast.error(response.message)
                }
                
            })
        )
        
    }

    const viewUserProfile = f =>{
        props.history.push({
            pathname: '/users/'+f,
            state:{
                username:f,
            }
        })
    }

    const accept = i =>{
        const invitation={
            sender:i.sender,
            recipient:i.recipient,
            event_code:i.event_code
        }
        trackPromise(
            acceptInvitation(invitation).then(response => {
                if(!response.error){
                    toast.success('You accepted the invitation!')
                    window.location.reload()
                }else{
                    toast.error(response.message)
                } 
                
            })
        )
    }

    const refuse = i =>{
        const invitation={
            sender:i.sender,
            recipient:i.recipient,
            event_code:i.event_code
        }
        trackPromise(
            refuseInvitation(invitation).then(response => {
                if(!response.error){
                    toast.warn('You refuse the invitation!')
                    window.location.reload()
                }else{
                    toast.error(response.message)
                }   

            })
        )
    }

    //-------------------------------------------AVATAR UPLOAD----------------------------------------------
    const [file, setFile] = useState(null)

    const changeFile = e =>{
        setFile(e.target.files[0])
    }
    
    const onFileSubmit = e =>{
        e.preventDefault() // Stop form submit
        fileUpload(file).then((response)=>{
            if(!response.data.error){
                toast.success('File successfully uploaded!')
                window.location.reload()
            }else{
                toast.error('File not uploaded!')
            }
        console.log(response.data);
        })
    }

    const fileUpload= file =>{
        const url = api+'/users/'+username+'/uploadAvatar';
        const formData = new FormData();
        formData.append('avatar',file)
        formData.append('filename', username+'.png')
        const config = {
            headers: {
                'content-type': 'multipart/form-data'
            }
        }
        return  post(url, formData,config)
    }

   //--------------------------------------------------Conditional render -------------------------------------
   function UserInfo(){
       if(loggeUserIsFriend || loggedUserProfile){
           return(
                <table>
                    <tbody className="header-profile-info-table">
                        <tr><td><h1 className="profile-info" style={{textTransform:"uppercase"}}>{username}</h1></td></tr>
                        
                        <tr><td><p className="profile-info" style={{fontSize:"25px"}}><i> {firstName} {lastName} </i></p></td></tr>
                        <tr><td><p className="profile-info"><b>Date of Birth:</b> <i>{dateOfBirth} </i></p></td></tr>
                        <tr><td><p className="profile-info"><b>Email:</b> <i> {email} </i> </p></td></tr>
                        <tr><td><p className="profile-info"><b>City:</b> <i> {city} </i> </p></td></tr>
                        <tr><td><p className="profile-info"><b>Nationality:</b> <i> {nationality} </i> </p></td></tr>
                        <tr> 
                            <td>
                                <p className="profile-info"><b>Music Tastes: </b>
                                    {(flagRock===1) && < button className="genre-btn">Rock</button>}
                                    {(flagHipHop===1) && < button className="genre-btn">HipHop</button>}
                                    {(flagReggae===1) && < button className="genre-btn">Reggae</button>}
                                    {(flagReggaeton===1) && < button className="genre-btn">Reggaeton</button>}
                                    {(flagTechno===1) && < button className="genre-btn">Techno</button>}
                                    {(flagElectronic===1) && < button className="genre-btn">Electronic</button>}
                                </p>
                            </td>
                        </tr>    
                    </tbody>
                </table>
           )
       }else{
           return(
               <h2>You have to be friend with {props.location.state.username} to see more info! </h2>
           )
       }
    }
    function Tables(){
        if(loggeUserIsFriend || loggedUserProfile){
            return(
                <div className="profile-row">
                    <table className="lists-table">
                        <tbody>
                            <tr>
                                <td className = "friends-events-lists"> 
                                        <div className="table-wrapper-scroll-y my-custom-scrollbar" >
                                            <table className="table">
                                                <tbody>
                                                    <tr>
                                                        <th>Friends</th>
                                                    </tr>
                                                {
                                                    friendsList
                                                    .map(f =>(
                                                        <tr onClick={()=>viewUserProfile(f)} key={f}>
                                                            <td style={{textAlign:'center'}}>{f}</td>
                                                        </tr> 
                                                    ))
                                                }
                                                </tbody>
                                            </table>
                                        </div>
                                </td>
                                <td className = "friends-events-lists">
                                    <div className="table-wrapper-scroll-y my-custom-scrollbar" >
                                        <table className="table">
                                            <tbody>
                                                <tr>
                                                    <th>Upcoming events</th>
                                                </tr>
                                                {
                                                    Array.from(eventsList)
                                                    .filter(e => Date.parse(e.date) >= Date.parse(todayDate))
                                                    .map(e=>{
                                                        var event_code=e.code
                                                        return(
                                                            <tr key= {event_code} onClick={() => seeEventPage(event_code)}><td> {e.name} </td></tr>
                                                        )
                                                    })
                                                }
                                            </tbody>
                                        </table>
                                    </div>              
                                </td>
                                <td className = "friends-events-lists">
                                    <div className="table-wrapper-scroll-y my-custom-scrollbar" >
                                        <table className="table">
                                            <tbody>
                                            <   tr>
                                                    <th>Past events</th>
                                                </tr>
                                                {
                                                    Array.from(eventsList)
                                                    .filter(e => Date.parse(e.date) < Date.parse(todayDate))
                                                    .map(e=>{
                                                        var event_code=e.code
                                                        return(
                                                            <tr key={event_code} onClick={() => seeEventPage(event_code)}><td> {e.name} </td></tr>
                                                        )
                                                    })
                                                }
                                            </tbody>
                                        </table>
                                    </div>   
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            )
        }else{
            return null
        }
    }

    function Invitations(){
        if(Array.from(invitationsList).length>0){
            return(
                <table id='results-table' >
                    <tbody>
                    <tr>
                        <th>SENDER</th>
                        <th>EVENT</th>
                        <th>ACTIONS</th>
                    </tr>
                        {
                            Array.from(invitationsList)
                            .map(i=>{
                                var key = i.sender+i.event_code+i.recipient
                                var event_code=i.event_code
                                return(
                                    <tr key= {key} >
                                        <td> {i.sender} </td>
                                        <td onClick={() => seeEventPage(event_code)}> {i.event_name} </td>
                                        <td>
                                            <button class="accept" onClick={()=>{accept(i)}}>Accept</button>
                                            <button class="refuse" onClick={()=>{refuse(i)}}>Refuse</button>
                                        </td>
                                    </tr>
                                )
                            })
                        }
                    </tbody>
                </table>
            )
        }else{
            return(
                <h2 style={{color:'black'}}>You have no new invitations!</h2>
            )
        }
    }
    //--------------------------------------MAIN COMPONENT RENDER ---------------------------------------------
    return(
        <div>
            <div className="header">
                <table>
                    <tbody>
                        <tr>
                            <td>
                            <table >
                                <tbody className="header-profile-image-table">
                                    <tr>
                                        <td><img src={profilePicURL} alt="Profile" style={{width:"210px", height:"210px", borderRadius:'105px'}} onError={(e)=>{e.target.src='https://cheerapp.s3.eu-west-2.amazonaws.com/default/user.png'}}/></td>
                                    </tr>
                                    <tr>
                                        {!loggedUserProfile && !loggeUserIsFriend &&
                                            <td><button className = "btn" onClick={follow} > Follow </button></td>
                                        }
                                        {!loggedUserProfile && loggeUserIsFriend &&
                                            <td><button className = "btn" onClick={unfollow} > Unfollow </button></td>
                                        }
                                        {loggedUserProfile &&

                                            <td>
                                                <table>
                                                    <tbody>
                                                        <tr>
                                                            <td>
                                                                <Popup modal style={{all:'unset'}}trigger={<button className = "btn" style={{height:'30px', backgroundColor:'#ee4540'}}> Change avatar </button>} position="right center">
                                                                    <div>
                                                                        <input  type='file' accept="image/png" onChange={changeFile}/> <br/>
                                                                        <button className='btn' type='submit' onClick={onFileSubmit}> Upload avatar </button>
                                                                    </div>
                                                                </Popup> 
                                                            </td>
                                                            
                                                        </tr>
                                                        <tr>
                                                            <td>
                                                                <Popup modal style={{all:'unset'}}trigger={<button className = "btn"> Show invitations </button>} position="right center">
                                                                    <Invitations/>
                                                                </Popup>
                                                            </td>
                                                        
                                                        </tr>
                                                        
                                                    </tbody>
                                                </table>
                                            </td>
                                        }
                                    </tr>
                                </tbody>
                            </table>
                            </td>
                            <td>
                                <UserInfo/>
                            </td>
                        </tr>
                    </tbody>   
                </table> 
            </div>
            <Tables/>
            
        </div>
    )
};
export default UserProfilePage;