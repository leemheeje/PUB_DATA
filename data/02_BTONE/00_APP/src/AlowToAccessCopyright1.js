import React, { useState } from 'react';
import { CSSTransition, TransitionGroup } from 'react-transition-group';


//COMPONENTS
import UiInput from 'components/UiInput';
import UiButton from 'components/UiButton';
import UiScroll from 'components/UiScroll';

//STYLES
import 'assets/css/userCopyright.scss';

//PAGES
import AlowToAccessCopyrightService from './AlowToAccessCopyrightService';

const AlowToAccessCopyright1 = ({
	bindClickConfirmBtn = () => { },
	checked,
	history,
	...props
}) => {
	const [isAgreeChecked, setIsAgreeChecked] = useState(checked);
	return (
		<div className="userCopyright">
			<div className="innerWrap">
				<div className="ucTit">PICK오더 이용약관</div>
				<div className="ucContBox">
					<UiScroll className="agreeScroll" style={{ height: `33.8rem` }}>
						<AlowToAccessCopyrightService/>
					</UiScroll>
				</div>
				<div className="agContBox MT40">
					<UiInput type="checkbox" size="sm" id="chk3" label={(
						<>
							<strong className="strong">이용약관</strong>에 동의합니다
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
export default AlowToAccessCopyright1;