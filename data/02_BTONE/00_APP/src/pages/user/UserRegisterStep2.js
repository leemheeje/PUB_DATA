import React, { useState } from 'react';
import { CSSTransition } from 'react-transition-group';
import { useLocation, useHistory } from 'react-router';

//CSSTransition.types
import { CSSTransitionTypes } from '../../CSSTransitionTypes';

//COMPONENTS
import UiInput from 'components/UiInput';
import UiButton from 'components/UiButton';
import UiModal from 'components/UiModal';
import UiToast from 'components/UiToast';

//PAGES
import UserCopyright from './UserCopyright';

//STYLES
import 'assets/css/userRegister.scss';

const UserRegisterStep2 = ({
	history,
	...props
}) => {
	const [joinWayCheck, setJoinWayCheck] = useState(false) // 가입 방법 체크
	const query = new URLSearchParams(useLocation().search);
	const [onModalOpen, setOnModalOpen] = useState(false);
	const [actionModalClose, setActionModalClose] = useState(false);
	const [userPassword, setUserPassword] = useState('');
	const [userPasswordValidityCheck, setUserPasswordValidityCheck] = useState('');
	const [userPasswordConfirm, setUserPasswordConfirm] = useState(false);
	const [userPasswordConfirmValidityCheck, setUserPasswordConfirmValidityCheck] = useState('');
	const [isCheckboxValidityCheck, setIsCheckboxValidityCheck] = useState(false);
	const [completeToastOpen, setCompleteToastOpen] = useState(false);
	const handlerRegisterButton = () => {
		history.push('/user/userRegister/step3');
	}
	return (
		<div className="userRegister">
			{/* 임시버튼 */}
			<button onClick={() => setJoinWayCheck(true)}>일반회원가입일때</button>
			<button onClick={() => setJoinWayCheck(false)}>결제/예약중이동했을때</button><br/>
			{joinWayCheck ? '현재 화면 = 일반회원가입일때' : '현재 화면 = 결제/예약중이동했을때'}

			<div className="userRegisterStep2">
				<div className="innerWrap">
					<div className="tit">휴대폰 번호</div>
					<div className="inputArea MT20">
						<UiInput type="text" defaultValue="0194" readOnly />
					</div>
					<div className="tit MT90">비밀번호</div>
					<div className="stit">8 - 16자 영문 대 소문자, 숫자, 특수문자를 사용해주세요</div>
					<div className="inputArea MT20">
						<UiInput
							type="password"
							placeholder="비밀번호 (8-16자 영문+숫자, 영문+특수문자)"
							maxlength="16"
							pattern="\S{8,16}"
							onFailureMessage={userPasswordValidityCheck === false}
							failureMessage="8 ~16자 영문,숫자,특수문자를 사용해주세요"
							onChange={(event, patternTest) => {
								let { value } = event.target;
								if (!value) {
									setUserPasswordValidityCheck('');
									setUserPassword('');
									return;
								}
								setUserPasswordValidityCheck(patternTest);
								setUserPassword(event.target.value);
							}}
						/>
					</div>
					<div className="inputArea MT45">
						<UiInput
							type="password"
							placeholder="비밀번호 확인"
							maxlength="16"
							pattern={`${userPassword}`}
							onFailureMessage={userPasswordConfirmValidityCheck === false}
							failureMessage="일치하지 않습니다 다시 입력해주세요"
							onChange={event => {
								let { value } = event.target;
								if (!value) {
									setUserPasswordConfirmValidityCheck('');
									setUserPasswordConfirm(false);
									return;
								}
								if (userPassword === value) {
									setUserPasswordConfirmValidityCheck(true);
									setUserPasswordConfirm(true);
								} else {
									setUserPasswordConfirmValidityCheck(false);
									setUserPasswordConfirm(false);
								}
							}}
						/>
					</div>
					<div className="inputArea MT40">
						<div className="copyCheck">
							<UiInput type="checkbox" id="chk1" label={
								<span><strong className="strong">이용약관</strong> 및 <strong className="strong">개인정보처리방침</strong>에 동의합니다</span>
							} size="sm" onChange={event => setIsCheckboxValidityCheck(event.target.checked)} checked={isCheckboxValidityCheck} />
						</div>
						<div className="copyBtn">
							<UiButton className="text UNDERLINE" onClick={() => history.push('?copyright=true')}>
								자세히 보기
								<img src={require(`assets/images/common/icoArrowGray_15.png`)} alt=""/>
							</UiButton>
						</div>
					</div>
					<UiButton disabled={userPasswordConfirm === false || isCheckboxValidityCheck === false} className="MT95" 
					onClick={joinWayCheck ? handlerRegisterButton : () => setCompleteToastOpen(true)}>회원가입</UiButton>

					{completeToastOpen && <UiToast bindCloseCallback={() => { history.push('/payment/mypayment/'); setCompleteToastOpen(false); }}>PICK오더 <br />가입이 완료 되었습니다 </UiToast>}
				</div>
			</div>

			<CSSTransition
				{
				...{
					...CSSTransitionTypes.inOutY,
					...{
						in: query.get('copyright') === 'true',
						onEnter: () => { },
					}
				}
				}
			>
				<UiModal
					bindOnloadCallback={() => console.log('bindOnloadCallback')}
					bindCloseCallback={() => console.log('bindCloseCallback')}
					bindClickCancelBtn={() => { }}
					headerName="서비스 약관">
					<UserCopyright
						checked={isCheckboxValidityCheck}
						bindClickConfirmBtn={() => {
							setIsCheckboxValidityCheck(true);
							history.goBack();
						}} />
				</UiModal>
			</CSSTransition>
		</div >
	)
}
export default UserRegisterStep2;