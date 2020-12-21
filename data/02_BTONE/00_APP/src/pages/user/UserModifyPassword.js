import React, { useState } from 'react';
import { useHistory } from 'react-router';

//COMPONENTS
import UiInput from 'components/UiInput';
import UiButton from 'components/UiButton';
import UiToast from 'components/UiToast';

//STYLES
import 'assets/css/userIdentity.scss';

const UserModifyPassword = ({
	...props
}) => {
	const history = useHistory();
	const [modifyToastPop, setModifyToastPop] = useState(false);
	const [userPassword, setUserPassword] = useState('');
	const [userPasswordValidityCheck, setUserPasswordValidityCheck] = useState('');
	const [userPasswordConfirm, setUserPasswordConfirm] = useState(false);
	const [userPasswordConfirmValidityCheck, setUserPasswordConfirmValidityCheck] = useState('');
	const handlerModifyPassword = () => {
		setModifyToastPop(true);
	}

	return (
		<div className="container userIdentity">
			<div className="innerWrap">
				<div className="usfPassInner">
					<div className="topTxts">
						<div className="tit">비밀번호 변경</div>
						<div className="stit">
							8 - 16자 영문 대소문자, 숫자, 특수문자를 사용해주세요
						</div>
					</div>
					<div className="midCont nopad">
						<div className="list">
							<UiInput
								type="password"
								placeholder="새 비밀번호 (8-16자 영문+숫자, 영문+특수문자)"
								maxlength="16"
								pattern="^(?=.*[a-zA-Z])(?=.*\d)(?=.*[@$!%*?&])[a-zA-Z\d@$!%*?&]{8,16}$"
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
						<div className="list">
							<UiInput
								type="password"
								placeholder="새 비밀번호 확인"
								maxlength="16"
								pattern={`${userPassword}`}
								onFailureMessage={userPasswordConfirmValidityCheck === false}
								failureMessage="일치하지 않습니다. 다시 입력해주세요"
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
					</div>
					<div className="fotAre">
						<UiButton disabled={userPasswordConfirm === false} onClick={handlerModifyPassword}>비밀번호 변경</UiButton>
					</div>
				</div>
			</div>
			{
				modifyToastPop && <UiToast bindCloseCallback={() => {
					setModifyToastPop(false);
					history.push('/user/userLogin');
				}}>비밀번호를 변경하였습니다</UiToast>
			}
		</div>
	)
}
export default UserModifyPassword;