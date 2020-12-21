import React from 'react';
import '../assets/css/uiButton.scss'

const UiButton = ({
	events,
	keys,
	disabled,
	className,
	...props
}) => {

	return (
		<button className={className} {...props} disabled={disabled}>{typeof keys !== 'undefined' ? keys : props.children}</button>
	)
}
export default UiButton;