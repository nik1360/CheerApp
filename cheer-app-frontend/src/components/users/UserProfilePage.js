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


    useEffect(() => {
        const user ={
            username: props.user_username,
        }
        getUserDetails(user).then(response => {
            var parsed_user= JSON.parse(response.user)
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

            
        })
    }, [props.user_username])
    
   

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
                                    
                                    <tr> <td><p className="profile-info"><i> {firstName} {lastName} </i></p></td> </tr>
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
                                                <tr>
                                                    <td>Friend 1</td>
                                                    <td>&nbsp;
                                                        &nbsp;
                                                        &nbsp;
                                                        &nbsp;
                                                        &nbsp;
                                                    </td>
                                                    <td> <button className="btn1"><i className="fa fa-close"></i></button> </td>
                                                </tr>
                                                <tr>
                                                    <td>Friend 2</td>
                                                    <td>&nbsp;
                                                        &nbsp;
                                                        &nbsp;
                                                        &nbsp;
                                                        &nbsp;
                                                    </td>
                                                    <td> <button className="btn1"><i className="fa fa-close"></i></button> </td>
                                                </tr>
                                                <tr>
                                                    <td>Friend 3</td>
                                                    <td>&nbsp;
                                                        &nbsp;
                                                        &nbsp;
                                                        &nbsp;
                                                        &nbsp;
                                                    </td>
                                                    <td> <button className="btn1"><i className="fa fa-close"></i></button> </td>
                                                </tr>
                                                <tr>
                                                    <td>Friend 4</td>
                                                    <td>&nbsp;
                                                        &nbsp;
                                                        &nbsp;
                                                        &nbsp;
                                                        &nbsp;
                                                    </td>
                                                    <td> <button className="btn1"><i className="fa fa-close"></i></button> </td>
                                                </tr>
                                                <tr>
                                                    <td>Friend 5</td>
                                                    <td>&nbsp;
                                                        &nbsp;
                                                        &nbsp;
                                                        &nbsp;
                                                        &nbsp;
                                                    </td>
                                                    <td> <button className="btn1"><i className="fa fa-close"></i></button> </td>
                                                </tr>
                                                <tr>
                                                    <td>Friend 6</td>
                                                    <td>&nbsp;
                                                        &nbsp;
                                                        &nbsp;
                                                        &nbsp;
                                                        &nbsp;
                                                    </td>
                                                    <td> <button className="btn1"><i className="fa fa-close"></i></button> </td>
                                                </tr>
                                                <tr>
                                                    <td>Friend 7</td>
                                                    <td>&nbsp;
                                                        &nbsp;
                                                        &nbsp;
                                                        &nbsp;
                                                        &nbsp;
                                                    </td>
                                                    <td> <button className="btn1"><i className="fa fa-close"></i></button> </td>
                                                </tr>
                                                <tr>
                                                    <td>Friend 8</td>
                                                    <td>&nbsp;
                                                        &nbsp;
                                                        &nbsp;
                                                        &nbsp;
                                                        &nbsp;
                                                    </td>
                                                    <td> <button className="btn1"><i className="fa fa-close"></i></button> </td>
                                                </tr>
                                            </tbody>
                                        </table>
                                    </div>
                                
                            </td>
                            <td className = "friends-events-lists">
                                
                                <h3> Events that I' m going </h3>	
                                <div className="table-wrapper-scroll-y my-custom-scrollbar" >
                                    <table>
                                        <tbody>
                                            <tr>
                                                <td> Event 1</td>
                                            </tr>
                                            <tr>
                                                <td> Event 2</td>
                                            </tr>
                                            <tr>
                                                <td> Event 3</td>
                                            </tr>
                                            <tr>
                                                <td> Event 4</td>
                                            </tr>
                                            <tr>
                                                <td> Event 5</td>
                                            </tr>
                                            <tr>
                                                <td> Event 6</td>
                                            </tr>
                                            <tr>
                                                <td> Event 7</td>
                                            </tr>
                                            <tr>
                                                <td> Event 8</td>
                                            </tr>
                                        </tbody>
                                    </table>

                                </div>
                                
                                
                            </td>
                            <td className = "friends-events-lists">
                            
                                <h3> Events that I already attended </h3>	
                                <div className="table-wrapper-scroll-y my-custom-scrollbar" >
                                    <table>
                                        <tbody>
                                            <tr>
                                                <td> Event 1</td>
                                            </tr>
                                            <tr>
                                                <td> Event 2</td>
                                            </tr>
                                            <tr>
                                                <td> Event 3</td>
                                            </tr>
                                            <tr>
                                                <td> Event 4</td>
                                            </tr>
                                            <tr>
                                                <td> Event 5</td>
                                            </tr>
                                            <tr>
                                                <td> Event 6</td>
                                            </tr>
                                            <tr>
                                                <td> Event 7</td>
                                            </tr>
                                            <tr>
                                                <td> Event 8</td>
                                            </tr>
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