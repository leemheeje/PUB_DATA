import React, { useState, useEffect } from 'react';
import { useParams, useHistory, useLocation } from 'react-router';
import { RegExpFormat } from 'regexp';
import { CSSTransition } from 'react-transition-group';

//CSSTransition.types
import { CSSTransitionTypes } from '../../CSSTransitionTypes';

//COMPONENTS
import UiInput from 'components/UiInput';
import UiButton from 'components/UiButton';
import UiModal from 'components/UiModal';
import UiLink from 'components/UiLink';
import UiDialog from 'components/UiDialog';

//PAGES
import MyPaymentCopyright from './MyPaymentCopyright';

//STYLES
import 'assets/css/payment.scss';

const MyPayment = () => {
	const hisotry = useHistory();
	const [loginCheck, setLoginCheck] = useState(true) // 로그인 체크
	const [isAuthDialogOpen, setAuthDialogOpen] = useState(false) // 본인인증 체크
	const [isAuthComplete, setAuthComplete] = useState(false)	// 본인인증 완료 체크

	const loginGo = () => {
		setLoginCheck(true);
	}

	const history = useHistory();
	const query = new URLSearchParams(useLocation().search);
	const [orderTotalPrice, setOrderTotalPrice] = useState(29500)
	const [saleTotalPrice, setSaleTotalPrice] = useState(2000)
	const [resultPrice, setResultPrice] = useState(0)
	const { type } = useParams(); //메뉴 결제(menu) || 예약 결제(reser)


	useEffect(() => {
		setResultPrice(orderTotalPrice - saleTotalPrice);
	}, [orderTotalPrice, saleTotalPrice]);

	const paymentWay = ['신용/체크카드', '카카오페이']  // 결제 방법
	const paymentWay2 = ['신용/체크카드', '카카오페이', '다른결제수단1', '다른결제수단2']  // 결제 방법 4가지
	const [paymentWayState, setPaymentWayState] = useState(true)  // 결제 방법 State
	const [paymentWayChk, setPaymentWayChk] = useState(false) // 결제 수단 체크 State
	const [agreeChkOn, setAgreeChkOn] = useState(false) // 약관 동의 체크 State

	// 결제 수단 체크
	const payWayChk = () => {
		setPaymentWayChk(true)
	}
	// 약관 동의 체크
	const agrChk = () => {
		var agrChk = !agreeChkOn
		setAgreeChkOn(agrChk)
	}

	const paymentWayChange = () => {
		var payWayChange = !paymentWayState
		setPaymentWayState(payWayChange)
	}

	// 약관 동의 팝업
	const [copyrightpModal, setCopyrightModal] = useState(false)
	const openModalCopyright = () => {
		history.push('?copyright=true');
	}
	const closeModalCopyright = () => {
		setCopyrightModal(false)
	}

	return (
		<div className="container payment">
			{/* 임시버튼 */}
			<button onClick={() => setLoginCheck(true)}>회원일때</button>
			<button onClick={() => setLoginCheck(false)}>비회원일때</button>

			<div className="paymentWrap">
				{loginCheck ?
					undefined
					:
					<div className="paymentBox MB55">
						<div className="loginBox">
							<div className="title">비회원 본인인증</div>
							<div className="midCont clearfix">
								<div className="lt">
									<UiInput placeholder="휴대폰 번호 인증이 필요합니다" readOnly />
								</div>
								<div className="rt">
									<UiButton className="outline red shadowNone" text={isAuthComplete ? '인증완료' : '인증'} onClick={() => setAuthDialogOpen(true)} disabled={isAuthComplete ? true : false} />
								</div>
							</div>
						</div>
					</div>
				}
				{
					type === 'menu'
						?
						<>
							<div className="paymentBox">
								<div className="requestBox">
									<div className="title">요청사항</div>
									<UiInput type="text" id="request01" label="요청사항" placeholder="요청사항을 입력해주세요 (최대 40자 입력가능)" maxlength={40} />
								</div>
							</div>
						</>
						: type === 'reser'
							?
							<div className="paymentBox">
								<div className="title">예약 내역</div>
								<div className="stoName">빈체로 파스타 안산 중앙점</div>
								<div className="stoResInfo">
									<div className="striTp">
										<span className="lb">일정</span>
										<div className="vl">2020. 04. 18 토요일   오후 12 : 30</div>
									</div>
									<div className="striTp">
										<span className="lb">인원</span>
										<div className="vl">4명</div>
									</div>
								</div>
							</div>
							: ''
				}

				<div className="paymentBox MT55">
					<div className="title">결제 수단 선택</div>
					{
						type === 'menu'
							?
							<ul className="paymentPrice">
								<li>
									<span className="tit">주문금액</span> <span className="price"><span className="roboto">{RegExpFormat(orderTotalPrice, 'comma')}</span>원</span>
								</li>
								{
									loginCheck ?
										<li className="salePrice">
											<span className="tit">할인금액</span> <span className="price"><span className="roboto">{RegExpFormat(saleTotalPrice, 'comma')}</span>원</span>
										</li>
										:
										undefined
								}
								<li className="resultPrice">
									<span className="tit">결제금액</span> <span className="price"><span className="roboto">{RegExpFormat(resultPrice, 'comma')}</span>원</span>
								</li>
							</ul>
							: type === 'reser'
								?
								<ul className="paymentPrice">
									<li>
										<span className="tit">예약금</span> <span className="price"><span className="roboto">{RegExpFormat(orderTotalPrice, 'comma')}</span>원</span>
									</li>
									<li className="resultPrice">
										<span className="tit">결제금액</span> <span className="price"><span className="roboto">{RegExpFormat(resultPrice, 'comma')}</span>원</span>
									</li>
								</ul>
								: ''
					}


					{/* 임시버튼 */}
					<button onClick={() => paymentWayChange()}>수단 변경</button>

					<div className="paymentWay">
						<ul className="paymentwayList">
							{
								paymentWayState ?
									paymentWay.map((value, index) => {
										return (
											<li className={`no` + (index + 1)} key={index}><UiInput type="radio" id={`chk0` + (index + 1)} name="paymentWay" label={(
												<>
												{
													index + 1 === 1 
													? 
													<>
													<img src={require(`assets/images/common/icoPaymentCard.png`)} className="on" alt="신용/체크카드"/>
													<img src={require(`assets/images/common/icoPaymentCardOn.png`)} className="active" alt="신용/체크카드"/>
													</>
													: index + 1 === 2
													? 
													<>
													<img src={require(`assets/images/common/icoPaymentKakao.png`)} className="on" alt="카카오페이"/>
													<img src={require(`assets/images/common/icoPaymentKakaoOn.png`)} className="active" alt="카카오페이"/>
													</>
													: index + 1 === 3
													? 
													<>
													<img src={require(`assets/images/common/icoPaymentIcon.png`)} className="on" alt="다른결제수단1"/>
													<img src={require(`assets/images/common/icoPaymentIcon.png`)} className="active" alt="다른결제수단1"/>
													</>
													: index + 1 === 4
													? 
													<>
													<img src={require(`assets/images/common/icoPaymentIcon.png`)} className="on" alt="다른결제수단2"/>
													<img src={require(`assets/images/common/icoPaymentIcon.png`)} className="active" alt="다른결제수단2"/>
													</>
													: ''
												}
												
												{value}
												<img src={require(`assets/images/common/icoChk.png`)} className="icoChk" alt=""/>
												</>
											)} onClick={() => payWayChk()}/></li>
										)
									})
									: paymentWay2.map((value, index) => {
										return (
											<li className={`no` + (index + 1)} key={index}><UiInput type="radio" id={`chk0` + (index + 1)} name="paymentWay" label={
												<>
												{
													index + 1 === 1 
													? 
													<>
													<img src={require(`assets/images/common/icoPaymentCard.png`)} className="on" alt="신용/체크카드"/>
													<img src={require(`assets/images/common/icoPaymentCardOn.png`)} className="active" alt="신용/체크카드"/>
													</>
													: index + 1 === 2
													? 
													<>
													<img src={require(`assets/images/common/icoPaymentKakao.png`)} className="on" alt="카카오페이"/>
													<img src={require(`assets/images/common/icoPaymentKakaoOn.png`)} className="active" alt="카카오페이"/>
													</>
													: index + 1 === 3
													? 
													<>
													<img src={require(`assets/images/common/icoPaymentIcon.png`)} className="on" alt="다른결제수단1"/>
													<img src={require(`assets/images/common/icoPaymentIcon.png`)} className="active" alt="다른결제수단1"/>
													</>
													: index + 1 === 4
													? 
													<>
													<img src={require(`assets/images/common/icoPaymentIcon.png`)} className="on" alt="다른결제수단2"/>
													<img src={require(`assets/images/common/icoPaymentIcon.png`)} className="active" alt="다른결제수단2"/>
													</>
													: ''
												}
												
												{value}
												<img src={require(`assets/images/common/icoChk.png`)} className="icoChk" alt=""/>
												</>
											} onClick={() => payWayChk()} /></li>
										)
									})
							}
						</ul>
					</div>
					<div className="agreeWrap">
						<UiInput type="checkbox" id="agreeChk" label={<><img src={`${require('assets/images/common/agreeText.png')}`} alt="결제 관련 이용자 약관에 동의합니다" /></>} onClick={() => agrChk()} readOnly={agreeChkOn} checked={agreeChkOn} />
						<a className="btnDetail" onClick={() => openModalCopyright(true)}><img src={`${require('assets/images/common/btnDetail.png')}`} alt="자세히 보기" /></a>
					</div>
					<UiButton disabled={
						loginCheck
							?
							!paymentWayChk || !agreeChkOn ? true : false
							:
							!isAuthComplete || !paymentWayChk || !agreeChkOn ? true : false
					}
						onClick={() => hisotry.push(`/payment/paymentcompletion/${type}`)}
					>
						<>
							<span className="btnLeft">
								<span className="roboto">{`${RegExpFormat(resultPrice, 'comma')}`}</span>
								<span className="won">{`원`}</span>
							</span>
							<span className="btnRight">
								{`결제하기`}
							</span>
						</>
					</UiButton>
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
					headerName="결제 관련 이용자 약관">
					<MyPaymentCopyright
						checked={agreeChkOn}
						bindClickConfirmBtn={() => {
							setAgreeChkOn(true);
							history.goBack();
						}} />
				</UiModal>
			</CSSTransition>

			{
				isAuthDialogOpen
				&&
				<UiDialog
					type="confirm"
					cancelTextName='아니오'
					confirmTextName='회원가입'
					bindClickCancelBtn={() => { setAuthDialogOpen(false); setAuthComplete(true); }}
					bindClickConfirmBtn={() => { setAuthComplete(true); history.push('/user/userRegister/step2'); }}
				>
					<div className="authDialogArea">
						<div className="tit">비회원 본인인증이 완료되었습니다</div>
						<div className="txt">
							지금 회원가입하시면쿠폰 및 포인트 등 <br />
							PICK오더의다양한 혜택을 누릴 수 있습니다 <br />
							<span>인증하신 번호로 회원가입 하시겠습니까?</span>
						</div>
					</div>
				</UiDialog>
			}
		</div>
	)
}
export default MyPayment;