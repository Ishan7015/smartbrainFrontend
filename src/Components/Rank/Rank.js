import React from 'react';

const Rank = (props) =>{
	return(
		<div>	
			<div className='white f4'>
				{`${props.name}, wah bete wa, moj kr di, je tum toh bade heavy driver ho`}
			</div>
			<div className='white f1'>
				{props.count}
			</div>
		</div>	
	);
}

export default Rank;