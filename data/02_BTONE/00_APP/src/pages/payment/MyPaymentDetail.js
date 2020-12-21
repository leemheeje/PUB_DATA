import React, { useState, useEffect } from 'react';
import { RegExpFormat } from 'regexp';
import { useParams, useHistory } from 'react-router';


//COMPONENTS
import UiLink from 'components/UiLink';
import UiButton from 'components/UiButton';
import UiScroll from 'components/UiScroll';
import UiInput from 'components/UiInput';
import UiDialog from 'components/UiDialog';


//STYLES
import 'assets/css/payment.scss';

const MyPaymentDetail = () => {
	/**
	 * params : type // 
	 */
	const { type } = useParams();
	const history = useHistory();
	const [pageType, setPageType] = useState(type);
	const [isReserCancelDialogOpen, setIsReserCancelDialogOpen] = useState(false);
	const [isReserCancelAgree, setIsReserCancelAgree] = useState(false);
	const [isPackageCancelDialogOpen, setIsPackageCancelDialogOpen] = useState(false);
	const [isPackageCancelAgree, setIsPackageCancelAgree] = useState(false);

	return (
		<div className="container PDB0">
			<div className="myPaymentDetail">
				<button onClick={() => setPageType('waitingComplete')}>웨이팅완료상태일때</button>
				<button onClick={() => setPageType('waitingCancel')}>웨이팅취소상태일때</button>
				<button onClick={() => setPageType('reserCancel')}>예약취소상태일때</button>
				<button onClick={() => setPageType('reser')}>예약내역확인</button>
				<button onClick={() => setPageType('kiosk')}>키오스크내역확인</button>
				<button onClick={() => setPageType('package')}>포장주문내역확인</button>
				<button onClick={() => setPageType('packageCancel')}>포장주문 취소내역확인</button>
				{/* 웨이팅완료상태일때 params = waitingComplete : S  */}
				{
					pageType === 'waitingComplete'
					&&
					<>
						<div className="mypdCont">
							<div className="innerWrap">
								<div className="mypdContTop">
									<span className="ico waiting">
										<img src={require(`assets/images/common/icoFuncOn03.png`)} alt=""/>
										줄서기
									</span>

									<div className="stoinf">
										<div className="tit" onClick={()=>history.push(`/order/myOrderDetail/${type}`)}>빈체로 파스타 안산 중앙점</div>
										<div className="stt red">이용완료</div>
									</div>
									<div className="stRest MT35"> 고객님의 줄서기가 완료되었습니다<br /> 이용해주셔서 감사합니다 </div>
									<div className="mypdList MT45">
										<div className="mypdTp">
											<span className="lb">접수번호</span>
											<div className="vl roboto">200211-1123</div>
										</div>
										<div className="mypdTp">
											<span className="lb">접수시간</span>
											<div className="vl roboto">2020. 04. 16 목요일  오후 2 : 30</div>
										</div>
									</div>
								</div>
								<div className="mypdContMid">
									<div className="tit">이용 내역</div>
									<div className="mypdList MT30">
										<div className="mypdTp">
											<span className="lb">처리일시</span>
											<div className="vl roboto">2020. 04. 18 토요일  오후 1 : 00</div>
										</div>
										<div className="mypdTp">
											<span className="lb">방문인원</span>
											<div className="vl roboto">2명</div>
										</div>
									</div>
								</div>
							</div>
						</div>
					</>
				}
				{/* 웨이팅완료상태일때 params = waitingComplete : E  */}
				{/* 웨이팅취소상태일때 params = waitingCancel : S  */}
				{
					pageType === 'waitingCancel'
					&&
					<>
						<div className="mypdCont">
							<div className="innerWrap">
								<div className="mypdContTop">
									<span className="ico waiting">
										<img src={require(`assets/images/common/icoFuncOn03.png`)} alt=""/>
										줄서기
									</span>

									<div className="stoinf">
										<div className="tit" onClick={()=>history.push(`/order/myOrderDetail/${type}`)}>빈체로 파스타 안산 중앙점</div>
										<div className="stt red">접수취소</div>
									</div>
									<div className="stRest MT35"> 고객님의 줄서기가 취소되었습니다<br /> 다음에 다시 이용해주세요 </div>
									<div className="mypdList MT45">
										<div className="mypdTp">
											<span className="lb">접수번호</span>
											<div className="vl roboto">200211-1123</div>
										</div>
										<div className="mypdTp">
											<span className="lb">접수시간</span>
											<div className="vl roboto">2020. 04. 16 목요일  오후 2 : 30</div>
										</div>
									</div>
								</div>
								<div className="mypdContMid">
									<div className="tit">이용 내역</div>
									<div className="mypdList MT30">
										<div className="mypdTp">
											<span className="lb">처리일시</span>
											<div className="vl roboto">2020. 04. 18 토요일  오후 1 : 00</div>
										</div>
										<div className="mypdTp">
											<span className="lb">방문인원</span>
											<div className="vl roboto">2명</div>
										</div>
									</div>
								</div>
							</div>
						</div>
					</>
				}
				{/* 웨이팅취소상태일때 params = waitingCancel : E  */}
				{/* 예약취소상태일때 params = reserCancel : S  */}
				{
					pageType === 'reserCancel'
					&&
					<>
						<div className="mypdCont">
							<div className="innerWrap">
								<div className="mypdContTop">
									<span className="ico reser">
										<img src={require(`assets/images/common/icoFuncOn02.png`)} alt=""/>
										예약
									</span>

									<div className="stoinf">
										<div className="tit" onClick={()=>history.push(`/order/myOrderDetail/${type}`)}>빈체로 파스타 안산 중앙점</div>
										<div className="stt red">예약취소</div>
									</div>
									<div className="mypdList MT45">
										<div className="mypdTp">
											<span className="lb">예약번호</span>
											<div className="vl roboto">200211-1123</div>
										</div>
										<div className="mypdTp">
											<span className="lb">신청일시</span>
											<div className="vl roboto">2020. 04. 16 목요일  오후 2 : 30</div>
										</div>
									</div>
								</div>
								<div className="mypdContMid">
									<div className="tit">예약 내역</div>
									<div className="mypdList MT30">
										<div className="mypdTp">
											<span className="lb">방문일시</span>
											<div className="vl roboto">2020. 04. 18 토요일  오후 12 : 30</div>
										</div>
										<div className="mypdTp">
											<span className="lb">방문인원</span>
											<div className="vl roboto">4명</div>
										</div>
										<div className="mypdTp">
											<span className="lb">좌석 선택</span>
											<div className="vl">창가석</div>
										</div>
										<div className="mypdTp">
											<span className="lb">예약자명</span>
											<div className="vl roboto">김건태</div>
										</div>
										<div className="mypdTp">
											<span className="lb">연락처</span>
											<div className="vl roboto">010-4134-1234</div>
										</div>
										<div className="mypdTp">
											<span className="lb">연락처</span>
											<div className="vl">3살짜리 아이가 있어서 유아용 의자 부탁드려요 유모차 들어갈 수 있도록 옆 자리랑 간격이 떨어져있 었으면 좋겠습니다</div>
										</div>
									</div>

								</div>
								<div className="mypdContMid">
									<div className="tit">예약 내역</div>
									<div className="mypdList MT30">
										<div className="mypdTp">
											<span className="lb">취소일시</span>
											<div className="vl">2020. 04. 17 금요일  오전 11 : 30</div>
										</div>
										<div className="mypdTp">
											<span className="lb">환불여부</span>
											<div className="vl">환불</div>
										</div>
									</div>
								</div>
							</div>
						</div>
						<div className="mypdFoot MT45">
							<div className="mypdBt">
								<div className="innerWrap">
									<div className="mypdList justify lg">
										<div className="mypdTp">
											<span className="lb">예약금</span>
											<div className="vl"><span className="roboto strong">{RegExpFormat(3000, 'comma')}</span>원</div>
										</div>
										{
											pageType === 'reserCancel'
												?
												<div className="mypdTp">
													<span className="lb">환불금액</span>
													<div className="vl"><span className="roboto strong">{RegExpFormat(-3000, 'comma')}</span>원</div>
												</div>
												:
												<div className="mypdTp">
													<span className="lb">결제금액</span>
													<div className="vl"><span className="roboto strong">{RegExpFormat(3000, 'comma')}</span>원</div>
												</div>
										}

									</div>
									<div className="btnsWrap MT45">
										<div className="uiRow">
											<div className="uiCol12">
												<UiButton className="red outline shadowNone">전자영수증</UiButton>
											</div>
										</div>
									</div>
								</div>
							</div>
						</div>
					</>
				}
				{/* 예약취소상태일때 params = reserCancel : E  */}
				{/* 예약내역확인 params = reser : S  */}
				{
					pageType === 'reser'
					&&
					<>
						<div className="mypdCont">
							<div className="innerWrap">
								<div className="mypdContTop">
									<span className="ico reser">
										<img src={require(`assets/images/common/icoFuncOn02.png`)} alt=""/>
										예약
									</span>

									<div className="stoinf">
										<div className="tit" onClick={()=>history.push(`/order/myOrderDetail/${type}`)}>빈체로 파스타 안산 중앙점</div>
										<div className="stt red">예약대기</div>
									</div>
									<div className="mypdList MT45">
										<div className="mypdTp">
											<span className="lb">예약번호</span>
											<div className="vl roboto">200211-1123</div>
										</div>
										<div className="mypdTp">
											<span className="lb">신청일시</span>
											<div className="vl roboto">2020. 04. 16 목요일  오후 2 : 30</div>
										</div>
									</div>
								</div>
								<div className="mypdContMid">
									<div className="tit">예약 내역</div>
									<div className="mypdList MT30">
										<div className="mypdTp">
											<span className="lb">방문일시</span>
											<div className="vl roboto">2020. 04. 18 토요일  오후 12 : 30</div>
										</div>
										<div className="mypdTp">
											<span className="lb">방문인원</span>
											<div className="vl roboto">4명</div>
										</div>
										<div className="mypdTp">
											<span className="lb">좌석 선택</span>
											<div className="vl">창가석</div>
										</div>
										<div className="mypdTp">
											<span className="lb">예약자명</span>
											<div className="vl roboto">김건태</div>
										</div>
										<div className="mypdTp">
											<span className="lb">연락처</span>
											<div className="vl roboto">010-4134-1234</div>
										</div>
										<div className="mypdTp">
											<span className="lb">연락처</span>
											<div className="vl">3살짜리 아이가 있어서 유아용 의자 부탁드려요 유모차 들어갈 수 있도록 옆 자리랑 간격이 떨어져있 었으면 좋겠습니다</div>
										</div>
									</div>

								</div>
							</div>
						</div>
						<div className="mypdFoot MT45">
							<div className="mypdLink">
								<UiLink className="init mypLink">
									<span className="mypLinkInner">
										<img src={require(`assets/images/common/icoFuncOn04_50.png`)} alt=""/>
										테이블주문 바로가기
									</span>
								</UiLink>
							</div>
							<div className="mypdBt">
								<div className="innerWrap">
									<div className="mypdList justify lg">
										<div className="mypdTp">
											<span className="lb">예약금</span>
											<div className="vl"><span className="roboto strong">{RegExpFormat(3000, 'comma')}</span>원</div>
										</div>
										<div className="mypdTp">
											<span className="lb">결제금액</span>
											<div className="vl"><span className="roboto strong">{RegExpFormat(3000, 'comma')}</span>원</div>
										</div>

									</div>
									<div className="btnsWrap MT45">
										<div className="uiRow">
											{/* 전자영수증이 없을때 : S */}
											{/* <div className="uiCol12">
												<UiButton className="outline shadowNone" onClick={() => setIsReserCancelDialogOpen(true)}>예약취소</UiButton>
											</div> */}
											{/* 전자영수증이 없을때 : E */}
											{/* 전자영수증이 있을때 : S */}
											<div className="uiCol6">
												<UiButton className="outline shadowNone" onClick={() => setIsReserCancelDialogOpen(true)}>예약취소</UiButton>
											</div>
											<div className="uiCol6">
												<UiButton className="red outline shadowNone">전자영수증</UiButton>
											</div>
											{/* 전자영수증이 있을때 : E */}
										</div>
									</div>
								</div>
							</div>
						</div>
					</>
				}
				{/* 예약내역확인 params = reser : E  */}
				{/* 키오스크내역확인 params = kiosk : S  */}
				{
					pageType === 'kiosk'
					&&
					<>
						<div className="mypdCont">
							<div className="innerWrap">
								<div className="mypdContTop">
									<span className="ico kiosk">
										<img src={require(`assets/images/common/icoFuncOn05.png`)} alt=""/>
										키오스크
									</span>

									<div className="stoinf">
										<div className="tit" onClick={()=>history.push(`/order/myOrderDetail/${type}`)}>빈체로 파스타 안산 중앙점</div>
									</div>
									<div className="mypdList MT45">
										<div className="mypdTp">
											<span className="lb">주문번호</span>
											<div className="vl roboto">200211-1123</div>
										</div>
										<div className="mypdTp">
											<span className="lb">주문일시</span>
											<div className="vl roboto">2020. 04. 16 목요일  오후 2 : 30</div>
										</div>
									</div>
								</div>
								<div className="mypdContMid">
									<div className="tit">주문 내역 (<span className="rotobo">6</span>건)</div>
									<div className="mypdList justify justifyTp2 MT30">
										<div className="mypdTp">
											<div className="lb">
												김치제육덮밥 3개
												<div className="slb">기본 금액 : 5,300원</div>
												<div className="slb">추가 옵션 : 치즈 추가 (1,000원)</div>
											</div>
											<div className="vl roboto">15,900원</div>
										</div>
										<div className="mypdTp">
											<div className="lb">
												야채김밥 1개
												<div className="slb">기본 금액 : 5,300원</div>
											</div>
											<div className="vl roboto">15,900원</div>
										</div>
									</div>
									<div className="tit MT80">사용 혜택</div>
									<div className="minf MT35">
										<div>[이달의감사쿠폰] 치즈떡볶이 제공</div>
										<div>[포인트] <span className="roboto strong">1,500 P</span> 사용</div>
									</div>
								</div>
							</div>
						</div>
						<div className="mypdFoot MT45">
							<div className="mypdBt">
								<div className="innerWrap">
									<div className="mypdList justify lg">
										<div className="mypdTp">
											<span className="lb">주문금액</span>
											<div className="vl"><span className="roboto strong">{RegExpFormat(3000, 'comma')}</span>원</div>
										</div>
										<div className="mypdTp">
											<span className="lb">할인금액</span>
											<div className="vl"><span className="roboto strong">{RegExpFormat(-3000, 'comma')}</span>원</div>
										</div>
										<div className="mypdTp">
											<span className="lb">결제금액</span>
											<div className="vl"><span className="roboto strong">{RegExpFormat(3000, 'comma')}</span>원</div>
										</div>

									</div>
									<div className="btnsWrap MT45">
										<div className="uiRow">
											<div className="uiCol12">
												<UiButton className="red outline shadowNone">전자영수증</UiButton>
											</div>
										</div>
									</div>
								</div>
							</div>
						</div>
					</>
				}
				{/* 키오스크내역확인 params = kiosk : E  */}
				{/* 포장주문내역확인 params = package : S  */}
				{
					pageType === 'package'
					&&
					<>
						<div className="mypdCont">
							<div className="innerWrap">
								<div className="mypdContTop">
									<span className="ico package">
										<img src={require(`assets/images/common/icoFuncOn01.png`)} alt=""/>
										포장주문
									</span>

									<div className="stoinf">
										<div className="tit" onClick={()=>history.push(`/order/myOrderDetail/${type}`)}>빈체로 파스타 안산 중앙점</div>
									</div>
									<div className="mypdList MT45">
										<div className="mypdTp">
											<span className="lb">주문번호</span>
											<div className="vl roboto">200211-1123</div>
										</div>
										<div className="mypdTp">
											<span className="lb">주문일시</span>
											<div className="vl roboto">2020. 04. 16 목요일  오후 2 : 30</div>
										</div>
									</div>
								</div>
								<div className="mypdContMid">
									<div className="tit">주문 내역 (<span className="rotobo">6</span>건)</div>
									<div className="mypdList justify justifyTp2 MT30">
										<div className="mypdTp">
											<div className="lb">
												김치제육덮밥 3개
												<div className="slb">기본 금액 : 5,300원</div>
												<div className="slb">추가 옵션 : 치즈 추가 (1,000원)</div>
											</div>
											<div className="vl roboto">15,900원</div>
										</div>
										<div className="mypdTp">
											<div className="lb">
												야채김밥 1개
												<div className="slb">기본 금액 : 5,300원</div>
											</div>
											<div className="vl roboto">15,900원</div>
										</div>
									</div>
									<div className="tit MT80">사용 혜택</div>
									<div className="minf MT35">
										<div>[이달의감사쿠폰] 치즈떡볶이 제공</div>
										<div>[포인트] <span className="roboto strong">1,500 P</span> 사용</div>
									</div>
								</div>
							</div>
						</div>
						<div className="mypdFoot MT45">
							<div className="mypdBt">
								<div className="innerWrap">
									<div className="mypdList justify lg">
										<div className="mypdTp">
											<span className="lb">주문금액</span>
											<div className="vl"><span className="roboto strong">{RegExpFormat(3000, 'comma')}</span>원</div>
										</div>
										<div className="mypdTp">
											<span className="lb">할인금액</span>
											<div className="vl"><span className="roboto strong">{RegExpFormat(-3000, 'comma')}</span>원</div>
										</div>
										<div className="mypdTp">
											<span className="lb">결제금액</span>
											<div className="vl"><span className="roboto strong">{RegExpFormat(3000, 'comma')}</span>원</div>
										</div>

									</div>
									<div className="btnsWrap MT45">
										<div className="uiRow">
											<div className="uiCol6">
												<UiButton className="outline shadowNone" onClick={() => setIsPackageCancelDialogOpen(true)}>주문취소</UiButton>
											</div>
											<div className="uiCol6">
												<UiButton className="red outline shadowNone">전자영수증</UiButton>
											</div>
										</div>
									</div>
								</div>
							</div>
						</div>
					</>
				}
				{/* 포장주문내역확인 params = package : E  */}
				{/* 포장주문 취소내역확인 params = packageCancel : S  */}
				{
					pageType === 'packageCancel'
					&&
					<>
						<div className="mypdCont">
							<div className="innerWrap">
								<div className="mypdContTop">
									<span className="ico package">
										<img src={require(`assets/images/common/icoFuncOn01.png`)} alt=""/>
										포장주문
									</span>

									<div className="stoinf">
										<div className="tit" onClick={()=>history.push(`/order/myOrderDetail/${type}`)}>빈체로 파스타 안산 중앙점</div>
										<div className="stt red">주문취소</div>
									</div>
									<div className="mypdList MT45">
										<div className="mypdTp">
											<span className="lb">주문번호</span>
											<div className="vl roboto">200211-1123</div>
										</div>
										<div className="mypdTp">
											<span className="lb">주문일시</span>
											<div className="vl roboto">2020. 04. 16 목요일  오후 2 : 30</div>
										</div>
									</div>
								</div>
								<div className="mypdContMid">
									<div className="tit">주문 내역 (<span className="rotobo">6</span>건)</div>
									<div className="mypdList justify justifyTp2 MT30">
										<div className="mypdTp">
											<div className="lb">
												김치제육덮밥 3개
												<div className="slb">기본 금액 : 5,300원</div>
												<div className="slb">추가 옵션 : 치즈 추가 (1,000원)</div>
											</div>
											<div className="vl roboto">15,900원</div>
										</div>
										<div className="mypdTp">
											<div className="lb">
												야채김밥 1개
												<div className="slb">기본 금액 : 5,300원</div>
											</div>
											<div className="vl roboto">15,900원</div>
										</div>
									</div>
									<div className="tit MT80">사용 혜택</div>
									<div className="minf MT35">
										<div>[이달의감사쿠폰] 치즈떡볶이 제공</div>
										<div>[포인트] <span className="roboto strong">1,500 P</span> 사용</div>
									</div>
								</div>
								<div className="mypdContMid">
									<div className="tit">취소 내역</div>
									<div className="mypdList MT45">
										<div className="mypdTp">
											<span className="lb">취소일시</span>
											<div className="vl roboto">2020. 04. 16 목요일  오후 2 : 30</div>
										</div>
										<div className="mypdTp">
											<span className="lb">환불여부</span>
											<div className="vl">환불</div>
										</div>
									</div>
								</div>
							</div>
						</div>
						<div className="mypdFoot MT45">
							<div className="mypdBt">
								<div className="innerWrap">
									<div className="mypdList justify lg">
										<div className="mypdTp">
											<span className="lb">주문금액</span>
											<div className="vl"><span className="roboto strong">{RegExpFormat(3000, 'comma')}</span>원</div>
										</div>
										<div className="mypdTp">
											<span className="lb">할인금액</span>
											<div className="vl"><span className="roboto strong">{RegExpFormat(-3000, 'comma')}</span>원</div>
										</div>
										<div className="mypdTp">
											<span className="lb">결제금액</span>
											<div className="vl"><span className="roboto strong">{RegExpFormat(3000, 'comma')}</span>원</div>
										</div>
										<div className="mypdTp">
											<span className="lb">환불금액</span>
											<div className="vl"><span className="roboto strong">{RegExpFormat(3000, 'comma')}</span>원</div>
										</div>

									</div>
									<div className="btnsWrap MT45">
										<div className="uiRow">
											<div className="uiCol12">
												<UiButton className="red outline shadowNone">전자영수증</UiButton>
											</div>
										</div>
									</div>
								</div>
							</div>
						</div>
					</>
				}
				{/* 포장주문 취소내역확인 params = packageCancel : E  */}

				{
					isReserCancelDialogOpen
					&&
					<UiDialog
						type="confirm"
						cancelTextName='아니오'
						confirmTextName='예'
						isDisabledConfirmButton={isReserCancelAgree === false}
						bindClickCancelBtn={() => setIsReserCancelDialogOpen(false)}
						bindClickConfirmBtn={() => { alert(1) }}
					>
						<div className="reserCancelDialogArea">
							예약을 취소하시겠습니까?
						<div className="diagSubTit">결제하신 예약금은 환불되지 않습니다</div>
							<div className="diagScrollBox">
								<UiScroll>
									취소규정<br />
								취소규정<br />
								취소규정<br />
								취소규정<br />
								취소규정<br />
								취소규정<br />
								취소규정<br />
								취소규정<br />
								취소규정<br />
								취소규정<br />
								취소규정<br />
								취소규정<br />
								취소규정<br />
								취소규정<br />
								취소규정<br />
								취소규정 <br />
								</UiScroll>
							</div>
							<UiInput type="checkbox" id="chk1" name="chk1" label={
								(
									<>
										<strong className="strong">취소</strong> 및 <strong className="strong">환불 약관</strong>에 동의합니다
									</>
								)
							} className="sm" onChange={event => setIsReserCancelAgree(event.target.checked)} />
						</div>
					</UiDialog>
				}
				{
					isPackageCancelDialogOpen
					&&
					<UiDialog
						type="confirm"
						cancelTextName='아니오'
						confirmTextName='예'
						isDisabledConfirmButton={isPackageCancelAgree === false}
						bindClickCancelBtn={() => setIsPackageCancelDialogOpen(false)}
						bindClickConfirmBtn={() => { alert(1) }}
					>
						<div className="reserCancelDialogArea">
							주문을 취소하시겠습니까?
						<div className="diagSubTit">결제금액은 환불 처리됩니다</div>
							<div className="diagScrollBox">
								<UiScroll>
									취소규정<br />
								취소규정<br />
								취소규정<br />
								취소규정<br />
								취소규정<br />
								취소규정<br />
								취소규정<br />
								취소규정<br />
								취소규정<br />
								취소규정<br />
								취소규정<br />
								취소규정<br />
								취소규정<br />
								취소규정<br />
								취소규정<br />
								취소규정 <br />
								</UiScroll>
							</div>
							<UiInput type="checkbox" id="chk1" name="chk1" label={
								(
									<>
										<strong className="strong">취소</strong> 및 <strong className="strong">환불 약관</strong>에 동의합니다
									</>
								)
							} className="sm" onChange={event => setIsPackageCancelAgree(event.target.checked)} />
						</div>
					</UiDialog>
				}
			</div>
		</div >
	)
}
export default MyPaymentDetail;