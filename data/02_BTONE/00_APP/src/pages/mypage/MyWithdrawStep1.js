import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';

// COMPONENTS
import UiInput from 'components/UiInput'
import UiSelect from 'components/UiSelect'
import UiButton from 'components/UiButton'

const MyWithdrawStep1 = () => {
	const history = useHistory();
	const myPhoneNum = '010 - 44** - **87'
	const myPasswordNum = '123456789'	// 임시 비밀번호
	const [myPhoneNumber, setMyPhoneNumber] = useState(myPhoneNum)
	const [userPassword, setUserPassword] = useState('') // 비밀번호
	const [userPasswordSameCheck, setUserPasswordSameCheck] = useState(false)	// 비밀번호 일치 체크 State
	const [reasonCheck, setReasonCheck] = useState(0) // 탈퇴이유 선택

	return (
		<div className="myWithdrawWrap step1">
			<div className="topTxts">
				<div className="tit">회원탈퇴 전 확인해야 할 유의사항</div>
				<ul className="list">
					<li>탈퇴 후 재가입 시, 제한을 받을 수 있습니다</li>
					<li>탈퇴 시 보유하고 계신 포인트, 쿠폰은 소멸되며 재발행이 불가능합니다</li>
					<li>한 번 탈퇴한 휴대폰 번호는 N개월동안 재가입이 불가능하니 유의하시기 바랍니다</li>
					<li>
						탈퇴한 회원의 서비스명 이용내역은 모두 삭제되며, 삭제된 데이터는 추후 복구가 불가합니다
						<span className="point">단, 이용 중 작성한 리뷰와 결제내역은 N년까지 보관됩니다</span>
					</li>
					<li>
						회원탈퇴 시 즉시 삭제되는 정보는 다음과 같습니다<br/>
						휴대폰 번호, 주문 이력, 예약 / 줄서기 이력, 선호 지역, 포인트, 쿠폰, 결제 카드정보
					</li>
				</ul>
			</div>
			<div className="phoneNumberBox">
				<div className="topTxts">
					<div className="tit">휴대폰 번호</div>
				</div>
				<UiInput type="text" defaultValue={myPhoneNumber} className="roboto" readOnly />
			</div>
			<div className="newPasswordBox">
				<div className="topTxts">
					<div className="tit">비밀번호</div>
				</div>
				<div className="passwordBox">
					<div className="list">
						<UiInput
							type="password"
							maxlength="16"
							pattern={myPasswordNum}
							onChange={event => {
								let { value } = event.target;
								if (!value) {
									setUserPassword('');
									setUserPasswordSameCheck(false);
									return;
								}
								if (myPasswordNum === value) {
									setUserPassword(value);
									setUserPasswordSameCheck(true);
								} else {
									setUserPassword('');
									setUserPasswordSameCheck(false);
								}
							}}
						/>
					</div>
				</div>
			</div>
			<div className="reasonBox">
				<div className="topTxts">
					<div className="tit">회원탈퇴 사유</div>
				</div>
				<UiSelect onChange={e => { setReasonCheck(e.target.value); }}>
					<option value="">탈퇴 사유 선택</option>
					<option value="1">서비스의 다양성 부족</option>
					<option value="2">이용빈도 낮음</option>
					<option value="3">쿠폰 / 포인트 등 혜택이 적음</option>
					<option value="4">어플 실행 속도 불만</option>
					<option value="5">기타</option>
				</UiSelect>
			</div>

			<UiButton onClick={() => history.push('/mypage/MyWithDraw/step2')} disabled={!userPassword || !reasonCheck ? true : false}>회원탈퇴</UiButton>
		</div>
	)
}
export default MyWithdrawStep1;