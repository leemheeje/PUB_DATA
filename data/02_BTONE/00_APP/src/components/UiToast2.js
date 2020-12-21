import React, { useState, useEffect } from 'react';

//STYLES
import '../assets/css/uiDialog.scss';

//팝업토스트
const PopupToast = (props) => {
	const [state, setState] = useState(props);
	const { children, duration = 1000, closeCallback } = state;

	useEffect(() => {
		setTimeout(() => {
			closeCallback(state);
		}, duration);
	}, []);

	return (
		<>
			{
				<div className="uiDialog toast">
					<div className="dimm"></div>
					<div className="uiDialogBox">
						<div className="uiDialogContBox">
							<div className="uiDialogCont">
								{children}
							</div>
						</div>
					</div>
				</div>
			}
		</>
	);
};

export default PopupToast;

