import React, { useState } from 'react';
import '../assets/css/uiButton.scss';

const UiButton = ({ className, ...props }) => {

	return (
		<>
			<button className={`btnType1 ${className}`} {...props}>{props.children || props.text}</button>
		</>
	)
}
export default UiButton;