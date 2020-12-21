import React, { useState } from 'react';
import { BrowserRouter, Route, Switch, Link } from "react-router-dom";
import { RegExpFormat, RegExpImeType, RegExpLimitLength } from './regexp';
import { CSSTransition, TransitionGroup } from 'react-transition-group';
import ScrollMemory from 'react-router-scroll-memory';

//COMPONENTS
import TestMenu from './components/TestMenu';
import Header from 'components/Header';

//PAGES
import AlowToAccess from './AlowToAccess'; //접근권한동의 페이지
import Onboarding from './Onboarding'; //온보딩페이지
import {
	UiKit,
	Main,
	UserLogin,
	UserIdentity,
	UserModifyPassword,
	UserRegister,
	UserNotice,
	MyLocation,
	MyLocationSetting,
	MySearch,
	ReviewCreate,
	MyOrderDetail,
	MyOrderList,
	MyOrderOption,
	MyOrderMemberReview,
	MyOrderReservation,
	MyOrderWaiting,
	MyOrderWaitingState,
	MyOrderTableQRCode,
	MyOrderTableType,
	MyCart,
	MyPayment,
	MyPaymentDetail,
	PaymentCompletion,
	PaymentFail,
	MyPage,
	MyModifyInfo,
	MyWithdraw,
	MyBenefit,
	MyReview,
	MyNotice,
	MyHistory,
	MyQuestion,
	MyQuestionWrite,
	MyQuestionDetail,
	MySetting,
	Error,
	EndService,
} from 'pages';


//STYLES
import "./assets/css/common.scss";
import "./assets/css/cmm.scss";
import "./assets/css/routerTransition.scss";


