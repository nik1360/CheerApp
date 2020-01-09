import React from 'react'
import {withRouter} from 'react-router-dom';

import '../../styles/FindEventPage.css'

const EventRow = props => {
    
    const genres = []

    const seeEventDetails = () =>{
        
        props.history.push({
            pathname: '/events/'+props.code,
            state:{
                code:props.code,
                name: props.name,
                description: props.description,
                date: props.date,
                venue: props.venue,
                genres: genres,
                organizer: props.organizer,
                price: props.price,
                start_time: props.start_time,
                end_time:props.end_time

            }
        })
        
    }

    if(props.music_genres.rock===1){
        genres.push('Rock')
    }
    if(props.music_genres.hiphop===1){
        genres.push('HipHop')
    }
    if(props.music_genres.reggae===1){
        genres.push('Reggae')
    }
    if(props.music_genres.reggaeton===1){
        genres.push('Reggaeton')
    }
    if(props.music_genres.techno===1){
        genres.push('Techno')
    }
    if(props.music_genres.electronic===1){
        genres.push('Electronic')
    }

    return(
        <tr onClick={seeEventDetails}>
            <td>{props.name}</td>
            <td>{props.venue.city}</td>
            <td>{props.venue.name}</td>
            <td>{props.date}</td>
            <td>
                {
                    Array.from(genres).map(g =>(
                        <button type='button' className='genre-btn'key ={g}>{g}</button>
                    ))
                }
            </td>
        </tr>
    )

};

export default withRouter(EventRow);