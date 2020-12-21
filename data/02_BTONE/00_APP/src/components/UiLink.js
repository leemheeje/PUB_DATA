import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import '../assets/css/uiButton.scss';


const UiLink = ({ to = '/', className, ...props }) => {

	let linkAble = '';
	if (props.to == '#;') {
		linkAble = 'none';
	}

	return (
		<>
			<Link className={`btnType1 ${linkAble} ${className}`} to={to}{...props}>{props.children || props.text}</Link>
		</>
	)
}
export default UiLink;