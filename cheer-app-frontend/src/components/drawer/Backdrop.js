import React from 'react'

import '../styles/Backdrop.css'

const Backdrop = props =>(
    <div className='backdrop' onClick={props.click}/>
);

export default Backdrop;