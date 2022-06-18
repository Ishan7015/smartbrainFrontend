import React from 'react';

const Rank = (props) =>{
	return(
		<div>	
			<div className='white f4'>
				{`${props.name}, number of photos uploaded is:`}
			</div>
			<div className='white f1'>
				{props.count}
			</div>
		</div>	
	);
}

export default Rank;
