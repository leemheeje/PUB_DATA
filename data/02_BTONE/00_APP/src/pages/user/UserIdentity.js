import React, { useState } from 'react';
import { useParams } from 'react-router';

//COMPONENTS
import UiInput from 'components/UiInput';
import UiButton from 'components/UiButton';

//STYLES
import 'assets/css/userIdentity.scss';

const UserIdentity = () => {
	const { type } = useParams();
	const [userPhoneNumber, setUserPhoneNumber] = useState('');
	const [isUserPhoneNumber, setIsUserPhoneNumber] = useState('');
	return (
		<div className="container userIdentity">
			<button onClick={() => setIsUserPhoneNumber(false)}>확인버튼 클릭시 오류메시지</button>
			<button onClick={() => setIsUserPhoneNumber(true)}>확인버튼 클릭시 확인메시지</button>
			<div className="innerWrap">
				<div className="usfPassInner">
					<div className="topTxts">
						{
							type === 'phoneNumber'
								? <div className="tit">전화번호 변경</div>
								: <div className="tit">본인인증으로 찾기</div>
						}
						<div className="stit">
							본인 명의의 휴대폰 번호로 인증하실 수 있습니다<br />
							<strong className="strong">(본인 주민등록번호로 가입된 휴대폰 번호)</strong><br /><br />

							타인 명의의 휴대폰 또는 법인 폰을 이용 중인 회원님은<br />
							휴대폰 인증이 불가합니다
						</div>
					</div>
					<div className="midCont">
						<div className="lt">
							<UiInput
								type="tel"
								placeholder="-없이 숫자만 입력해주세요"
								onFailureMessage={isUserPhoneNumber === false}
								failureMessage="가입되지 않은 번호입니다."
								onSuccessMessage={isUserPhoneNumber}
								successMessage={
									type === 'phoneNumber'
										? (<>확인 되었습니다 변경하실 휴대폰 번호로 <br /> 본인인증을 진행해주세요</>)
										: "확인 되었습니다 휴대폰 본인인증을 진행해주세요"
								}
								onChange={event => {
								let { value } = event.target;
								if (!value) {
									setIsUserPhoneNumber('');
								}
								setUserPhoneNumber(value);
							}}
							/>
						</div>
						<div className="rt">
							<UiButton disabled={!userPhoneNumber ? true : false} className={`outline shadowNone ${!userPhoneNumber ? '' : 'red'}`} onClick={() => {
								setIsUserPhoneNumber(true); //회원정보가 있을때
								//setIsUserPhoneNumber(false); //회원정보가 없을때
							}}>확인</UiButton>
						</div>
					</div>
					<div className="fotAre">
						<UiButton disabled={!isUserPhoneNumber ? true : ''}>휴대폰 본인인증</UiButton>
					</div>
				</div>
			</div>
		</div>
	)
}
export default UserIdentity;