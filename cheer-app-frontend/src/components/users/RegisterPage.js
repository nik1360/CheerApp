import React, {useState,useEffect} from 'react';
import {withRouter} from 'react-router-dom';
import{registerOrganizer, registerUser} from './UserFunctions'

import '../../styles/LoginRegisterPage.css'

const LoginPage = props => {

    const selected='#801336'
    const unselected='#002a4d'
    
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

    const [rockColor, setRockColor] = useState(unselected);
    const [hiphopColor, setHipHopColor] = useState(unselected);
    const [reggaeColor, setReggaeColor] = useState(unselected);
    const [reggaetonColor, setReggaetonColor] = useState(unselected);
    const [technoColor, setTechnoColor] = useState(unselected);
    const [electronicColor, setElectronicColor] = useState(unselected);

    const [maxBirthDate, setMaxBirthDay] = useState() 

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

        var yyyy_max = yyyy-18
        setMaxBirthDay(`${yyyy_max}-${mm}-${dd}`)
        
    }, []);



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
            usr: username.trim(),
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
            usr: username.trim(),
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

    useEffect(() => {
        if(flagRock){
            setRockColor(selected)
        }else{
            setRockColor(unselected)
        }
    }, [flagRock]);

    useEffect(() => {
        if(flagHipHop){
            setHipHopColor(selected)
        }else{
            setHipHopColor(unselected)
        }
    }, [flagHipHop]);

    useEffect(() => {
        if(flagReggae){
            setReggaeColor(selected)
        }else{
            setReggaeColor(unselected)
        }
    }, [flagReggae]);

    useEffect(() => {
        if(flagReggaeton){
            setReggaetonColor(selected)
        }else{
            setReggaetonColor(unselected)
        }
    }, [flagReggaeton]);

    useEffect(() => {
        if(flagTechno){
            setTechnoColor(selected)
        }else{
            setTechnoColor(unselected)
        }
    }, [flagTechno]);

    useEffect(() => {
        if(flagElectronic){
            setElectronicColor(selected)
        }else{
            setElectronicColor(unselected)
        }
    }, [flagElectronic]);

    return(
        <div className="login-page">
            <div className="form">
                <form className="login-form" onSubmit={onSubmitHandler}>
                    <input className="form-text" type="text" placeholder="username" required value={username}onChange={updateUsername}/>
                    <input className="form-text" type="email" placeholder="email" required value={email} onChange={updateEmail}/>
                    <input className="form-text" type="password" placeholder="password" required value={password} onChange={updatePassword}/>
                    <input className="form-text" type="text" placeholder="first name" required  value={firstName} onChange={updateFirstName}/>
                    <input className="form-text" type="text" placeholder="last name" required value={lastName} onChange={updateLastName}/>
                    <input className="form-text" type="date" placeholder="date of birth" required value={dateOfBirth} max={maxBirthDate} onChange={updateDateOfBirth}/>
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
                            <input className="form-text" type="tel" placeholder="phone number" pattern="[0-9]{10}"required value={phoneNumber} onChange={updatePhoneNumber}/> 
                            <button className="form-button" type="submit">Register organizer</button>
                        </div>  
                    }
                    {showUserForm &&
                        <div>
                            <input className="form-text" type="text" placeholder="city" required value={city} onChange={updateCity}/> 
                            <input className="form-text" type="text" placeholder="nationality" required value={nationality} onChange={updateNationality}/> 
                            <div>
                                <p className="message">What is the music that it will be played at the event?</p>
                                <br/>
                                <button className='taste-btn' type='button'style={{backgroundColor:rockColor}} onClick={() => {setFlagRock(!flagRock)}}>Rock</button>
                                <button className='taste-btn' type='button'style={{backgroundColor:hiphopColor}}  onClick={() => {setFlagHipHop(!flagHipHop)}} > HipHop</button> 
                                <button className='taste-btn' type='button'style={{backgroundColor:reggaeColor}}  onClick={() => {setFlagReggae(!flagReggae)}} >Reggae</button> <br/> <br/>
                                <button className='taste-btn' type='button'style={{backgroundColor:reggaetonColor}} onClick={() => {setFlagReggaeton(!flagReggaeton)}} >Reggaeton</button>
                                <button className='taste-btn' type='button'style={{backgroundColor:technoColor}} onClick={() => {setFlagTechno(!flagTechno)}} >Techno</button>
                                <button className='taste-btn' type='button'style={{backgroundColor:electronicColor}} onClick={() => {setFlagElectronic(!flagElectronic)}} >Electronic</button> <br/>
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