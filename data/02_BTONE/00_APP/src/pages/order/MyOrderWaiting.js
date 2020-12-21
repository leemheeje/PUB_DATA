import React, { useState, useEffect, useRef } from 'react';
import { CSSTransition } from 'react-transition-group';
import { useHistory, useLocation } from 'react-router';

//CSSTransition.types
import { CSSTransitionTypes } from '../../CSSTransitionTypes';

//COMPONENTS
import UiLink from 'components/UiLink';
import UiButton from 'components/UiButton';
import UiCalendar from 'components/UiCalendar';
import UiInput from 'components/UiInput';
import UiTextarea from 'components/UiTextarea';
import UiCountAddRem from 'components/UiCountAddRem';
import UiSelect from 'components/UiSelect';
import UiModal from 'components/UiModal';
import Navigator from 'components/Navigator';

//PAGES
import WaitingCopyright from './WaitingCopyright'

//STYLES
import 'assets/css/myOrderWaiting.scss';

const MyOrderWaiting = ({
	...props
}) => {
	const history = useHistory();
	const query = new URLSearchParams(useLocation().search);
	const [onModalOpen, setOnModalOpen] = useState(false);
	const [isCheckboxValidityCheck, setIsCheckboxValidityCheck] = useState(false);
	const [phoneNumber, setPhoneNumber] = useState('');
	const [peopleCheck, setPeopleCheck] = useState(2);

	const handlerSubmitWaiting = () => {
		console.log(phoneNumber);
		console.log(peopleCheck);
		history.push('/payment/paymentcompletion/waiting');
	}
	const handlerWaitingReload = () => {
	}
	return (
		<div className="container">
			<div className="myOrderWaiting">
				<div className="innerWrap">
					<div className="mowaTop">
						<div className="mrcont">
							<div className="mrt MB20" onClick={() => handlerWaitingReload()}>
								<img src={require(`assets/images/common/icoReload_26.png`)} alt=""/>
								새로고침
							</div>
							<div className="inner">
								<div className="lst">
									<div className="ltp">
										<div className="lb">내 앞 대기팀</div>
										<div className="vl">
											<span className="roboto">01</span>팀
										</div>
									</div>
									<div className="ltp">
										<div className="lb">예상 대기시간</div>
										<div className="vl">
											<span className="roboto">30</span>분
										</div>
									</div>
									<div className="inf">
										<img src={require(`assets/images/common/icoCircleError.png`)} alt=""/>
										대기시간은 매장 상황에 따라 변동될 수 있습니다
									</div>
								</div>
							</div>
						</div>
					</div>
					<div className="mowaCont">
						<div className="tit MT90">휴대폰 번호</div>
						<div className="stit">줄서기 알림 메세지를 받기위한 번호를 입력해주세요</div>
						<div className="muinput MT30">
							<UiInput type="text" onChange={event => setPhoneNumber(event.target.value)} />
						</div>
						<div className="tit MT70">방문 인원</div>
						<div className="stit rel">
							인원 수를 설정해주세요
							<div className="mucount ">
								<UiCountAddRem min_count={2} count={2} watchCount={count => {
									setPeopleCheck(count);
								}} />
							</div>
						</div>

						<div className="inputArea MT80">
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

					</div>
					<div className="btnWrap MT80">
						<UiButton disabled={
							!peopleCheck
								|| !isCheckboxValidityCheck
								|| !phoneNumber
								? true
								: false
						} onClick={() => handlerSubmitWaiting()}>줄서기 접수</UiButton>
					</div>
				</div>

				<Navigator />
			</div>
			<CSSTransition
				{
				...{
					...CSSTransitionTypes.inOutY,
					...{
						in: query.get('copyright'),
						onEnter: () => { },
					}
				}
				}
			>
				<UiModal
					bindOnloadCallback={() => console.log('bindOnloadCallback')}
					bindCloseCallback={() => console.log('bindCloseCallback')}
					bindClickCancelBtn={() => { }}
					headerName="회원가입">
					<WaitingCopyright
						checked={isCheckboxValidityCheck}
						bindClickConfirmBtn={() => {
							setIsCheckboxValidityCheck(true);
							history.goBack();
						}} />
				</UiModal>
			</CSSTransition>
		</div>
	)
}
export default MyOrderWaiting;