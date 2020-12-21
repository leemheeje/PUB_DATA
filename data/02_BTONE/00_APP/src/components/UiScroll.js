import React from 'react';
import RSC from "react-scrollbars-custom";
import '../assets/css/uiScroll.scss';


const UiScroll = (props) => {

	const { className, style = {
		height: '12.5rem'
	} } = props;

	return (
		<div className={`scrollWrap ${className}`}>
			<RSC style={style}>
				<div className="scText">
					{props.children}
				</div>
			</RSC>
		</div>
	)
}


export default UiScroll;