import React, {useState,useEffect} from 'react';
import {findEvents} from './EventFunctions'
import EventRow from './EventRow'
import TodayDate from '../TodayDate'
import { trackPromise } from 'react-promise-tracker';

import '../../styles/FindEventUserPage.css'

const FindEventPage = () => {
    
    const selected='#801336'
    const unselected='#002a4d'
    const [height, setHeight] = useState('50%')

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

    const [events, setEvents] = useState([])
    const [resultPresent, setResultPresent] = useState(false);
    const [showResults, setShowResults] = useState(false);
    const [showSearch, setShowSearch] = useState(true);

    const [todayDate, setTodayDate] = useState()
    
    useEffect(() => {
        setTodayDate(TodayDate())
    }, []);

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
        trackPromise(
            findEvents(search).then(response => {
                setShowSearch(false)
                setHeight('auto')
                setShowResults(true)
    
                if (!response.error) {
                    setResultPresent(true)
                    
                    setEvents(JSON.parse(response.events)) 
                }else{
                    setResultPresent(false)
                }
            })
        )
        
        
    }

    /*--------------------------------Conditional rendering ------------------------------------ */
    function Results(){
        if(showResults){
            if(resultPresent){
                return(
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
                                    Array.from(events)
                                    .filter(e => Date.parse(e.date) >= Date.parse(todayDate)) /*Keep only upcoming events */
                                    .map(e=>(
                                        <EventRow
                                        key ={e.code} /*every mapped element must have a key attribute*/
                                        code={e.code}
                                        name={e.name}
                                        description = {e.description}
                                        date = {e.date}
                                        music_genres = {e.music_genres}
                                        venue={e.venue}
                                        organizer={e.organizer}
                                        price ={e.price}
                                        start_time ={e.start_time}
                                        end_time ={e.end_time}
                                        />
                                    ))
                                }
                                <tr className="lastrow">
                                    <td colSpan="5">  
                                        <button className='search-btn' onClick={()=>{setShowResults(false); setShowSearch(true); setHeight('50%')}} type='submit'>Go back</button>  
                                    </td>
                                </tr>
                            </tbody>
                        </table>         
                    </div> 
                )
            }else{
                return(
                    <div> 
                        <div className='results'>
                            <h1>No event satisfies the selected criteria!</h1>
                        </div> 
                        <div className='no-results-goback'> 
                            <button className='search-btn' onClick={()=>{setShowResults(false); setShowSearch(true); setHeight('50%')}} type='submit'>Go back</button>  
                        </div> 
                    </div>
                )
            }
        }else{
            return null
        }
    }
/*------------------------------------------------------Render of the main component---------------------------- */
    return(
        <div className='search-page' style={{height:height}}>
            {showSearch &&
                <div className='search-form'>
                    <form className='form-box' onSubmit={handleSubmit}>
                        <h1 className='h1'>See upcoming events!</h1>
                        <div>
                            <input type='text' className='search-field city' placeholder='City' value={city} onChange={updateCity}/>
                            <input type='date' className='search-field date' placeholder='Date' value={date} min={todayDate} onChange={updateDate}/>
                            <button className='search-btn' type='submit'>Search</button>
                        </div>
                        
                        <div>
                            <p>Click on the music tastes that you like most</p>
                            <button className='taste-btn' type='button'style={{backgroundColor:rockColor}} onClick={() => {setFlagRock(!flagRock)}}>Rock</button>
                            <button className='taste-btn' type='button'style={{backgroundColor:hiphopColor}}  onClick={() => {setFlagHipHop(!flagHipHop)}} > HipHop</button>
                            <button className='taste-btn' type='button'style={{backgroundColor:reggaeColor}}  onClick={() => {setFlagReggae(!flagReggae)}} >Reggae</button> 
                            <button className='taste-btn' type='button'style={{backgroundColor:reggaetonColor}} onClick={() => {setFlagReggaeton(!flagReggaeton)}} >Reggaeton</button>
                            <button className='taste-btn' type='button'style={{backgroundColor:technoColor}} onClick={() => {setFlagTechno(!flagTechno)}} >Techno</button>
                            <button className='taste-btn' type='button'style={{backgroundColor:electronicColor}} onClick={() => {setFlagElectronic(!flagElectronic)}} >Electronic</button>
                        </div>
                    </form>
                </div>

            }
            <Results/>    
        </div>
    );  
}
export default FindEventPage;