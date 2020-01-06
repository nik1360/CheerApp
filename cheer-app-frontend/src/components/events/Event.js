import React from 'react'

import '../../styles/Event.css'


const Event = props => {

    return(
        <div>
            <div class="header">
                <h1>NAME EVENT</h1>
                <p>Date - address </p>
                <p>organised by: <i>nameorganiser</i></p>
            </div>


            <div class="row">
                <div class="side">
                    <span class="label ">Music type</span>
                    <span class="label ">Income price</span>
                    <span class="label ">Distance</span>
                    <span class="label ">Price of a drink</span>
                    <br/>
                    <h5>general information:</h5>
                    <p> here should come the information the event maker gives in the process of uploading the event</p>
                    <br/>
                    <img src="img_girl.jpg" alt="eventphoto" width="200" height="240"/>
                    <img src="img_chania.jpg" alt="eventphoto2" width="200" height="240"/>
                    <img src="img_girl.jpg" alt="eventphoto3" width="200" height="240"/>

                </div>
            
                <div class="main">
                    <button class="btn ">ATTEND</button>
                    <br/>
                    <br/>
                    <button class="btn ">INTERESTED</button>
                    <br/>
                    <br/>
                    <a href="file:///C:/Users/Julie/Documents/checkout%20cheerapp.html" ><button class="btn ticket">BUY TICKETS</button></a> 
                    <br/>
                    <br/>
                    <h5>Friends who are going</h5>
                    <p> Friend1, Friend2 and others are interested <br/> Friend4, Friend5 and others are going</p>
                    <p/>
                    <br/>
                    <a href="pagewheretoaskquesions.com" target="_blank"><button class="btn">ASK Question</button></a> 
                </div>
            </div>

            <div class="footer">
            <h2>Cheerapp, 2019</h2>
            </div>
        </div>
    )

};

export default Event;