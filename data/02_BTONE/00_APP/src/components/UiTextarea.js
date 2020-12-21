import React, { useState, useRef } from 'react';
import '../assets/css/uiTextarea.scss';

const UiTextarea = ({
	id,
	label,
	isbyte,
	onFailureMessage,
	failureMessage,
	onFocus = () => { },
	onBlur = () => { },
	...props
}) => {
	const [componentInputFocus, setComponentInputFocus] = useState(false);

	return (
		<div className={`uiTextarea field textarea ${
			isbyte === 'true' ? 'isByte' : ''
			}`}>
			{label && <label id={id} className="lb required">게임 소개글</label>}
			<div className={`ip ${
				componentInputFocus
					? 'focus'
					: ''
				}`}>
				<textarea id={id} onFocus={() => {
					setComponentInputFocus(true);
					onFocus();
				}} onBlur={() => {
					setComponentInputFocus(false);
					onBlur();
				}} {...props}></textarea>
			</div>
			{
				isbyte === 'true'
				&&
				<div className="byte">
					150 / 400byte
				</div>
			}
			{
				!props.readOnly && onFailureMessage && <div className="errMsg"><img src={require(`assets/images/common/icoCircleError.png`)} alt=""/>{failureMessage}</div>
			}
		</div>
	)
}

export default UiTextarea;