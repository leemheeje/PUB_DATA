import React, { useState, useEffect } from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import UiTabs from './UiTabs';
import '../assets/css/UiTopBanner.scss';
import PopupToast from 'components/PopupToast';
import PopupModal from 'components/PopupModal';
import UiLoading from 'components/UiLoading';

const defaultProps = {
	name: 12,
	coupon: 1123,
	point: 13333,
}

const UiTopBanner = props => {
	const location = useLocation();
	const tabsList = [
		{
			label: '메뉴선택',
			path: [
				'/order',
				'/order11',
				'/order12',
				'/order22',
				'/order44',
				'/order55',
			],
		},
		{
			label: '주문알림/포인트적립',
			path: ['/payment/payment_saving'],
		},
		{
			label: '결제하기',
			path: ['/payment/payment_option', '/payment/payment_option_case'],
		},
		{
			label: '결제완료',
			path: [
				'/payment/payment_completion',
				'/payment/payment_receipt',
			],
		},
	];

	const [userInfo, setUserInfo] = useState({
		name: '',
		coupon: 0,
		point: 0
	});
	//다중로그인 State
	const [multiUser] = useState([1004, 7777, 8282]);

	//팝업용 State
	const [popupLoading, setPopupLoading] = useState(''); // 로딩 팝업
	const [popupToast, setPopupToast] = useState(''); // 토스트 팝업
	const [multiLogin, setMultiLogin] = useState(''); // 다중로그인 팝업
	const [multiLoginLast, setMultiLoginLast] = useState(''); // 다중로그인 최종선택 팝업

	const [popUser, setPopUser] = useState(''); //다중로그인 최종 팝업용 임시 아이디

	//로딩팝업 열기(임시로 7초뒤 닫히며 일시적 사용불가 팝업 호출)
	const loadingOpen = () => {
		setPopupLoading(<UiLoading></UiLoading>);
		setTimeout(function () {
			setPopupLoading('');
			setDisabled(true);
		}, 7000)
	}


	//자동로그인 팝업 호출
	const autoPop = () => {
		setPopupToast(
			<PopupToast closeCallback={handlerToastCloseCallback}>
				{userInfo.name}님 로그인 되었습니다
			</PopupToast>
		);
	}
	const handlerToastCloseCallback = () => {
		setPopupToast('');
	}

	//다중로그인 팝업
	const multiPop = () => {
		setMultiLoginLast(false);
		setMultiLogin(
			<PopupModal>
				<div className="multiLogin">

					<div className="tit">여러명의 사용자가 인식되었습니다</div>
					<div className="subTit">알림 및 혜택을 수신할 사용자를 선택해주세요</div>
					<ul className="loginList">
						{
							multiUser.map((value, idx) => {
								return (
									<li key={idx}>
										<button value={value} onClick={multiPopLast}>{value}님 으로 로그인</button>
									</li>
								)
							})
						}
					</ul>
				</div>
			</PopupModal>
		)
	}

	//다중로그인 사용자 선택
	const multiPopLast = (e) => {
		setMultiLoginLast(true);
		setMultiLogin('');
		setPopUser(e.target.value);
	}


	//다중로그인 사용자 최종 선택 시 
	const loginSet = (e) => {
		setUserInfo({
			...userInfo,
			name: popUser,
			coupon: 10,
			point: 7700
		});
		setMultiLoginLast(false);
	}

	//다중로그인 사용자 최종 선택 후 안내 토스트 팝업
	useEffect(() => {
		if (userInfo.name) {
			setPopupToast(
				<PopupToast closeCallback={handlerToastCloseCallback}>
					{userInfo.name}님 로그인 되었습니다
				</PopupToast>
			);
		}
	}, [userInfo.name])

	//안면인식 노출 스테이트
	const [faceShow, setFaceShow] = useState();

	//안면인식 팝업 호출
	const handlerFaceModalCloseCallback = () => {
		setFaceShow(false);
	}
	const facePop = () => {
		setFaceShow(true);
	}


	//현재 일시적 사용불가 노출 스테이트
	const [disalbed, setDisabled] = useState('');

	//현재 일시적 사용불가 호출
	const kioskDisalbedOpen = () => {
		setDisabled(true);
	}

	//현재 일시적 사용불가 닫기
	const kioskDisalbedClose = () => {
		setDisabled(false);
	}


	return (
		<>
			{/* 로딩 팝업 */}
			{popupLoading}

			{/* 토스트 팝업 */}
			{popupToast}

			{/* 모달 팝업 - 다중로그인 */}
			{multiLogin}

			{/* 모달 팝업 - 다중로그인 최종선택 */}
			{multiLoginLast &&
				<PopupModal>
					<div className="multiLogin">
						<div className="tit">{popUser}님 으로 로그인 하시겠습니까?</div>
						<div className="subTit">부정 이용 시 민형사상 책임을 물을 수 있습니다</div>
						<div className="btnConfirm">
							<button className="cancel" onClick={multiPop}>취소</button>
							<button className="confirm" onClick={loginSet}>확인</button>
						</div>
					</div>
				</PopupModal>
			}

			{/* 안면인식 팝업 */}
			{faceShow &&
				<PopupModal faceModal closeCallback={handlerFaceModalCloseCallback} />
			}

			{/* 현재 일시적 사용불가 */}
			{disalbed &&
				<PopupModal>
					<div className="kioskDisalbed">
						<div className="tit">현재 일시적으로 사용이 불가합니다</div>
						<div className="tit2">다시 시도해주세요</div>
						<div className="btnConfirm">
							<button className="confirm" onClick={kioskDisalbedClose}>확인</button>
						</div>
					</div>
				</PopupModal>
			}

			<div className="topBanner">
				<div className="orderSubBanner" style={
					{
						backgroundImage: `url(${require('../assets/images/bannerSample.jpg')})`
					}
				}></div>

				<div className="userWrap">
					<div className="logo">
						<img src={require('../assets/images/common/storeLogo.png')} alt="가맹점로고" />
					</div>
					<div className="userPoint">
						{userInfo.name &&
							<>
								<div className="pointBox">
									<strong className="strong">{userInfo.name}</strong>님 해당 매장에서 사용 가능한 쿠폰 <strong className="strong">{userInfo.coupon}</strong>장 포인트 <strong className="strong">{userInfo.point}P</strong>
								</div>
							</>
						}
					</div>
					{/* 임시 버튼 */}
					<br />
					<button onClick={autoPop}>자동로그인</button><br />
					<button onClick={multiPop}>다중로그인</button><br />
					<button onClick={facePop}>안면인식종료</button><br />
					<button onClick={loadingOpen}>로딩열기(임시로7초뒤 일시적 팝업 호출)</button><br />
				</div>
				<NavLink exact to="/main" className="home">메인으로</NavLink>
			</div>
			<div className="orderTabs">
				<UiTabs>
					{
						tabsList.map((list, index) => <a path={list.path} className={
							list.path.some(path => {
								return location.pathname.toLowerCase() == path;
							}) ? 'active' : ''
						} key={index}><em></em><span>{list.label}</span></a>)
					}
				</UiTabs>
			</div>
		</>
	)
}
UiTopBanner.defaultProps = defaultProps;
export default UiTopBanner;