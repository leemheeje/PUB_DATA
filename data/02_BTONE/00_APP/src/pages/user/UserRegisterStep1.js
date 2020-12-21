import React, { useState } from 'react';

//COMPONENTS
import UiButton from 'components/UiButton';

//STYLES
import 'assets/css/userRegister.scss';

const UserRegisterStep1 = () => {
	return (
		<div className="userRegister">
			<div className="userRegisterStep">
				<div className="innerWrap">
					<div className="tit icoPhoneAuth">
						<img src={require(`assets/images/common/icoPhoneAuth.png`)} alt=""/>
						휴대폰 인증
					</div>
					<div className="stit">
						회원가입을 위해서는<br />
						<strong className="strong">본인 명의의 휴대폰인증이 필요합니다</strong>
					</div>
					<div className="btnWrap">
						<UiButton>인증하기</UiButton>
					</div>
				</div>
			</div>
		</div>
	)
}
export default UserRegisterStep1;