import React, { useState } from 'react';
import { CSSTransition, TransitionGroup } from 'react-transition-group';


//COMPONENTS
import UiInput from 'components/UiInput';
import UiButton from 'components/UiButton';
import UiScroll from 'components/UiScroll';

//STYLES
import 'assets/css/userCopyright.scss';

const MyOrderReservationCopyright = ({
	bindClickConfirmBtn = () => { },
	checked,
	history,
	...props
}) => {
	const [isAgreeChecked, setIsAgreeChecked] = useState(checked);
	return (
		<div className="myOrderReservationCopyright">
			<div className="innerWrap">
				<div className="ucTit">예약 안내사항</div>
				<div className="ucContBox">
					<UiScroll style={{height: '18.95rem'}} className="agreeScroll">
						약관 스크롤<br />
								약관 스크롤<br />
								약관 스크롤<br />
								약관 스크롤<br />
								약관 스크롤<br />
								약관 스크롤<br />
								약관 스크롤<br />
								약관 스크롤<br />
								약관 스크롤<br />
								약관 스크롤<br />
								약관 스크롤<br />
								약관 스크롤<br />
								약관 스크롤<br />
								약관 스크롤<br />
								약관 스크롤<br />
								약관 스크롤 <br />
					</UiScroll>
				</div>
				<div className="ucTit MT35">이용약관</div>
				<div className="ucContBox">
					<UiScroll style={{height: '18.95rem'}} className="agreeScroll">
						서비스명 개인정보처리방침<br />
								서비스명 개인정보처리방침<br />
								서비스명 개인정보처리방침<br />
								서비스명 개인정보처리방침<br />
								서비스명 개인정보처리방침<br />
								서비스명 개인정보처리방침<br />
								서비스명 개인정보처리방침<br />
								서비스명 개인정보처리방침<br />
								서비스명 개인정보처리방침<br />
								서비스명 개인정보처리방침<br />
								서비스명 개인정보처리방침<br />
								서비스명 개인정보처리방침<br />
								서비스명 개인정보처리방침<br />
								서비스명 개인정보처리방침<br />
								서비스명 개인정보처리방침<br />
								서비스명 개인정보처리방침 <br />
					</UiScroll>
				</div>
				{/* <div className="agContBox MT40">
					<UiInput type="checkbox" size="sm" id="chk3" label={(
						<>
							<strong className="strong">예약 안내사항</strong> 및 <strong className="strong">이용약관</strong>에 동의합니다
						</>
					)} onChange={event => setIsAgreeChecked(event.target.checked)} checked={isAgreeChecked} />
				</div>
				<div className="ucBtnWrap">
					<UiButton
						onClick={() => {
							bindClickConfirmBtn(isAgreeChecked);
						}}
						disabled={!isAgreeChecked ? true : false}
					>확인</UiButton>
				</div> */}
			</div>
		</div>
	)
}
export default MyOrderReservationCopyright;