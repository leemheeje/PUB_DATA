import React, { useState } from 'react';
import { useParams } from 'react-router';

//COMPONENTS
import UiLink from "components/UiLink"
import UiButton from "components/UiButton"


//STYLES
import 'assets/css/payment.scss';

const PaymentCompletion = ({
	history
}) => {

	const [loginCheck, setLoginCheck] = useState(false) // 로그인 체크
	const loginGo = () => {
		setLoginCheck(true);
	}

	const { type } = useParams();

	return (
		<div className="container completion">
			{/* 임시 버튼 */}
			<button onClick={() => setLoginCheck(false)}>비회원일때</button>
			<button onClick={() => setLoginCheck(true)}>회원일때</button>

			<div className="paymentWrap">
			
				<div className="paymentResultWrap">
					<div className="bg">
					<img src={`${require('assets/images/common/bgReceipt.png')}`} alt="" />
					</div>
					<div className="paymentResult">
						<div className="titleWrap">
							{
								type === 'menu'
									?
									<>
										<div className="title"> 결제 완료 </div>
										<div className="midCont">
											<div className="in">
												<div className="icon"><img src={`${require('assets/images/common/icoPaymentOk.png')}`} alt="" /></div>
												<div className="text">
													결제가 완료되었습니다 <br />
													입력하신 연락처로 <br />
													<span>[주문상황] 알림이 발송 됩니다</span>
												</div>
											</div>
										</div>
									</>
									: type === 'reser'
										?
										<>
											<div className="title"> 예약 완료 </div>
											<div className="midCont">
												<div className="in">
													<div className="icon"><img src={`${require('assets/images/common/icoPaymentWaitingOk.png')}`} alt="" /></div>
													<div className="text">
														예약 신청이 완료되었습니다 <br />
														입력하신 연락처로 <br />
														<span>[예약상황] 알림이 발송 됩니다</span>
													</div>
												</div>
											</div>
										</>
										: type === 'waiting'
											?
											<>
												<div className="title"> 줄서기 접수 완료 </div>
												<div className="midCont waiting">
													<div className="in">
														<div className="tit">
															<div>
																고객님의 <br />
																줄서기 번호
															</div>
															<div className="num roboto">13</div>
														</div>
														<div className="text">
															고객님의 순서가 되면 입력하신 연락처로<br />
															<span>알림이 발송 됩니다</span>
														</div>
														<ul className="list">
															<li className="no1">
																<div className="sTit">방문 인원</div>
																<div className="sTxt"><span className="roboto">2</span>명</div>
															</li>
															<li className="no2">
																<div className="sTit">내 앞 대기팀</div>
																<div className="sTxt"><span className="roboto">4</span>팀</div>
															</li>
															<li className="no3">
																<div className="sTit">예상 대기시간</div>
																<div className="sTxt"><span className="roboto">30</span>분</div>
															</li>
														</ul>
													</div>
												</div>
											</>
											: ''
							}
						</div>

						<div className="btnWrap">
							{
								type === 'menu'
									?
									<UiLink className="yellowBtn2" to="/">주문내역 확인하기</UiLink>
									: type === 'reser'
										? <UiLink className="yellowBtn2" to="/">예약내역 확인하기</UiLink>
										: type === 'waiting'
											? <UiLink className="yellowBtn2" to="/">줄서기 현황보기</UiLink>
											: ''
							}
							<UiLink className="outline red shadowNone" text="메인으로 돌아가기" to="/" />
						</div>
					</div>
				</div>
				{
					loginCheck ? 
					undefined
					:
					<div className="loginBox">
						<div className="text">로그인하면 더 많은 서비스를 이용할 수 있습니다</div>
						<div className="btnLogin">
							<UiButton className="miniWhite shadowNone" text="로그인" onClick={loginGo} />
						</div>
					</div>
				}
			</div>
			
		</div>
	)
}
export default PaymentCompletion;