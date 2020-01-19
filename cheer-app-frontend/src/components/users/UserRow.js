import React from 'react'
import {withRouter} from 'react-router-dom';

import '../../styles/FindEventUserPage.css'

const UserRow = props => {
    
    const genres = []

    const seeEventDetails = () =>{
        
        props.history.push({
            pathname: '/users/'+props.username,
            state:{
                username:props.username,
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
        <tr onClick={seeEventDetails} style ={{maxHeight:"50px"}} >
            <td>{props.username}</td>
            <td>{props.city}</td>
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

export default withRouter(UserRow);