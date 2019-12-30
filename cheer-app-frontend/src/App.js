import React, {Component} from 'react';
import {BrowserRouter as Router, Switch, Route} from 'react-router-dom';

import Toolbar from './components/drawer/Toolbar';
import SideDrawer from './components/drawer/SideDrawer';
import Backdrop from './components/drawer/Backdrop'

import RegisterPage from './components/users/RegisterPage'
import LoginPage from './components/users/LoginPage'
import FindEventPage from './components/events/FindEventPage'
import Home from './components/Home'

class App extends Component {
	state = {
		sideDrawerOpen:false,
		userLoggedIn:false,
		organizerLoggedIn:false,
		username:''
	};

	loginUser=(u) => {
		this.setState({username:u})
		this.setState({userLoggedIn:true});	
	};

	loginOrganizer=(u) => {
		this.setState({username:u})
		this.setState({organizerLoggedIn:true});
	};

	logOut=()=>{
		this.setState({userLoggedIn:false});
		this.setState({organizerLoggedIn:false});		
	};

	drawerToggleClickHandler = () => {
		this.setState((prevState) => {
			return{sideDrawerOpen: !prevState.sideDrawerOpen};
		});
	};

	backdropClickHandler = () => {
		this.setState({sideDrawerOpen:false});
	};

	render(){
		
		let backdrop;

		if(this.state.sideDrawerOpen){
			backdrop = <Backdrop click={this.backdropClickHandler}/>;
		}

		return (
			<Router>
				<div stle={{height: '100%'}}>
			
					<Toolbar drawerClickHandler={this.drawerToggleClickHandler}/>
					<SideDrawer show={this.state.sideDrawerOpen} user={this.state.userLoggedIn} 
						organizer={this.state.organizerLoggedIn} username={this.state.username}
						logOut ={this.logOut}
					/>
					{backdrop}

					
					<Switch>
						<Route path="/" exact component={Home }/>
						<Route path="/loginpage" 
							render={() => 
								<LoginPage username={this.state.username} password={this.state.password} 
									userLoggedIn={this.state.userLoggedIn} organizerLoggedIn={this.state.organizerLoggedIn}
									loginUser={this.loginUser} loginOrganizer={this.loginOrganizer}
								/> 
							} 
						/>
						<Route path="/registerpage" exact component={RegisterPage }/>
						<Route path="/findeventpage" exact component={FindEventPage }/>
						
        			</Switch>
					
				
				</div>
			</Router>
			
			
		);
	}
	
}

export default App;
