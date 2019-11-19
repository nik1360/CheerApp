import React from 'react'
import DrawerToggleButton from '../SideDrawer/DrawerToggleButton'

import './Toolbar.css'


const Toolbar = props => (
	
	<header className="toolbar">
		<nav className="toolbar_navigation">
				<div className='toolbar_drawer-toggle-button'>
					<DrawerToggleButton click={props.drawerClickHandler}/>
				</div>
				<div className="toolbar_logo"> <img src={require('../../images/cheerApp_logo.png')} alt='cheerApp_logo' /> </div>
				<div className="spacer"></div>
				<div className="toolbar_navigation-items">
					<ul>
						<li><a href="/">Home</a></li>
						<li><a href="/">Find Events</a></li>
						<li><a href="/">Suggest me!</a></li>
						<li><a href="/">Find friends</a></li>
					</ul>
				</div>
		</nav>
	</header>
	
);

export default Toolbar;