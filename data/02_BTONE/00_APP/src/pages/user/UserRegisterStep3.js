import React, { useState } from 'react';

//COMPONENTS
import UiModal from 'components/UiModal';
import UiLink from 'components/UiLink';

//STYLES
import 'assets/css/userRegister.scss';

const UserRegisterStep3 = () => {
	return (
		<UiModal>
			<div className="userRegister">
				<div className="userRegisterStep aligncenter">
					<div className="innerWrap">
						<div className="tit icoRegisterComplete">
							<img src={require(`assets/images/common/icoRegisterComplete.png`)} alt=""/>
							회원 가입 완료
						</div>
						<div className="stit"> 가입이 완료되었습니다 </div>
						<div className="tit sm MT30"> 
						<strong className="strong">PICK오더</strong>에서<br/>
						스마트한 주문과 결제를 경험해보세요
						</div>
						<div className="btnWrap MT80">
							<UiLink to="/">메인으로 돌아가기</UiLink>
						</div>
					</div>
				</div>
			</div>
		</UiModal>
	)
}
export default UserRegisterStep3;