import React from 'react';
import Tilt from 'react-tilt';
import './Logo.css';
import brain from './brain.jpg';

const Logo = () => {
	return (
		<div className='ma4 mt0 logo'>

			<Tilt className="Tilt br2 shadow-2" options={{ max : 25 }} style={{ height: 250, width: 250 }} >
 			<div className="Tilt-inner"><img alt='' src={brain}/></div>
			</Tilt>
			
		</div>
	);
}

export default Logo;