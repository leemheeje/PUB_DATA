import React from 'react';
import {useParams, useHistory } from "react-router-dom";

//COMPONENTS
import UiStep from 'components/UiStep';

//PAGES
import UserRegisterStep1 from 'pages/user/UserRegisterStep1';
import UserRegisterStep2 from 'pages/user/UserRegisterStep2';
import UserRegisterStep3 from 'pages/user/UserRegisterStep3';

//STYLES
import 'assets/css/userRegister.scss';

const UserRegister = ({
	...props
}) => {
	const history = useHistory();
	let stepActiveIndex = 0;
	let { registerSetStep } = useParams();

	const getUserRegisterStep = () => {
		let step = '';

		switch (registerSetStep) {
			case 'step2':
				step = <UserRegisterStep2 history={history}/>;
				break;
			case 'step3':
				step = <UserRegisterStep3 history={history}/>;
				break;
			default:
				step = <UserRegisterStep1 history={history}/>;
				break;
		}
		return step;
	}
	return (
		<div className="container userRegister">
			<div className="ureInner">
				<div className="ureTop">
					<UiStep steps={['본인인증', '개인정보입력', '완료']} activeIndex={
						registerSetStep === 'step1'
							? 0
							: registerSetStep === 'step2'
								? 1
								: registerSetStep === 'step3'
									? 2
									: null
					} />
				</div>
				<div className="ureMid">
					{getUserRegisterStep()}
				</div>
			</div>
		</div>
	)
}
export default UserRegister;