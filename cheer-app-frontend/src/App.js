import React, {Component} from 'react';
import Toolbar from './components/Toolbar/Toolbar';
import SideDrawer from './components/SideDrawer/SideDrawer';
import Backdrop from './components/Backdrop/Backdrop'
import {BrowserRouter as Router, Switch, Route} from 'react-router-dom';

import Login from './components/Pages/Login/Login'
import Home from './components/Pages/Homepage/Home'

class App extends Component {
	state = {
		sideDrawerOpen:false,
		userLoggedIn:false,
		organizerLoggedIn:false,
		username:'nikolas1360'

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
						organizer={this.state.organizerLoggedIn} username={this.state.username}/>
					{backdrop}

					
					<Switch>
						<Route path="/" exact component={Home }/>
						<Route path="/login" component={Login}/>
						
        			</Switch>
					
				
				</div>
			</Router>
			
			
		);
	}
	
}

export default App;
