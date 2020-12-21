import React, { useState, useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import Form from '../components/Form';
import UiTopBanner from '../components/UiTopBanner';
import PopupModal from 'components/PopupModal';
import 'assets/css/payment.scss';
import { CustomScrollBar } from 'react-custom-scrollbar';
import 'react-custom-scrollbar/lib/react-custom-scrollbar.css';

//약관
import Agree_service from 'pages/Agree_service'
import Agree_personal from 'pages/Agree_personal'


//마스킹 처리 컴포넌트
const PhoneSpan = ({ value }) => {
	return (
		<span>{value}</span>
	)
}

const Payment_saving = () => {

	const [phoneNumber, setPhoneNumber] = useState([]); //원본 번호 배열
	const [phoneResult, setPhoneResult] = useState(''); //원본 번호 배열 합침
	const [phoneMask, setPhoneMask] = useState([]); //마스킹 처리 번호
	const [popupModal, setPopupModal] = useState(''); // 팝업 호출 State
	const [btnNextOn, setBtnNextOn] = useState(false); //다음버튼 활성화 State
	const [policy, setPolicy] = useState(true); // 이용약관, 개인정보처리방침 State
	//번호입력
	const numberInput = (e) => {
		if (phoneNumber.length < 11) {
			let num = e.target.value;
			setPhoneNumber(phoneNumber => ([...phoneNumber, num]))
		}
	};

	//번호 합치기
	useEffect(() => {
		setPhoneResult(phoneNumber.join(""));
	}, [phoneNumber]);

	//번호 마스킹 처리
	useEffect(() => {
		let mask = phoneNumber.map((value, i) => {
			if (phoneNumber.length - 1 === i) {
				return value;
			} else {
				return value = '*';
			}
		})
		setPhoneMask(mask)
	}, [phoneNumber]);


	//번호지우기
	const numberDel = (e) => {
		setPhoneNumber(phoneNumber.slice(0, phoneNumber.length - 1))
	};

	//번호 전체 지우기
	const numberClear = (e) => {
		setPhoneNumber([])
	};

	//이용약관, 개인정보처리방침
	const valuePolicy = (e) => {
		setPolicy(e.target.checked)
		console.log(e.target.checked)
	};

	//이용약관 확인하기
	const agreePop = () => {
		setPopupModal(
			<PopupModal>
				<div className="multiLogin agreeWrap">
					<div className="tit">서비스 이용약관</div>

					<CustomScrollBar
						allowOuterScroll={false}
						heightRelativeToParent="600px"
						onScroll={() => { }}
						addScrolledClass={true}
						freezePosition={false}
						handleClass="inner-handle"
						minScrollHandleHeight={38}
					>
						<Agree_service></Agree_service>
					</CustomScrollBar>

					<button onClick={() => setPopupModal('')}>확인</button>
				</div>
			</PopupModal>
		)
	};

	//힐수항목 동의
	const policyPop = () => {
		setPopupModal(
			<PopupModal>
				<div className="multiLogin agreeWrap">
					<div className="tit2">필수 항목에 동의하셔야<br />서비스 이용이 가능합니다</div>
					<button onClick={() => setPopupModal('')}>확인</button>
				</div>
			</PopupModal >
		)
	};

	//개인정보처리방침 확인하기
	const privacyPop = () => {
		setPopupModal(
			<PopupModal>
				<div className="multiLogin agreeWrap">
					<div className="tit">개인정보 처리방침</div>

					<CustomScrollBar
						allowOuterScroll={false}
						heightRelativeToParent="600px"
						onScroll={() => { }}
						addScrolledClass={true}
						freezePosition={false}
						handleClass="inner-handle"
						minScrollHandleHeight={38}
					>
						<Agree_personal></Agree_personal>
					</CustomScrollBar>

					<button onClick={() => setPopupModal('')}>확인</button>
				</div>
			</PopupModal >
		)
	};

	// 다음 버튼 활성화
	useEffect(() => {
		if (phoneNumber.length >= 10) {
			setBtnNextOn(true)
		} else if (phoneNumber.length < 11) {
			setBtnNextOn(false)
		}
	}, [phoneNumber]);


	return (
		<div className="popArea paymentSaving">
			<UiTopBanner />

			{/* 모달 팝업 */}
			{popupModal}

			<div className="in">
				<div className="paySavingArea">

					<div className="paySavingBox">

						<div className="payTit01">
							주문 알림, 전자영수증 발행, 포인트 적립을 위해 <br />
							<span>연락처를 입력해 주세요</span>
						</div>

						<div className="numberForm">
							<div className="numberScreen roboto">
								{phoneMask.map((value, idx) => {
									return <PhoneSpan value={value} key={idx} />
								})}
							</div>
							<div className="hiddenNumber">
								<Form type="hidden" value={phoneResult} maxLength="11" disabled />
							</div>

							<div className="numberList">
								<ul>
									<li><button value="1" onClick={numberInput}>1</button></li>
									<li><button value="2" onClick={numberInput}>2</button></li>
									<li><button value="3" onClick={numberInput}>3</button></li>
									<li><button value="4" onClick={numberInput}>4</button></li>
									<li><button value="5" onClick={numberInput}>5</button></li>
									<li><button value="6" onClick={numberInput}>6</button></li>
									<li><button value="7" onClick={numberInput}>7</button></li>
									<li><button value="8" onClick={numberInput}>8</button></li>
									<li><button value="9" onClick={numberInput}>9</button></li>
									<li className="btnClear"><button value="C" onClick={numberClear}>전체 지우기</button></li>
									<li><button value="0" onClick={numberInput}>0</button></li>
									<li className="btnDelete"><button value="D" onClick={numberDel}><img src={`${require('../assets/images/payment/ico_arrow.png')}`} alt="" /></button></li>
								</ul>
							</div>
						</div>

						<div className="agreeBox">
							<div className="line">
								<Form
									type="checkbox"
									id="policy"
									label={' '}
									defaultChecked={true}
									onChange={valuePolicy}
								/>
							(필수) <a href="#;" className="btnAgree" onClick={agreePop}>이용약관</a> 및 <a href="#;" className="btnPrivacy" onClick={privacyPop}>개인정보처리방침</a>에 동의합니다
							</div>
							<div className="line">
								<Form
									type="checkbox"
									id="marketing"
									label={' '}
									defaultChecked={true}
								/>
								(선택) 마케팅 정보 수신에 동의합니다
							</div>
						</div>

					</div>

					<div className="btn">
						<div className="uiRow">
							<div className="uiCol3">
								<NavLink to="/order" className="btns outline block nopadding">이전</NavLink>
							</div>
							<div className="uiCol3">
								<NavLink to="/payment/payment_option" className="btns outline block nopadding">건너뛰기</NavLink>
							</div>
							<div className="uiCol6">
								{policy ?
									<NavLink to="/payment/payment_option" className={`btns red block bold nopadding shadow ${!btnNextOn ? `disabled` : ``}`}>다음</NavLink>
									:
									<a  className={`btns red block bold nopadding shadow ${!btnNextOn ? `disabled` : ``}`} onClick={policyPop}>다음</a>
								}
							</div>
						</div>
					</div>

				</div>
			</div>
		</div>
	)
}

export default Payment_saving;