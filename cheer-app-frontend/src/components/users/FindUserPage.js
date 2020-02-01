import React, {useState,useEffect} from 'react';
import {findUsers} from './UserFunctions'
import UserRow from './UserRow'


import '../../styles/FindEventUserPage.css'
import { trackPromise } from 'react-promise-tracker';

const FindUserPage = props => {
    
    const selected='#801336'
    const unselected='#002a4d'
    const [height, setHeight] = useState('50%')

    const[username,setUsername] = useState('')
    const[city,setCity] = useState('')
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

    const [users, setUsers] = useState([])
    const [resultPresent, setResultPresent] = useState(false);
    const [showResults, setShowResults] = useState(false);
    const [showSearch, setShowSearch] = useState(true);

    const updateCity = e =>{
        setCity(e.target.value);
    }

    const updateUsername = e =>{
        setUsername(e.target.value);
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
            username:username,
            city:city,
            flagrock:flagRock,
            flaghiphop: flagHipHop,
            flagreggae:flagReggae,
            flagreggaeton:flagReggaeton,
            flagtechno:flagTechno,
            flagelectronic:flagElectronic,
            criteriausername:false,
            criteriacity:false,
            criteriagenres:false,
            errors:{}
        }
        if(flagRock||flagHipHop||flagReggae||flagReggaeton||flagTechno||flagElectronic){
            search.criteriagenres=true
        }
        if(username!==''){
            search.criteriausername=true
        }
        if(city!==''){
            search.criteriacity=true
        }

        if((search.criteriacity || search.criteriagenres || search.criteriausername)){
            trackPromise(
                findUsers(search).then(response => {
                    setShowSearch(false)
                    setHeight('auto')
                    setShowResults(true)
                    if (!response.error) {
                        setResultPresent(true)
                        setUsers(JSON.parse(response.users)) 
                    }else{
                        setResultPresent(false)
                    }
                })
            )
            
        }
        else{
            alert('Please choose at least one criteria!')
        }
        
        
    }

    /*--------------------------------Conditional rendering ------------------------------------ */

    function Results(){
        if((Array.from(users).filter(u => u.username !== props.loggedInUsername )).length === 0){
            setResultPresent(false)
        }

        if(showResults){
            if(resultPresent){
                return(
                    <div className='results'>
                        <table id ='results-table'>
                            <tbody>
                                <tr>
                                    <th>USERNAME</th>
                                    <th>CITY</th>
                                    <th>MUSIC TASTES</th>
                                </tr>
                                {   
                                    Array.from(users)
                                    .filter(u => u.username !== props.loggedInUsername )
                                    .map(u=>(
                                        <UserRow
                                        key ={u.username} 
                                        username={u.username}
                                        city={u.city}
                                        music_genres = {u.music_tastes}
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
                            <h1>No user found!</h1>
                        </div> 
                        <div className='results'>
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
                        <h1 className='h1'>Find a new friend!</h1>
                        <div>
                            <input type='text' className='search-field username' placeholder='Username' value={username} onChange={updateUsername}/>
                            <input type='text' className='search-field city' placeholder='City' value={city} onChange={updateCity}/>
                            
                            <button className='search-btn' type='submit'>Search</button>
                        </div>
                        
                        <div>
                            <p>Look for friends with your music tastes</p>
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
            <Results />    
        </div>
    );  
}
export default FindUserPage;