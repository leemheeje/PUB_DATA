import React, { useState } from 'react';
import { useParams } from 'react-router';

//COMPONENTS
import UiLink from "components/UiLink"
import Navigator from "components/Navigator"

const MyPaymentFail = () => {
	const { type } = useParams();
	const [loginCheck, setLoginCheck] = useState(true) // 로그인 체크
	const [pageType, setPageType] = useState(type);
	return (
		<div className="container">
			<div className="paymentResult">
				<button onClick={() => setLoginCheck(true)}>회원일때</button>
				<button onClick={() => setLoginCheck(false)}>비회원일때</button>
				<button onClick={() => setPageType('payFail')}>결제실패</button>
				<button onClick={() => setPageType('reserCancel')}>예약취소</button>
				<button onClick={() => setPageType('reserCancelFail')}>예약취소실패</button>
				<button onClick={() => setPageType('waitingCancel')}>줄서기취소</button>
				<button onClick={() => setPageType('packageCancel')}>포장주문취소</button>
				<button onClick={() => setPageType('myWithdraw')}>회원탈퇴</button>
				{
					pageType === 'payFail'
						?
						<div className="titleWrap">
							<div className="icon"><img src={`${require('assets/images/common/icoPaymentFail.png')}`} alt="" /></div>
							<div className="title"> 결제 실패 </div>
							<div className="text">
								결제 정보를 확인하거나 <br />
								<span>다른 결제방식을 선택해주세요</span>
							</div>
						</div>
						: pageType === 'reserCancel'
							?
							<div className="titleWrap">
								<div className="icon"><img src={`${require('assets/images/common/icoPaymentReserFail.png')}`} alt="" /></div>
								<div className="title">예약 취소</div>
								<div className="text">
									<span>예약이 취소되었습니다</span><br />
									다음에 다시 이용해주세요
								</div>
							</div>
							: pageType === 'reserCancelFail'
								?
								<div className="titleWrap">
									<div className="icon"><img src={`${require('assets/images/common/icoPaymentReserFail.png')}`} alt="" /></div>
									<div className="text MT20">
										<span>예약취소에 실패하였습니다</span><br />
									매장에 문의해주세요
								</div>
									<div className="text MT40">
										김밥천국 연희점
									<div className="roboto strong">02-032-5517</div>
									</div>
								</div>
								: pageType === 'waitingCancel'
									?
									<div className="titleWrap">
										<div className="icon"><img src={`${require('assets/images/common/icoPaymentWaitingFail.png')}`} alt="" /></div>
										<div className="title">줄서기 취소</div>
										<div className="text">
											<span>줄서기 접수가 취소되었습니다</span><br />
										다음에 다시 이용해주세요
									</div>
									</div>
									: pageType === 'packageCancel'
										?
										<div className="titleWrap">
											<div className="icon"><img src={`${require('assets/images/common/icoPaymentPackageFail.png')}`} alt="" /></div>
											<div className="title">주문 취소</div>
											<div className="text">
												<span>주문이 취소되었습니다</span><br />
											다음에 다시 이용해주세요
										</div>
										</div>
										: pageType === 'myWithdraw'
											?
											<div className="titleWrap">
												<div className="icon logo"><img src={`${require('assets/images/common/logoGray.png')}`} alt="" /></div>
												<div className="title sm">회원탈퇴가 완료되었습니다</div>
												<div className="text sm"> <span>그 동안 서비스명을 이용해주셔서 감사합니다</span><br />보다 나은 서비스로 다시 찾아 뵙겠습니다</div>
											</div>
											: ''
				}


				<div className="btnWrap MT80">
					{
						pageType === 'payFail'
							? <UiLink text="결제화면 돌아가기" to="/payment/mypayment" />
							: pageType === 'reserCancel' || pageType === 'reserCancelFail'
								? <UiLink text="이용내역 확인하기" to="/payment/myPaymentDetail/reser" />
								: pageType === 'waitingCancel'
									? <UiLink text="줄서기 화면 돌아가기" to="/order/myOrderList/reserWaiting" />
									: pageType === 'packageCancel'
										? <UiLink text="이용내역 확인하기" to="/payment/myPaymentDetail/package" />
										: ''
					}
					<UiLink className={`red shadowNone ${pageType !== 'myWithdraw' ? 'outline' : ''}`} text="메인으로 돌아가기" to="/" />
				</div>
				{!loginCheck && <Navigator />}
			</div>
		</div>
	)
}
export default MyPaymentFail;