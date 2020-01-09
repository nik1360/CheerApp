import React, {useState} from 'react';
import {withRouter} from 'react-router-dom';
import{registerOrganizer, registerUser} from './UserFunctions'

import '../../styles/LoginRegisterPage.css'

const LoginPage = props => {
    
    const [showUserForm, setShowUserForm] = useState(false);
    const [showOrganizerForm, setShowOrganizerForm] = useState(false);

    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [dateOfBirth, setDateOfBirth] = useState('');

    const [phoneNumber, setPhoneNumber] = useState('');

    const [city, setCity] = useState('');
    const [nationality, setNationality] = useState('');
    const [flagRock, setFlagRock] = useState(false);
    const [flagHipHop, setFlagHipHop] = useState(false);
    const [flagReggae, setFlagReggae] = useState(false);
    const [flagReggaeton, setFlagReggaeton] = useState(false);
    const [flagTechno, setFlagTechno] = useState(false);
    const [flagElectronic, setFlagElectronic] = useState(false);
    


    const onSubmitHandler = e => {
        e.preventDefault()
        if (showOrganizerForm){
            regOrganizer()
        }else{
            regUser()
        }
    }

    const regOrganizer = () => {
        const org = {
            usr: username,
            email:email,
            pwd: password,
            firstname:firstName,
            lastname:lastName,
            dateofbirth:dateOfBirth,
            phonenumber:phoneNumber,
            errors:{}
        }

        registerOrganizer(org).then(response => {
            if (!response.error) {
                alert('Organizer ' + org.usr +' registered correctly')
                props.history.push('/loginpage');
            }else{
                alert(response.error);
            }
        })
    }

    const regUser = () => {
        const usr = {
            usr: username,
            email:email,
            pwd: password,
            firstname:firstName,
            lastname:lastName,
            dateofbirth:dateOfBirth,
            city:city,
            nationality:nationality,
            flagrock:flagRock,
            flaghiphop: flagHipHop,
            flagreggae:flagReggae,
            flagreggaeton:flagReggaeton,
            flagtechno:flagTechno,
            flagelectronic:flagElectronic,
            errors:{}
        }

        registerUser(usr).then(response => {
            if (!response.error) {
                alert('User ' + usr.usr +' registered correctly')
                props.history.push('/loginpage');
            }else{
                alert(response.error);
            }
        })
    }
    
    const updateUsername = e =>{
        setUsername(e.target.value);
    }
    const updateEmail = e =>{
        setEmail(e.target.value);
    }
    const updatePassword = e =>{
        setPassword(e.target.value);
    }
    const updateFirstName = e =>{
        setFirstName(e.target.value);
    }
    const updateLastName = e =>{
        setLastName(e.target.value);
    }
    const updateDateOfBirth = e =>{
        setDateOfBirth(e.target.value);
    }
    const updatePhoneNumber = e =>{
        setPhoneNumber(e.target.value);
    }
    const updateCity = e =>{
        setCity(e.target.value);
    }
    const updateNationality = e =>{
        setNationality(e.target.value);
    }

    return(
        <div className="login-page">
            <div className="form">
                <form className="login-form" onSubmit={onSubmitHandler}>
                    <input className="form-text" type="text" placeholder="username" required value={username} onChange={updateUsername}/>
                    <input className="form-text" type="text" placeholder="email" required value={email} onChange={updateEmail}/>
                    <input className="form-text" type="password" placeholder="password" required value={password} onChange={updatePassword}/>
                    <input className="form-text" type="text" placeholder="first name" required  value={firstName} onChange={updateFirstName}/>
                    <input className="form-text" type="text" placeholder="last name" required value={lastName} onChange={updateLastName}/>
                    <input className="form-text" type="text" placeholder="date of birth (yyy-mm-dd)" required value={dateOfBirth} onChange={updateDateOfBirth}/>
                    {!showOrganizerForm && !showUserForm &&
                        <div>
                            <p className="message">Choose one to show the other information</p>
                            <br/>
                            <div>
                                <button className="form-button" type="button" onClick={()=>{setShowUserForm(true)}} >Show user fields</button>
                            </div>
                            <br/>
                            <div>
                                <button className="form-button" type="button" onClick={()=>{setShowOrganizerForm(true)}}>show organizer fields</button>
                            </div>
                            
                        </div>
                    }
                    {showOrganizerForm &&
                        <div>
                            <input className="form-text" type="text" placeholder="phone number" required value={phoneNumber} onChange={updatePhoneNumber}/> 
                            <button className="form-button" type="submit">Register organizer</button>
                        </div>  
                    }
                    {showUserForm &&
                        <div>
                            <input className="form-text" type="text" placeholder="city" required value={city} onChange={updateCity}/> 
                            <input className="form-text" type="text" placeholder="nationality" required value={nationality} onChange={updateNationality}/> 
                            <p className="message">Choose your music tastes</p>
                            <br/>
                            <div>
                                    <label class="container">Rock
                                        <input type="checkbox" onChange={() => {setFlagRock(!flagRock)}}/>
                                        <span class="checkmark"></span>
                                    </label>

                                    <label class="container">HipHop
                                        <input type="checkbox" onChange={() => {setFlagHipHop(!flagHipHop)}}/>
                                        <span class="checkmark"></span>
                                    </label>

                                    <label class="container">Reggae
                                        <input type="checkbox" onChange={() => {setFlagReggae(!flagReggae)}}/>
                                        <span class="checkmark"></span>
                                    </label>

                                    <label class="container">Reggaeton
                                        <input type="checkbox" onChange={() => {setFlagReggaeton(!flagReggaeton)}}/>
                                        <span class="checkmark"></span>
                                    </label>

                                    <label class="container">Techno
                                        <input type="checkbox" onChange={() => {setFlagTechno(!flagTechno)}}/>
                                        <span class="checkmark"></span>
                                    </label>

                                    <label class="container">Electronic
                                        <input type="checkbox" onChange={() => {setFlagElectronic(!flagElectronic)}}/>
                                        <span class="checkmark"></span>
                                    </label>
                                </div>
                                <br/>
                            <button className="form-button" type="submit">Register user</button>
                        </div>  
                    }
                </form>      
            </div>
        </div>
        
    );  
  
}
export default withRouter(LoginPage);