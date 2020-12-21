import React, { useState, useEffect } from 'react';
import 'assets/css/popup.scss';

//팝업모달
const PopupModal = (props) => {
	const [state, setState] = useState(props);
	const [seconds, setSeconds] = useState(5);
	const { children, faceModal, closeCallback } = state;
	let interval;
	useEffect(() => {
		if (faceModal) {
			interval = setInterval(() => {
				setSeconds(seconds => seconds - 1);
			}, 1000);
		}
		return () => {
			clearInterval(interval);
		};
	}, [faceModal]);

	useEffect(() => {
		if (seconds == 0) {
			closeCallback({
				faceModal: false
			});
			setState({});
		}
	}, [seconds]);

	return (
		<>
			{
				Object.keys(state).length
					? <div className="PopupModal">
						<div className="bg"></div>
						<div className="popIn">
							{
								faceModal
									?
									<div className="faceLogout">
										<div className="tit">안면인식 로그인이 종료됩니다<br />
											이어서 진행하시려면 안면 인식을 <br />
											진행해 주시기 바랍니다
										</div>
										<div className="logoutTime"><span>{seconds}초</span> 후 자동 로그아웃 됩니다</div>
									</div>
									:
									children
							}
						</div>
					</div>
					: ''
			}
		</>
	);
};

export default PopupModal;