function App() {
	const [pagesPrevScrolled, setPagesPrevScrolled] = useState([]);
	const [isAlowToAccess, setIsAlowToAccess] = useState(false);
	const [isServiceStart, setIsServiceStart] = useState(false);

	return (
		<>
			<BrowserRouter basename={process.env.PUBLIC_URL}>
				{
					isAlowToAccess
						? <AlowToAccess bindClickAlowToAccess={bool => setIsAlowToAccess(bool)} />
						: isServiceStart
							?
							<Onboarding bindClickServiceStart={bool => setIsServiceStart(bool)} />
							:
							<Route render={({ location, history, ...routeProps }) => {
								const currentKey = location.pathname.split('/')[2] || '/';

								if (!location.options) location['options'] = {};

								return (
									<div className="viewport">
										<Header location={location} history={history} />
										<ScrollMemory />
										<TestMenu history={history} location={location} />
										<TransitionGroup>
											<CSSTransition
												unmountOnExit
												//key={currentKey}
												timeout={800}
												classNames={
													(history.action === 'PUSH' || history.action === 'REPLACE') && !location.options.isReversTransition
														? 'my-tnd'
														: 'my-tnd-revers'
												}
												onEnter={() => {
													let {
														pathname,
														key,
													} = history.location;
													(history.action === 'PUSH' || history.action === 'REPLACE')
														&&
														setPagesPrevScrolled(
															[
																...pagesPrevScrolled,
																...[
																	{
																		pathname,
																		key,
																		scrolled: window.scrollY
																	}
																]
															]
														)
												}}
												onExit={element => {
													if (history.action === 'PUSH') {
														element.style.top = -window.scrollY + 'px';
													} else if (history.action === 'POP') {

														let {
															pathname,
															key
														} = location;
														let scrolled = pagesPrevScrolled.find(locationObject => {
															return locationObject.pathname === pathname && locationObject.key === key;
														});
														if (scrolled) {
															element.style.top = (scrolled.scrolled - window.scrollY) + 'px';
														}
													}
												}}
											>
												<Switch location={location}>
													<Route path="/uikit" component={UiKit} />
													<Route exact path="/" render={() => {
														return <Main />
													}} />
													<Route exact path="/order/myOrderDetail/:type" render={({ match }) => {
														switch (match.params.type) {
															case 'menu':
																window.DEFAULT_PAGE_NAME = '포장주문';
																break;
															case 'orderTable':
																window.DEFAULT_PAGE_NAME = '테이블주문';
																break;
															default:
																window.DEFAULT_PAGE_NAME = '예약/줄서기';
														}
														return <MyOrderDetail />
													}} />
													<Route path="/order/myOrderList/:type" render={({ match }) => {
														switch (match.params.type) {
															case 'menu':
																window.DEFAULT_PAGE_NAME = '포장주문';
																break;
															case 'orderTable':
																window.DEFAULT_PAGE_NAME = '테이블주문';
																break;
															default:
																window.DEFAULT_PAGE_NAME = '예약/줄서기';
														}
														return <MyOrderList />
													}} />
													<Route path="/order/option" render={() => {
														window.DEFAULT_PAGE_NAME = '포장주문';
														return <MyOrderOption />
													}} />
													<Route path="/order/myOrderMemberReview" render={() => {
														window.DEFAULT_PAGE_NAME = (
															<div className="hin">
																<span className="pan">토실토실토실토실토실토실</span>님의 리뷰
															</div>
														);
														return <MyOrderMemberReview />
													}} />
													<Route path="/order/myOrderReservation" render={() => {
														window.DEFAULT_PAGE_NAME = (
															<div className="hin">
																<span className="pan">빈체로 파스타 안산점</span>예약
															</div>
														);
														return <MyOrderReservation />
													}} />
													<Route path="/order/myOrderWaiting" render={() => {
														window.DEFAULT_PAGE_NAME = (
															<div className="hin">
																<span className="pan">빈체로 파스타 안산점</span>줄서기
															</div>
														);
														return <MyOrderWaiting />
													}} />
													<Route path="/order/myOrderWaitingState" render={() => {
														window.DEFAULT_PAGE_NAME = '줄서기 현황';
														return <MyOrderWaitingState />
													}} />
													<Route path="/order/myOrderTableQRCode" render={() => {
														window.DEFAULT_PAGE_NAME = '테이블 주문';
														return <MyOrderTableQRCode />
													}} />
													<Route path="/order/myOrderTableType" render={() => {
														window.DEFAULT_PAGE_NAME = '테이블 주문';
														return <MyOrderTableType />
													}} />
													<Route path="/user/userLogin" render={() => {
														window.DEFAULT_PAGE_NAME = '로그인';
														return <UserLogin />
													}} />
													<Route path="/user/userIdentity/:type" render={({ match }) => {
														switch (match.params.type) {
															case 'phoneNumber':
																window.DEFAULT_PAGE_NAME = '전화번호 변경';
																break;
															default:
																window.DEFAULT_PAGE_NAME = '비밀번호 찾기';
														}
														return <UserIdentity />
													}} />
													<Route path="/user/userModifyPassword" render={() => {
														window.DEFAULT_PAGE_NAME = '새 비밀번호';
														return <UserModifyPassword />
													}} />
													<Route path="/user/userRegister/:registerSetStep" render={() => {
														window.DEFAULT_PAGE_NAME = '회원가입';
														return <UserRegister />
													}} />
													<Route path="/user/userNotice" render={() => {
														window.DEFAULT_PAGE_NAME = '나의 알림';
														return <UserNotice />
													}} />
													<Route exact path="/location" render={() => {
														window.DEFAULT_PAGE_NAME = '위치 설정';
														return <MyLocation />
													}} />
													<Route path="/location/MyLocationSetting" render={() => {
														window.DEFAULT_PAGE_NAME = '위치 설정';
														return <MyLocationSetting />
													}} />
													<Route path="/search" render={() => {
														//window.DEFAULT_PAGE_NAME = '디펄트-디테일';
														return <MySearch />
													}} />
													<Route path="/review" render={() => {
														window.DEFAULT_PAGE_NAME = '리뷰 작성';
														return <ReviewCreate />
													}} />
													<Route path="/payment/mycart/:type" render={() => {
														window.DEFAULT_PAGE_NAME = '나의 카트';
														return <MyCart />
													}} />
													<Route path="/payment/myPaymentDetail/:type" render={() => {
														window.DEFAULT_PAGE_NAME = '이용내역 상세';
														return <MyPaymentDetail />
													}} />
													<Route path="/payment/mypayment/:type" render={() => {
														window.DEFAULT_PAGE_NAME = '결제화면';
														return <MyPayment />
													}} />
													<Route path="/payment/paymentcompletion/:type" render={() => {
														window.DEFAULT_PAGE_NAME = '결제완료';
														return <PaymentCompletion />
													}} />
													<Route path="/payment/paymentfail/:type" render={({ match }) => {
														switch (match.params.type) {
															case 'payFail':
																window.DEFAULT_PAGE_NAME = '결제실패';
																break;
															case 'waitingCancel':
																window.DEFAULT_PAGE_NAME = '줄서기 취소';
																break;
															case 'packageCancel':
																window.DEFAULT_PAGE_NAME = '포장 취소';
																break;
															case 'myWithdraw':
																window.DEFAULT_PAGE_NAME = '회원 탈퇴';
																break;
															default:
																window.DEFAULT_PAGE_NAME = '예약 취소';
														}
														return <PaymentFail />
													}} />
													<Route exact path="/mypage" render={() => {
														window.DEFAULT_PAGE_NAME = '나의 정보';
														return <MyPage />
													}} />
													<Route path="/mypage/myModifyInfo" render={() => {
														window.DEFAULT_PAGE_NAME = '나의 정보';
														return <MyModifyInfo />
													}} />
													<Route path="/mypage/myWithdraw/:withdrawStep" render={() => {
														window.DEFAULT_PAGE_NAME = '회원 탈퇴';
														return <MyWithdraw />
													}} />
													<Route path="/mypage/myBenefit" render={() => {
														window.DEFAULT_PAGE_NAME = '나의 혜택';
														return <MyBenefit />
													}} />
													<Route path="/mypage/myReview" render={() => {
														window.DEFAULT_PAGE_NAME = '나의 리뷰';
														return <MyReview />
													}} />
													<Route path="/notice/:noticeDetail" render={({ match }) => {
														if (match.params.noticeDetail === 'index') {
															window.DEFAULT_PAGE_NAME = '공지사항';
														} else {
															window.DEFAULT_PAGE_NAME = '공지사항 상세';
														}
														return <MyNotice />
													}} />
													<Route path="/mypage/myHistory/:historyDetail" render={() => {
														window.DEFAULT_PAGE_NAME = '이용내역';
														return <MyHistory />
													}} />
													<Route path="/mypage/myQuestion" render={() => {
														window.DEFAULT_PAGE_NAME = '1:1 문의';
														return <MyQuestion />
													}} />
													<Route path="/mypage/myQuestionDetail" render={() => {
														window.DEFAULT_PAGE_NAME = '1:1 문의 상세';
														return <MyQuestionDetail />
													}} />
													<Route path="/mypage/mySetting" render={() => {
														window.DEFAULT_PAGE_NAME = '환경 설정';
														return <MySetting />
													}} />



													<Route path="/endService" component={EndService} />
													<Route component={Error} />
												</Switch>
											</CSSTransition>
										</TransitionGroup>
									</div>
								)
							}} />
				}
			</BrowserRouter>
		</>
	);
}

export default App;
