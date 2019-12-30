import React from 'react'

import '../../styles/FindEventPage.css'


const Event = props => {
    
    const seeEventDetails = () =>{
        
        var url='/events/'+props.code
        window.location = url;
    }

	var genres = []
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
            <td>{props.city}</td>
            <td>{props.venue}</td>
            <td>{props.date}</td>
            <td>
                {
                    Array.from(genres).map(g =>(
                        <button type='button' className='genre-btn'>{g}</button>
                    ))
                }
            </td>
        </tr>
    )

};

export default Event;