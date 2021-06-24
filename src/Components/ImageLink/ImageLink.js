import React from 'react';
import './ImageLink.css'

const ImageLink =({onInputChange, onButtonSubmit})=>{
	return(
		<div>
			<p className='f3'>
				{"Baap ka, Dada ka, Bhai ka, Sbka Face Recognize kr lega. Tu bas Photo Nikal"}
			</p>
			<div className='center'>
				<div className='pa4 br3 shadow-5 center form'>
					<input type='text' className='f4 pa2 w-70 center' onChange={onInputChange} placeholder='Image Link' />
					<button className='w-30 grow f4 link ph3 pv2 dib bg-light-purple'onClick={onButtonSubmit}>Detect</button>
				</div>
			</div>
		</div>
	);
}

export default ImageLink;