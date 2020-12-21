import React, { useState, useEffect, useRef } from 'react';
import { useLocation, useHistory } from 'react-router';
import { CSSTransition } from 'react-transition-group';

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
import MyOrderReservationCopyright from './MyOrderReservationCopyright';

//STYLES
import 'assets/css/reservation.scss';

const MyOrderReservation = ({
	...props
}) => {
	const history = useHistory();
	const query = new URLSearchParams(useLocation().search);
	const date = new Date();
	const getYear = date.getFullYear();
	const getMonth = date.getMonth() + 1;
	const getDate = date.getDate();
	const reserTimeArray = [
		["10:00", "10:30", "11:00", "11:30"],
		["12:00", "12:30", "1:00", "1:30", "2:00", "2:30", "3:00", "3:30", "4:00", "4:30", "5:00", "5:30", "6:00", "6:30", "7:00", "7:30", "8:00", "8:30", "9:00"]
	];
	const [loginCheck, setLoginCheck] = useState(true) // 로그인 체크
	const [monthCheck, setMonthCheck] = useState(''); //날짜설정
	const [timeCheck, setTimeCheck] = useState(false); //시간설정
	const [peopleCheck, setPeopleCheck] = useState(2); //인원선택
	const [tableCheck, setTableCheck] = useState(0); //좌석선택
	const [reserNameCheck, setReserNameCheck] = useState(''); //예약자명
	const [reserComment, setReserComment] = useState(''); //요청사항
	const [isCheckboxValidityCheck, setIsCheckboxValidityCheck] = useState(false);
	const reservationWrap = useRef();
	const reserTopBar = useRef();
	const handlerReserButton = () => { //다음버튼 누를때
		console.log('monthCheck:' + monthCheck)
		console.log('timeCheck:' + timeCheck)
		console.log('peopleCheck:' + peopleCheck)
		console.log('tableCheck:' + tableCheck)
		console.log('reserNameCheck:' + reserNameCheck)
		console.log('reserComment:' + reserComment)
		console.log('isCheckboxValidityCheck:' + isCheckboxValidityCheck)
	}

	return (
		<div className="container">
			<div className="reservationWrap" ref={reservationWrap}>
			<button onClick={()=>setLoginCheck(false)}>비회원일때</button>
			<button onClick={()=>setLoginCheck(true)}>회원일때</button>
				<div className="reserTop" ref={reserTopBar}>
					<div className="innerWrap">
						<div className="uiRow">
							<div className="uiCol4">
								<div className="mnt">
									<img src={require(`assets/images/common/icoCalendar.png`)} alt=""/>
									<span className="roboto">{`${monthCheck}`}</span>
								</div>
							</div>
							<div className="uiCol4">
								<div className="tim">
									<img src={require(`assets/images/common/icoClock.png`)} alt=""/>
									{
										timeCheck
											? timeCheck
											: '-'
									}
								</div>
							</div>
							<div className="uiCol4">
								<div className="peo">
									<img src={require(`assets/images/common/icoUser.png`)} alt=""/>
									<span className="roboto">{peopleCheck}</span>명
								</div>
							</div>
						</div>
					</div>
				</div>
				<div className="reserCont">
					<div className="innerWrap">
						<div className="rscTit">방문 일자 선택</div>
						<div className="rscCal MT30">
							<UiCalendar
								year={getYear}
								month={getMonth}
								date={getDate}
								bindLoadDayButton={(yy, mm, dd, day) => {
									setMonthCheck(`${mm}.${dd}${day}`);
								}}
								bindClickDayButton={(yy, mm, dd, day) => {
									console.log(yy, mm, dd, day);
									setMonthCheck(`${mm}.${dd}${day}`);
								}}
							/>
						</div>
						<div className="rscTit MT60">시간 선택</div>
						<div className="rscChi">
							<div className="rsccLb MT30">오전</div>
							<div className="rsccVl">
								<div className="uiRow">
									{
										reserTimeArray[0].map((label, index) => {
											return <div className="uiCol3" key={index}> <UiInput type="radio" id={`dn${index}`} defaultValue={label} name="d1" label={label} onChange={event => {
												setTimeCheck(event.target.value);
											}} className="box" disabled={index < 2 ? true : false} /> </div>
										})
									}
								</div>
							</div>
							<div className="rsccLb MT30">오전</div>
							<div className="rsccVl">
								<div className="uiRow">
									{
										reserTimeArray[1].map((label, index) => {
											return <div className="uiCol3" key={index}> <UiInput type="radio" id={`da${index}`} defaultValue={label} name="d1" onChange={event => {
												setTimeCheck(event.target.value);
											}} label={label} className="box" /> </div>
										})
									}
								</div>
							</div>
						</div>
						<div className="rscTit MT60">방문 인원</div>
						<div className="rscPrs">
							<div className="lt">2 - 30명까지 설정 가능합니다</div>
							<div className="rt">
								<UiCountAddRem min_count={2} count={2} watchCount={count => {
									setPeopleCheck(count);
								}} />
							</div>
						</div>
						<div className="rscTit MT60">좌석 선택</div>
						<div className="uiRow MT30">
							<div className="uiCol12">
								<UiSelect
									onSuccessMessage="true"
									successMessage="매장 상황에 따라 제공 좌석이 달라질 수 있습니다"
									onChange={event => {
										setTableCheck(event.target.value);
									}}
								>
									<option value="">좌석 선택</option>
									<option value="1">2인석</option>
									<option value="2">창가석</option>
									<option value="3">단체석</option>
								</UiSelect>
							</div>
						</div>

						<div className="rscTit MT120">예약자 정보</div>
						<div className="uiRow ">
							<div className="uiCol12 MT40">
								<UiInput 
								type="text"
								placeholder="예약자명 (필수 입력사항)" 
								onChange={event => {
									event.target.value = event.target.value.replace(/[^ㄱ-ㅎㅏ-ㅣ가-힣0-9a-zA-Z]/g, '');
									setReserNameCheck(event.target.value);
								}} />
							</div>
							<div className="uiCol12 MT40">
								<UiInput value="010-1324-1234" readOnly />
							</div>
							<div className="uiCol12 MT40">
								<UiTextarea maxLength={200} placeholder="요청사항을 입력해주세요 (최대 200자)" onChange={event => {
									setReserComment(event.target.value);
								}} />
							</div>
							<div className="uiCol12 MT30">
								<div className="inputArea">
									<div className="copyCheck">
										<UiInput type="checkbox" id="chk1" label={
											<span><strong className="strong">예약 안내사항</strong> 및 <strong className="strong">이용약관</strong>에 동의합니다</span>
										} size="sm" onChange={event => setIsCheckboxValidityCheck(event.target.checked)} checked={isCheckboxValidityCheck} />
									</div>
									<div className="copyBtn">
										<UiButton className="text UNDERLINE" onClick={() => history.push('?copyright=true')}>
											<img src={require(`assets/images/common/icoArrowGray_15.png`)} alt=""/>
											자세히 보기
										</UiButton>
									</div>
								</div>
							</div>
						</div>

						<UiButton disabled={
							!isCheckboxValidityCheck
								|| !monthCheck
								|| !timeCheck
								|| !peopleCheck
								|| !tableCheck
								|| !reserNameCheck
								|| !reserComment
								? true
								: false
						} className="MT85" onClick={handlerReserButton}>다음</UiButton>
					</div>
				</div>
				{!loginCheck && <Navigator />}

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
					headerName="예약 안내사항 및 이용자 약관">
					<MyOrderReservationCopyright
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
export default MyOrderReservation;