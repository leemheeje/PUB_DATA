import React, { useState, useEffect } from 'react';
import { NavLink } from 'react-router-dom';


const TestMenu = ({ history, location, ...athers }) => {
	const [menu, setMenu] = useState(false);
	useEffect(()=>{
		setMenu(false);
	},[location]);
	return (
		<div id="menu" className={`menu ${menu ? 'active' : ''}`} onClick={event => {
			if (event.target === event.currentTarget) {
				setMenu(false);
			}
		}}>
			<button onClick={() => {
				if (!menu) {
					setMenu(true);
				} else {
					setMenu(false);
				}
			}}>MENU</button>
			<>
				{/* <button onClick={() => history.goForward()}>앞으로</button> */}
				<ul>
					<li><NavLink activeClassName="active" exact to={{ pathname: '/', options: { isReversTransition: true, pageName: '링크타고온메인' } }}>메인</NavLink></li>
					<li><a>포장주문</a>
						<ul>
							<li><NavLink activeClassName="active" to={{ pathname: '/order/myOrderList/menu', options: { pageName: '포장주문' } }}>포장주문-리스트</NavLink></li>
							<li><NavLink activeClassName="active" to={{ pathname: '/order/myOrderDetail/menu', options: { pageName: '포장주문' } }}>포장주문-메뉴상세</NavLink></li>
							<li><NavLink activeClassName="active" to="/order/option">포장주문-메뉴옵션추가</NavLink></li>
							<li><NavLink activeClassName="active" to={{ pathname: '/order/myOrderMemberReview'}}>포장주문-리뷰몰아보기</NavLink></li>
						</ul>
					</li>






					<li><NavLink activeClassName="active" to="/endService">서비스종료</NavLink></li>
					<li><a>예약</a>
						<ul>
							<li><NavLink activeClassName="active" to="/order/myOrderList/reserWaiting">예약-리스트</NavLink></li>
							<li><NavLink activeClassName="active" to="/order/myOrderDetail/reser">예약-매장상세</NavLink></li>
							<li><NavLink activeClassName="active" to="/order/myOrderReservation">예약-예약하기</NavLink></li>
							<li><NavLink activeClassName="active" to="/payment/mypayment/reser">예약-결제화면</NavLink></li>
							<li><NavLink activeClassName="active" to="/payment/paymentcompletion/reser">예약-결제완료</NavLink></li>
							<li><NavLink activeClassName="active" to="/payment/myPaymentDetail/reser">예약-이용내역상세</NavLink></li>
							<li><NavLink activeClassName="active" to="/payment/mycart/reser">예약-주문결제내역</NavLink></li>
							<li><NavLink activeClassName="active" to="/payment/paymentfail/reserCancel">예약-예약취소</NavLink></li>
							<li><NavLink activeClassName="active" to="/payment/myPaymentDetail/reserCancel">예약-예약취소내역</NavLink></li>
						</ul>
					</li>
					<li><a>줄서기</a>
						<ul>
							<li><NavLink activeClassName="active" to="/order/myOrderList/reserWaiting">줄서기-리스트</NavLink></li>
							<li><NavLink activeClassName="active" to="/order/myOrderDetail/waiting">줄서기-매장상세</NavLink></li>
							<li><NavLink activeClassName="active" to="/order/myOrderWaiting">줄서기-줄서기접수</NavLink></li>
							<li><NavLink activeClassName="active" to="/payment/paymentcompletion/waiting">줄서기-줄서기접수완료</NavLink></li>
							<li><NavLink activeClassName="active" to="/order/myOrderWaitingState">줄서기-줄서기현황</NavLink></li>
							<li><NavLink activeClassName="active" to="/payment/myPaymentDetail/waitingComplete">줄서기-이용완료</NavLink></li>
							<li><NavLink activeClassName="active" to="/payment/paymentfail/waitingCancel">줄서기-줄서기취소</NavLink></li>
							<li><NavLink activeClassName="active" to="/payment/myPaymentDetail/waitingCancel">줄서기-줄서기취소내역</NavLink></li>
						</ul>
					</li>
					<li><a>테이블주문</a>
						<ul>
							<li><NavLink activeClassName="active" to="/order/myOrderList/orderTable">테이블주문-리스트</NavLink></li>
							<li><NavLink activeClassName="active" to="/order/myOrderDetail/orderTable">테이블주문-메뉴상세</NavLink></li>
							<li><NavLink activeClassName="active" to="/order/myOrderTableQRCode">테이블주문-QR코드</NavLink></li>
							<li><NavLink activeClassName="active" to="/order/myOrderTableType">테이블주문-주문유형선택</NavLink></li>
						</ul>
					</li>
					<li><a>로그인&비밀번호&회원가입</a>
						<ul>
							<li><NavLink activeClassName="active" to="/user/userLogin">유저-로그인페이지</NavLink></li>
							<li><NavLink activeClassName="active" to="/user/userIdentity/password">유저-비밀번호찾기</NavLink></li>
							<li><NavLink activeClassName="active" to="/user/userModifyPassword">유저-비밀번호변경</NavLink></li>
							<li><NavLink activeClassName="active" to="/user/userRegister/step1">유저-회원가입1</NavLink></li>
							<li><NavLink activeClassName="active" to="/user/userRegister/step2">유저-회원가입2</NavLink></li>
							<li><NavLink activeClassName="active" to="/user/userRegister/step3">유저-회원가입3</NavLink></li>
						</ul>
					</li>
					<li><a>알림&위치설정</a>
						<ul>
							<li><NavLink activeClassName="active" to="/user/userNotice">유저-알림</NavLink></li>
							<li><NavLink activeClassName="active" to="/location">위치설정</NavLink></li>
							<li><NavLink activeClassName="active" to="/location/myLocationSetting">위치설정-맵</NavLink></li>
						</ul>
					</li>
					<li><NavLink activeClassName="active" to="/review">리뷰-작성</NavLink></li>
					<li><NavLink activeClassName="active" to="/search">검색페이지</NavLink></li>
					<li><NavLink activeClassName="active" to="/uikit">UIKIT</NavLink></li>
					<li><a>결제관련</a>
						<ul>
							<li><NavLink activeClassName="active" to="/payment/mycart/menu">payment-MyCart</NavLink></li>
							<li><NavLink activeClassName="active" to="/payment/mypayment/menu">payment-결제</NavLink></li>
							<li><NavLink activeClassName="active" to="/payment/paymentcompletion/menu">payment-완료</NavLink></li>
							<li><NavLink activeClassName="active" to="/payment/paymentfail/payFail">payment-실패</NavLink></li>
						</ul>
					</li>
					<li><a>마이페이지</a>
						<ul>
							<li><NavLink activeClassName="active" to="?mypageModal=true">마이페이지-모달창</NavLink></li>
							<li><NavLink activeClassName="active" to="/mypage/myModifyInfo">마이페이지-정보수정</NavLink></li>
							<li><NavLink activeClassName="active" to="/user/userIdentity/phoneNumber">마이페이지-핸드폰번호수정</NavLink></li>
							<li><NavLink activeClassName="active" to="/mypage/myWithdraw/step1">마이페이지-회원탈퇴</NavLink></li>
							<li><NavLink activeClassName="active" to="/payment/paymentfail/myWithdraw">마이페이지-회원탈퇴완료</NavLink></li>
							<li><NavLink activeClassName="active" to="/mypage/myBenefit">마이페이지-나의혜택</NavLink></li>
							<li><NavLink activeClassName="active" to="/mypage/myReview">마이페이지-나의리뷰</NavLink></li>
							<li><NavLink activeClassName="active" to="/mypage/myHistory/index">마이페이지-이용내역</NavLink></li>
							<li><NavLink activeClassName="active" to="/payment/myPaymentDetail/kiosk">마이페이지-이용내역(kiosk)</NavLink></li>
							<li><NavLink activeClassName="active" to="/payment/myPaymentDetail/package">마이페이지-이용내역(포장주문)</NavLink></li>
							<li><NavLink activeClassName="active" to="/payment/myPaymentDetail/packageCancel">마이페이지-이용내역(포장취소)</NavLink></li>
							<li><NavLink activeClassName="active" to="/payment/paymentfail/packageCancel">마이페이지-포장주문 취소완료</NavLink></li>
							<li><NavLink activeClassName="active" to="/payment/paymentfail/reserCancelFail">마이페이지-포장주문 취소실패</NavLink></li>
							<li><NavLink activeClassName="active" to="/mypage/myQuestion">마이페이지-1:1문의</NavLink></li>
							<li><NavLink activeClassName="active" to="/mypage/myQuestion?myQuestionWrite=true">마이페이지-1:1문의작성</NavLink></li>
							<li><NavLink activeClassName="active" to="/mypage/myQuestionDetail">마이페이지-문의상세</NavLink></li>
							<li><NavLink activeClassName="active" to="/notice/index">마이페이지-공지사항</NavLink></li>
							<li><NavLink activeClassName="active" to="/mypage/mySetting">마이페이지-환경설정</NavLink></li>
						</ul>
					</li>
				</ul>
			</>

		</div>
	)
}
export default TestMenu;