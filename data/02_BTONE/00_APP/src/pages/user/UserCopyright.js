import React, { useState } from 'react';
import { CSSTransition, TransitionGroup } from 'react-transition-group';


//COMPONENTS
import UiInput from 'components/UiInput';
import UiButton from 'components/UiButton';
import UiScroll from 'components/UiScroll';

//STYLES
import 'assets/css/userCopyright.scss';

const UserCopyright = ({
	bindClickConfirmBtn = () => { },
	checked,
	history,
	...props
}) => {
	const [isAgreeChecked, setIsAgreeChecked] = useState(checked);
	return (
		<div className="userCopyright">
			<div className="innerWrap">
				<div className="ucTit">서비스명 이용약관</div>
				<div className="ucContBox">
					<UiScroll className="agreeScroll">
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
				<div className="ucTit MT35">서비스명 개인정보처리방침</div>
				<div className="ucContBox">
					<UiScroll className="agreeScroll">
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
				<div className="agContBox MT40">
					<UiInput type="checkbox" size="sm" id="chk3" label={(
						<>
							<strong className="strong">이용약관</strong> 및 <strong className="strong">개인정보처리방침</strong>에 동의합니다
						</>
					)} onChange={event => setIsAgreeChecked(event.target.checked)} checked={isAgreeChecked} />
				</div>
				<div className="ucBtnWrap MT95">
					<UiButton
						onClick={() => {
							bindClickConfirmBtn(isAgreeChecked);
						}}
						disabled={!isAgreeChecked ? true : false}
					>확인</UiButton>
				</div>
			</div>
		</div>
	)
}
export default UserCopyright;