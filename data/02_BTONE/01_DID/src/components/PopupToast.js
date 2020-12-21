import React, { useState, useEffect } from 'react';
import 'assets/css/popup.scss';

//팝업토스트
const PopupToast = (props) => {
	const [state, setState] = useState(props);
	const { children, timer = 2000,closeCallback } = state;

	useEffect(() => {
		setTimeout(() => {
			closeCallback(state);
			//setState({});
		}, timer);
	}, []);
	return (
		<>
			{
				Object.keys(state).length ?
					<div className="popupToast">
						<div className="bg"></div>
						<div className="popIn">
							<div className="base_text">
								{children}
							</div>
						</div>
					</div>
					: undefined
			}
		</>
	);
};

export default PopupToast;