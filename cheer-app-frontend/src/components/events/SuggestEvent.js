import React, { useEffect, useState } from 'react';
import TodayDate from '../TodayDate' 
import { suggestAnEvent } from './EventFunctions';
import { trackPromise } from 'react-promise-tracker';

import '../../styles/SuggestPage.css'
import { toast } from 'react-toastify';


const SuggestEvent = props => {
    const [todayDate, setTodayDate] = useState('')
    const [winnerCode, setWinnerCode] = useState('')
    const [showResult, setShowResult] = useState(false)
    const [winner, setWinner]= useState('')

    useEffect(() => {
        setTodayDate(TodayDate())
    }, []);

    const seeEventDetails = () =>{
        
        props.history.push({
            pathname: '/events/'+winnerCode,
            state:{
                code:winnerCode,
            }
        })
        
    }
    const suggest = () =>{
        const struct ={
            logged_username: props.user_username,
            today_date: todayDate

        }
        trackPromise(
            suggestAnEvent(struct).then(response => {

                if (!response.error) {
                    var parsedWinner=JSON.parse(response.winner)
                    setShowResult(true)
                    setWinner(parsedWinner.name)
                    setWinnerCode(parsedWinner.code)
                    
                }else{
                    toast.error('There is an error')
                }
            })
        )
        
        
    }

    return(
        <div className='suggest-page'>
            {!showResult &&
                <div>
                
                    <h1 style={{width:'100%', textAlign:'center'}}>Let us find the best event for you!</h1>
                    <div style={{width:'100%', textAlign:'center'}}>
                        <button className='btn' onClick={suggest}>Suggest me</button>  
                    </div>

                </div>
            }
            {showResult &&
                <div>
                    <h2 style={{width:'100%', textAlign:'center'}}>Basing on our magic algorithm, the best event for you is:</h2>
                    <h1 style={{width:'100%', textAlign:'center'}}>{winner}</h1>
                    <div style={{width:'100%', textAlign:'center'}}>
                        <button className='btn' onClick={seeEventDetails}>See event page</button>
                    </div>
                       
                </div>
            }
            
        </div>
            
        
    );
    
  
}
export default SuggestEvent;