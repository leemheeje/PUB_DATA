import React from 'react';
import {useParams } from "react-router-dom";

//PAGES
import MyWithdrawStep1 from 'pages/mypage/MyWithdrawStep1';
import MyWithdrawStep2 from 'pages/mypage/MyWithdrawStep2';

//STYLES
import 'assets/css/myPage.scss';

const MyWithdraw = () => {
	let { withdrawStep } = useParams();

	const getWithdrawStep = () => {
		let step = '';

		switch (withdrawStep) {
			case 'step2':
				step = <MyWithdrawStep2 />;
				break;
			default:
				step = <MyWithdrawStep1 />;
				break;
		}
		return step;
	}
	return (
		<div className="container mypage">
			{getWithdrawStep()}
		</div>
	)
}
export default MyWithdraw;