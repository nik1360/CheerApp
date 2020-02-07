import React, {useState, useEffect} from 'react';
import { toast } from 'react-toastify';
import {post} from 'axios'

import { getOrganizerDetails } from './UserFunctions';
import { trackPromise } from 'react-promise-tracker';
import Popup from "reactjs-popup";

import TodayDate from '../TodayDate'

import api from '../Config'
import '../../styles/EventProfilePage.css'



const OrganizerProfilePage = props => {
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [dateOfBirth, setDateOfBirth] = useState('');
    const [phoneNumber, setPhoneNumber] = useState('');
    const [numRatings, setNumRatings] = useState(0)
    const [avgRating, setAvgRating] = useState(0)
    
    const [eventsList, setEventsList] = useState([])
    const [todayDate, setTodayDate] = useState()

    const profilePicURL='https://cheerapp.s3.eu-west-2.amazonaws.com/organizers/'+props.location.state.username+'.png'
    
    useEffect(() => {
        setTodayDate(TodayDate())
        
        const org ={
            username: props.location.state.username,
        }
        
        trackPromise(
            getOrganizerDetails(org).then(response => {

                
                
                var parsed_organizer= JSON.parse(response.organizer)
                
                setUsername( parsed_organizer.username)
                setEmail( parsed_organizer.email)
                setFirstName( parsed_organizer.name)
                setLastName( parsed_organizer.surname)
                setDateOfBirth( parsed_organizer.date_of_birth)
                setPhoneNumber(parsed_organizer.phone)
                setEventsList(parsed_organizer.organized_events)
                setNumRatings(parsed_organizer.num_ratings)
                setAvgRating(parsed_organizer.avg_rating)
                
            })
        ) 
        

    }, [props.location.state.username]);

    

    const seeEventPage = code =>{
        props.history.push({
            pathname: '/events/'+code,
            state:{
                code:code,
            }
        })
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
                toast.error(response.data.message)
            }
        console.log(response.data);
        })
    }

    const fileUpload= file =>{
        const url = api+'/organizers/'+username+'/uploadAvatar';
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
       
        return(
            <table>
                <tbody className="header-profile-info-table">
                    <tr><td><h1 className="profile-info" style={{textTransform:"uppercase"}}>{username}</h1></td></tr>
                    <tr><td><p className="profile-info" style={{fontSize:"25px"}}><i> {firstName} {lastName} </i></p></td></tr>
                    <tr><td><p className="profile-info"><b>Date of Birth:</b> <i>{dateOfBirth} </i></p></td></tr>
                    <tr><td><p className="profile-info"><b>Email:</b> <i> {email} </i> </p></td></tr>
                    <tr><td><p className="profile-info"><b>Phone number:</b> <i> +39 {phoneNumber} </i> </p></td></tr>
                    <tr><td><p className="profile-info"><b>Events organized:</b> <i> {eventsList.length}</i> </p></td></tr>
                    <tr><td><p className="profile-info"><b>Ratings received:</b> <i> {numRatings} </i> </p></td></tr>
                    <tr><td><p className="profile-info"><b>Average Rating:</b> <i> {avgRating}/5 </i> </p></td></tr>

                </tbody>
            </table>
        )
    }
    function Tables(){
        
        return(
            <div className="profile-row">
                <table className="lists-table">   
                    <tbody>
                        <tr>
                            <td className = "friends-events-lists">
                                <div className="table-wrapper-scrolll-y my-custom-scrollbar" >
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
                                <div className="table-wrapper-scrolll-y my-custom-scrollbar" >
                                    <table className="table">
                                        <tbody>
                                             <tr>
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
                                        <td><img src={profilePicURL} alt="Profile" style={{width:"210px", height:"210px", borderRadius:'105px'}} onError={(e)=>{e.target.src='https://cheerapp.s3.eu-west-2.amazonaws.com/default/organizer.png'}}/></td>
                                    </tr>
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
export default OrganizerProfilePage;