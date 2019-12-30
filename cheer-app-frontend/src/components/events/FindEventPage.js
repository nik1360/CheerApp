import React, {useState,useEffect} from 'react';
import {findEvents} from './EventFunctions'

import Event from './Event'
import '../../styles/FindEventPage.css'


const FindEventPage = () => {
    
    const selected='#801336'
    const unselected='#002a4d'

    const[city,setCity] = useState('')
    const [date, setDate] = useState('');
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

    const [events, setEvents] = useState('')
    const [resultPresent, setResultPresent] = useState(false);
    const [showResults, setShowResults] = useState(false);
    const [showSearch, setShowSearch] = useState(true);


    const updateCity = e =>{
        setCity(e.target.value);
    }

    const updateDate = e =>{
        setDate(e.target.value);
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
    
    const handleSubmit= e =>{
        e.preventDefault()
        setShowSearch(false)
        setShowResults(true)
        const search ={
            date:date,
            city:city,
            flagrock:flagRock,
            flaghiphop: flagHipHop,
            flagreggae:flagReggae,
            flagreggaeton:flagReggaeton,
            flagtechno:flagTechno,
            flagelectronic:flagElectronic,
            criteriacity:false,
            criteriadate:false,
            criteriagenres:false,
            errors:{}
        }
        if(flagRock||flagHipHop||flagReggae||flagReggaeton||flagTechno||flagElectronic){
            search.criteriagenres=true
        }
        if(date!==''){
            search.criteriadate=true
        }
        if(city!==''){
            search.criteriacity=true
        }

        findEvents(search).then(response => {
            if (!response.error) {
                setResultPresent(true)
                setEvents(JSON.parse(response.events)) 
            }else{
                setResultPresent(false)
            }
        })
        
    }



    useEffect(() => {
        console.log(events)
    }, [events]);

    return(
        <div className='search-page'>
            {showSearch &&
                <div className='search-form'>
                    <form className='form-box' onSubmit={handleSubmit}>
                        <h1 className='h1'>Find your ideal event</h1>
                        <div>
                            <input type='text' className='search-field city' placeholder='City' value={city} onChange={updateCity}/>
                            <input type='text' className='search-field date' placeholder='Date (yyyy-mm-dd)' value={date} onChange={updateDate}/>
                            <button className='search-btn' type='submit'>Search</button>
                        </div>
                        
                        
                            <p>Click on the music tastes that you like most</p>
                            <button className='taste-btn' type='button'style={{backgroundColor:rockColor}} onClick={() => {setFlagRock(!flagRock)}}>Rock</button>
                            <button className='taste-btn' type='button'style={{backgroundColor:hiphopColor}}  onClick={() => {setFlagHipHop(!flagHipHop)}} > HipHop</button>
                            <button className='taste-btn' type='button'style={{backgroundColor:reggaeColor}}  onClick={() => {setFlagReggae(!flagReggae)}} >Reggae</button> 
                            <button className='taste-btn' type='button'style={{backgroundColor:reggaetonColor}} onClick={() => {setFlagReggaeton(!flagReggaeton)}} >Reggaeton</button>
                            <button className='taste-btn' type='button'style={{backgroundColor:technoColor}} onClick={() => {setFlagTechno(!flagTechno)}} >Techno</button>
                            <button className='taste-btn' type='button'style={{backgroundColor:electronicColor}} onClick={() => {setFlagElectronic(!flagElectronic)}} >Electronic</button>
                        
                    </form>
                </div>
            }
            
            
            {showResults && resultPresent &&
                <div className='results'>
                    <table id ='results-table'>
                        <tbody>
                            <tr>
                                <th>NAME</th>
                                <th>CITY</th>
                                <th>VENUE</th>
                                <th>DATE</th>
                                <th>GENRES</th>
                            </tr>
                            {
                                Array.from(events).map(e=>(
                                    <Event
                                        code={e.code}
                                        name={e.name}
                                        city ={e.venue.city}
                                        venue = {e.venue.name}
                                        date = {e.date}
                                        music_genres = {e.music_genres}
                                    />
                                ))
                            }
                        </tbody>
                    </table>
                    
                </div> 
            }

            {showResults && !resultPresent &&
                <div className='results'>
                   <h1>No event satisfies the selected criteria!</h1>
                </div> 
            }    
        </div>
    );  
}
export default FindEventPage;