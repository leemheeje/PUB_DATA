import React from 'react';
import '../assets/css/UiButton.scss'

const UiButton = props => {
	return (
		<>
			{
				props.href
					? <a {...props}>{props.children}</a>
					: <button {...props}>{props.children}</button>
			}
		</>

	)
}
export default UiButton;