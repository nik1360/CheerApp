import React, {useState, useEffect} from 'react';
import {createEvent} from './EventFunctions'
import TodayDate from '../TodayDate'

import '../../styles/CreateEventPage.css'
import { trackPromise } from 'react-promise-tracker';

const CreateEventPage = props => {

    const selected='#801336'
    const unselected='#002a4d'

    const [name, setName] = useState('')
    const [description, setDescription] = useState('')
    const [date, setDate] = useState('')
    const [startTime, setStartTime] = useState('23:00')
    const [endTime, setEndTime] = useState('04:00')
    const [city, setCity] = useState('')
    const [address, setAddress] = useState('')
    const [venue, setVenue] = useState('')
    const [price, setPrice] = useState('')

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

    
    const [todayDate, setTodayDate] = useState()

    useEffect(() => {
        setTodayDate(TodayDate())
        setDate(TodayDate())
        
    }, []);

    const updateName = e =>{
        setName(e.target.value);
    }
    const updateAddress = e =>{
        setAddress(e.target.value);
    }
    const updateDescription = e =>{
        setDescription(e.target.value);
    }
    const updateDate = e =>{
        setDate(e.target.value);
    }
    const updateStartTime = e =>{
        setStartTime(e.target.value);
    }
    const updateEndTime = e =>{
        setEndTime(e.target.value);
    }
    const updateCity = e =>{
        setCity(e.target.value);
    }
    const updateVenue = e =>{
        setVenue(e.target.value);
    }

    const updatePrice = e =>{
        setPrice(e.target.value);
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

    const handleSubmit = e =>{
        e.preventDefault()
        const event ={
            name:name,
            description: description,
            date:date,
            starttime: startTime,
            endtime: endTime,
            city:city,
            address:address,
            venue:venue,
            price:price,
            flagrock:flagRock,
            flaghiphop: flagHipHop,
            flagreggae:flagReggae,
            flagreggaeton:flagReggaeton,
            flagtechno:flagTechno,
            flagelectronic:flagElectronic,
            organizer: props.organizer_username,
            errors:{}
        }
        trackPromise(
            createEvent(event).then(response => {
                if (!response.error) {
                    props.history.push({
                        pathname: '/events/'+response.event_code,
                        state:{
                            code:response.event_code,
                        }
                    })
                }else{
                    alert(response.message) 
                }
            })
        )
        
    }



    return(
        <div className="login-page">
            <div className="form">
                <form onSubmit={handleSubmit}>
                    <input className="form-text" type="text" required placeholder="Name" value={name} onChange={updateName}/>
                    <textarea className="form-text" required rows="5" cols="49" placeholder="Description"value={description} onChange={updateDescription}/>
                    <input className="form-text" id = "date" type="date" required value={date} min={todayDate} onChange={updateDate}/>
                    <input className="form-text" id="start-time" type="time" required value={startTime} onChange={updateStartTime}/>
                    <input className="form-text" id="end-time" type="time"  required value={endTime} onChange={updateEndTime}/>
                    <input className="form-text" type="text" required placeholder="City" value={city} onChange={updateCity}/>
                    <input className="form-text" type="text" required placeholder="Address" value={address} onChange={updateAddress}/>
                    <input className="form-text" type="text" required placeholder="Venue" value={venue} onChange={updateVenue}/>
                    <input className="form-text" type="number" min="0" required placeholder="Entrance Price (€)" value={price} onChange={updatePrice}/>

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
                    <button className="form-button" type="submit" >Create the event!</button>
                </form> 
            </div>
        </div>
        
    );
    
  
}
export default CreateEventPage;