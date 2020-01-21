import React, {useState} from 'react';
import {BrowserRouter as Router, Switch, Route} from 'react-router-dom';

import Toolbar from './components/drawer/Toolbar';
import SideDrawer from './components/drawer/SideDrawer';
import Backdrop from './components/drawer/Backdrop'

import RegisterPage from './components/users/RegisterPage'
import LoginPage from './components/users/LoginPage'
import FindEventPage from './components/events/FindEventPage'
import Event from './components/events/Event'
import CreateEventPage from './components/events/CreateEventPage'
import UserProfilePage from './components/users/UserProfilePage'
import FinduserPage from './components/users/FindUserPage'

import Home from './components/Home'
import AccessDenied from './components/AccessDenied'
import './styles/General.css'

const App = () =>{
	const usernameSessionKey = 'username'
	const userLoginSessionKey = 'userLoggedIn'
	const organizerLoginSessionKey = 'organizerLoggedIn'

	const [sideDrawerOpen, setSideDrawerOpen] = useState(false)
	const [loggedInUsername, setloggedInUsername] = useState(sessionStorage.getItem(usernameSessionKey) || null)
	const [organizerLoggedIn, setOrganizerLoggedIn] = useState(JSON.parse(sessionStorage.getItem(organizerLoginSessionKey) || false))
	const [userLoggedIn, setUserLoggedIn] = useState(JSON.parse(sessionStorage.getItem(userLoginSessionKey) || false))

	
	const loginUser=(u) => {
		sessionStorage.setItem(userLoginSessionKey, true);
		//sessionStorage.setItem(organizerLoginSessionKey, false);
		sessionStorage.setItem(usernameSessionKey, u);

		setUserLoggedIn(true)
		setOrganizerLoggedIn(false)
		setloggedInUsername(u)
	};

	const loginOrganizer=(u) => {
		
		sessionStorage.setItem(organizerLoginSessionKey, true);
		//sessionStorage.setItem(userLoginSessionKey, false);
		sessionStorage.setItem(usernameSessionKey, u);	

		setOrganizerLoggedIn(true)
		setUserLoggedIn(false)
		setloggedInUsername(u)
	};

	const logOut=()=>{
		sessionStorage.setItem(userLoginSessionKey, false);
		sessionStorage.setItem(organizerLoginSessionKey, false);
		sessionStorage.setItem(usernameSessionKey, '');

		setUserLoggedIn(false)
		setOrganizerLoggedIn(false)	
		setloggedInUsername('')
	};

	const drawerToggleClickHandler = () => {
		setSideDrawerOpen(!sideDrawerOpen)
	};

	const backdropClickHandler = () => {
		setSideDrawerOpen(false)
	};
	return(
		<Router>
				<div className='page'>
					<div className='toolbar'>
						<Toolbar drawerClickHandler={drawerToggleClickHandler}/>
					</div>
					<div className='content'>
						<SideDrawer show={sideDrawerOpen} user={userLoggedIn} 
							organizer={organizerLoggedIn} username={loggedInUsername}
							logOut ={logOut}
						/>
						{sideDrawerOpen &&
							<Backdrop click={backdropClickHandler}/>

						}
						<Switch>
							<Route path="/" exact component={Home }/>
							<Route path="/loginpage" 
								render={() => 
									<LoginPage username={loggedInUsername}  
										userLoggedIn={userLoggedIn} organizerLoggedIn={organizerLoggedIn}
										loginUser={loginUser} loginOrganizer={loginOrganizer}
									/> 
								} 
							/>
							<Route path="/registerpage" exact component={RegisterPage}/>
							<Route path="/findeventpage" exact component={FindEventPage}/>
							<Route path="/finduserpage" exact component={FinduserPage}/>
							
							
							<Route path="/events/"  
								render={(props) =>
									<Event {...props} userLoggedIn={userLoggedIn} organizerLoggedIn={organizerLoggedIn} user_username={loggedInUsername}/>
								}
							/>

							<Route path="/createeventpage" exact  
								render={(props) =>
									<CreateEventPage {...props} organizer_username={loggedInUsername}/>
								}
							/>
							<Route path="/users/" 
								render={(props) =>
									<UserProfilePage {...props} user_username={loggedInUsername}/>
								}
							/>
						</Switch>
					</div>
				</div>
			</Router>
	)
}

export default App;