import React, {useState, useEffect} from 'react';

import '../../styles/EventProfilePage.css'
import { getUserDetails } from './UserFunctions';


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

    const [todayDate, setTodayDate] = useState()
    
    useEffect(() => {
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

    }, []);



    useEffect(() => {
        const user ={
            username: props.user_username,
        }
        getUserDetails(user).then(response => {
            var parsed_user= JSON.parse(response.user)
            var parsed_friends = JSON.parse(response.friends)
            var parsed_events = JSON.parse(response.joined_events)
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
            
            /*the following is to extract the arrays (don't know why it is needed)*/
            parsed_friends.map(f=>{
                setFriendsList(f)
            })  
        })
    }, [props.user_username]);
    
   const seeEventPage = code =>{
        props.history.push({
            pathname: '/events/'+code,
            state:{
                code:code,
            }
        })
   }

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
                                        <td><img src={require('../../images/user.png')} alt="Profile" width="200" height="200"/></td>
                                    </tr>
                                    <tr>
                                        <td><button className = "btn" > Edit Profile </button></td>
                                    </tr>
                                </tbody>
                        
                            </table>
                            </td>
                            <td>
                            <table>
                                <tbody className="header-profile-info-table">
                                    <tr><td><h1 className="profile-info" style={{textTransform:"uppercase"}}>{username}</h1></td></tr>
                                    
                                    <tr><td><p className="profile-info"><i> {firstName} {lastName} </i></p></td></tr>
                                    <tr><td><p className="profile-info">Date of Birth:<b></b> <i>{dateOfBirth} </i></p></td></tr>
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
                            </td>
                        </tr>
                    </tbody>
                    
                </table>
                
                
                
            </div>
            <div className="profile-row">
                <table className="lists-table">
                    <tbody>
                        <tr>
                            <td className = "friends-events-lists"> 
                                    <h3> Friends </h3>		
                                    <div className="table-wrapper-scroll-y my-custom-scrollbar" >
                                        <table id = "table" >
                                            <tbody>
                                            {
                                                friendsList
                                                
                                                .map(f =>(
                                                    <tr key={f}>
                                                    <td>{f}</td>
                                                    <td>&nbsp;
                                                        &nbsp;
                                                        &nbsp;
                                                        &nbsp;
                                                        &nbsp;
                                                    </td>
                                                    <td> <button className="btn1"><i className="fa fa-close"></i></button> </td>
                                                    </tr> 
                                                ))
                                            }
                                            </tbody>
                                        </table>
                                    </div>
                                
                            </td>
                            <td className = "friends-events-lists">
                                
                                <h3> Events that I' m going </h3>	
                                <div className="table-wrapper-scroll-y my-custom-scrollbar" >
                                    <table>
                                        <tbody>
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
                            
                                <h3> Events that I already attended </h3>	
                                
                                <div className="table-wrapper-scroll-y my-custom-scrollbar" >
                                    <table>
                                        <tbody>
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
        </div>
    )
};
export default UserProfilePage;