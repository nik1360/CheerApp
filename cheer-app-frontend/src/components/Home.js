import React, { useState } from 'react';

import '../styles/Homepage.css'


const Home = props => {
    
    const [showHome, setShowHome] = useState(true)
    const [showAboutUs, setShowAboutUs] = useState(false)
    const [showHowItWorks, setHowItWorks] = useState(false)

    const handleAboutUs = ()=>{
        setShowHome(false)
        setHowItWorks(false)
        setShowAboutUs(true)
    }

    const handleHome = ()=>{
        setHowItWorks(false)
        setShowAboutUs(false)
        setShowHome(true)
    }

    const handleHowItWorks = ()=>{
        setShowHome(false)
        setShowAboutUs(false)
        setHowItWorks(true)   
    }


    function Home(){
        if (showHome){
            return(
                <div  className="hero-image">
                    <div className="hero-text">
                        <h1 style={{fontSize:'50px'}}>Cheerapp</h1>
                        <p><i>All your events, in one place. </i></p>
                        <button onClick={handleAboutUs}>About Us</button> 
                        <button onClick={handleHowItWorks}>How it works</button>
                    </div>
                </div>
            )
        }else{
            return null
        }
    }

    function HowItWorks(){
        if(showHowItWorks){
            return(
                <div style={{height:'100%', width:'100%'}} >
                    <div  style={{height:'40%'}}className="hero-image">
                        <div className="hero-text">
                            <h1 style={{fontSize:'50px'}}>How it works</h1>
                            <p>Getting started</p>
                        </div>
                    </div>
                    <div className="home-navbar">
                        <button onClick={handleHome}>Home</button>
                        <button onClick={handleHowItWorks}>How it works</button>
                        <button onClick={handleAboutUs}>Our team</button>
                    </div>
                    <div className="home-main">

                        <div className="home-columns">
                            <h2 className="home-title"><i>Finding an event</i> </h2>
                            <p>
                                <i>When you click on the menu, you find a button "find events". Clicking on it will direct you to a new tab. In this tab 
                                you are able to type in your city of preference, choose the date on which you want to go out and click on one or more music genres </i>
                                <br/><br/>
                                <i> Alternatively, you can also click on the "Suggest me!" button in the menu. This will suggest you an event based on previously attended events.</i>
                            </p>
                            <br/><br/><br/><br/><br/><br/>
                            <p>
                                <h2 className="home-title"><i>Finding a friend</i> </h2>
                                <br/>
                                <i>When you are a registered user, you'll find a "Find Friends" option in the menu. <br/>
                                   Clicking on it will allow you to search on <b>username, city</b>, or you can find 
                                    new people with the same <b>music taste</b> as you. <br/>
                                If you are not a registered user you have to create an account in order to find and add friends.
                                </i>
                            </p>
                            <p>
                                <br/>
                                <img src={require('../images/cheerApp_logo.png')} alt='cheerApp_logo'/>
                                <br/>
                            </p>
                        </div>
                    </div>
                </div>
            )
        }else{
            return null
        }
    }

    function AboutUs(){
        if(showAboutUs){
            return(
                <div style={{height:'100%', width:'100%'}}>
                    <div style={{height:'40%'}} className="hero-image" class="hero-image">
                        <div class="hero-text">
                            <h1 style={{fontSize:'50px'}}>Our Team</h1>
                            <p>Get to know us!</p>
                        </div>
                    </div>
                    <div className="home-navbar">
                    <button onClick={handleHome}>Home</button>
                        <button onClick={handleHowItWorks}>How it works</button>
                        <button onClick={handleAboutUs}>Our team</button>
                    </div>

                    <div style={{height:'100%', width:'100%', backgroundColor:'white', overflow:'auto'}}>
                        <div className="home-column">
                            <div className="home-card">
                            <img src={require('../images/staff_avatars/evi.png')} alt="evi" style={{width:'100%'}}/>
                            <h1>Evi</h1>
                            <p className="home-titlestudy">Business engineering</p>
                            <p>Name University</p>
                            <div style={{margin: '24px 0'}}> </div>
                            
                            <p><a href="mailto: evi@cheerapp.com" ><button className="btn">Contact</button></a></p>
                            </div>
                        </div>

                        <div className="home-column">
                            <div className="home-card">
                            <img src={require('../images/staff_avatars/jesus.png')} alt="Jésus" style={{width:'100%'}}/>
                            <h1>Jésus</h1>
                            <p class="home-titlestudy">Computer engineering</p>
                            <p>Name University</p>
                            <div style={{margin: '24px 0'}}> </div>
                            
                            <p><a href="mailto: jesus@cheerapp.com" ><button class="btn">Contact</button></a></p>
                            </div>
                        </div>
                        <div className="home-column">
                            <div className="home-card">
                            <img src={require('../images/staff_avatars/julie.png')} alt="julie" style={{width:'100%'}}/>
                            <h1>Julie</h1>
                            <p className="home-titlestudy">Business engineering</p>
                            <p>KULeuven</p>
                            <div style={{margin: '24px 0'}}> </div>
                            <p><a href="mailto: julie@cheerapp.com" ><button className="btn">Contact</button></a></p>
                            </div>
                        </div>
                        <div className="home-column">
                            <div className="home-card">
                            <img src={require('../images/staff_avatars/nikolas.png')} alt="Nikolas" style={{width:'100%'}}/>
                            <h1>Nikolas</h1>
                            <p className="home-titlestudy">Computer engineering</p>
                            <p>UNIPV</p>
                            <div style={{margin: '24px 0'}}> </div>
                            <p><a href="mailto: nikolas@cheerapp.com" ><button className="btn">Contact</button></a></p>
                            </div>
                        </div>

                        <div className="home-column">
                            <div className="home-card">
                            <img src={require('../images/staff_avatars/pierre.png')} alt="Pierre" style={{width:'100%'}}/>
                            <h1>Pierre</h1>
                            <p className="home-titlestudy">Computer engineering</p>
                            <p>Name University</p>
                            <div style={{margin: '24px 0'}}> </div>
                            <p><a href="mailto: pierre@cheerapp.com"><button className="btn">Contact</button></a></p>
                            </div>
                        </div>
                    </div>
                    
                </div>
            )
        }else{
            return null
        }
    }
    return(

        <div style={{height:'100%', width:'100%'}}>
            <HowItWorks/>
            <AboutUs/>
            <Home/>
            
        </div>
            
        
    );
    
  
}
export default Home;