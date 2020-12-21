import React, { useState, useEffect } from "react";
import { BrowserRouter, Route, Switch, Link } from "react-router-dom";
import Navigator from 'components/Navigator';
import UiSwiper from 'components/UiSwiper';
import UiDialog from 'components/UiDialog';
import UiSwiperMain from 'components/UiSwiperMain';
import UiLink from 'components/UiLink';
import Swiper from 'react-id-swiper';
import 'swiper/css/swiper.css';
import '../assets/css/uiSwiper.scss';
import '../assets/css/main.scss';

//임시슬라이드 광고 이미지
const thumbImgBanner = [require('../assets/images/thumb/banner1.png'), require('../assets/images/thumb/banner1.png'), require('../assets/images/thumb/banner1.png')]

//임시슬라라이드 매장 이미지
const thumbImgStorePack = [
	{
		link: '/order/myOrderDetail/menu',
		store_name: '카페달미 (Cafe Dalmi)',
		thumbnail: require('../assets/images/thumb/slide1.jpg'),
		address: '중앙동',
		distance: '1KM',
		review_point: '748',
		review_grade: '4.9',
	}, {
		link: '/order/myOrderDetail/waiting',
		store_name: '빈체로 파스타 안산 중앙점',
		thumbnail: require('../assets/images/thumb/slide2.jpg'),
		address: '이문동',
		distance: '2KM',
		review_point: '3,333',
		review_grade: '3',
	}, {
		link: '/order/myOrderDetail/orderTable',
		store_name: '차가네',
		thumbnail: require('../assets/images/thumb/slide3.jpg'),
		address: '도봉동',
		distance: '2KM',
		review_point: '631',
		review_grade: '4',
	}, {
		link: '/',
		store_name: '빈체로 파스타 안산 중앙점',
		thumbnail: require('../assets/images/thumb/slide4.jpg'),
		address: '금호동',
		distance: '5KM',
		review_point: '777',
		review_grade: '2.2',
	}, {
		link: '/',
		store_name: '네오오징어',
		thumbnail: require('../assets/images/thumb/slide5.jpg'),
		address: '자양동',
		distance: '500M',
		review_point: '22,222',
		review_grade: '1.1',
	}, {
		link: '/',
		store_name: '빌리엔젤',
		thumbnail: require('../assets/images/thumb/slide6.jpg'),
		address: '삼성동',
		distance: '5KM',
		review_point: '348',
		review_grade: '4.2',
	}
]
const thumbImgStoreReser = [
	{
		link: '/order/myOrderDetail/menu',
		store_name: '카페달미 (Cafe Dalmi)',
		thumbnail: require('../assets/images/thumb/slide1.jpg'),
		address: '중앙동',
		distance: '1KM',
		review_point: '748',
		review_grade: '4.9',
		reserve: true,
		line: true
	}, {
		link: '/order/myOrderDetail/waiting',
		store_name: '빈체로 파스타 안산 중앙점',
		thumbnail: require('../assets/images/thumb/slide2.jpg'),
		address: '이문동',
		distance: '2KM',
		review_point: '3,333',
		review_grade: '3',
		reserve: true,
		line: true
	}, {
		link: '/order/myOrderDetail/orderTable',
		store_name: '차가네',
		thumbnail: require('../assets/images/thumb/slide3.jpg'),
		address: '도봉동',
		distance: '2KM',
		review_point: '631',
		review_grade: '4',
		reserve: true,
		line: true
	}, {
		link: '/',
		store_name: '빈체로 파스타 안산 중앙점',
		thumbnail: require('../assets/images/thumb/slide4.jpg'),
		address: '금호동',
		distance: '5KM',
		review_point: '777',
		review_grade: '2.2',
		reserve: true,
		line: true
	}, {
		link: '/',
		store_name: '네오오징어',
		thumbnail: require('../assets/images/thumb/slide5.jpg'),
		address: '자양동',
		distance: '500M',
		review_point: '22,222',
		review_grade: '1.1',
		reserve: false,
		line: false
	}, {
		link: '/',
		store_name: '빌리엔젤',
		thumbnail: require('../assets/images/thumb/slide6.jpg'),
		address: '삼성동',
		distance: '5KM',
		review_point: '348',
		review_grade: '4.2',
		reserve: true,
		line: false
	}
]
const thumbImgStoreTable = [
	{
		link: '/order/myOrderDetail/menu',
		store_name: '카페달미 (Cafe Dalmi)',
		thumbnail: require('../assets/images/thumb/slide1.jpg'),
		address: '중앙동',
		distance: '1KM',
		review_point: '748',
		review_grade: '4.9',
	}, {
		link: '/order/myOrderDetail/waiting',
		store_name: '빈체로 파스타 안산 중앙점',
		thumbnail: require('../assets/images/thumb/slide2.jpg'),
		address: '이문동',
		distance: '2KM',
		review_point: '3,333',
		review_grade: '3',
	}, {
		link: '/order/myOrderDetail/orderTable',
		store_name: '차가네',
		thumbnail: require('../assets/images/thumb/slide3.jpg'),
		address: '도봉동',
		distance: '2KM',
		review_point: '631',
		review_grade: '4',
	}, {
		link: '/',
		store_name: '빈체로 파스타 안산 중앙점',
		thumbnail: require('../assets/images/thumb/slide4.jpg'),
		address: '금호동',
		distance: '5KM',
		review_point: '777',
		review_grade: '2.2',
	}, {
		link: '/',
		store_name: '네오오징어',
		thumbnail: require('../assets/images/thumb/slide5.jpg'),
		address: '자양동',
		distance: '500M',
		review_point: '22,222',
		review_grade: '1.1',
	}, {
		link: '/',
		store_name: '빌리엔젤',
		thumbnail: require('../assets/images/thumb/slide6.jpg'),
		address: '삼성동',
		distance: '5KM',
		review_point: '348',
		review_grade: '4.2',
	}
]




const Main = (props) => {
	const [loginCheck, setLoginCheck] = useState(true);
	const [isPreparingService, setIsPreparingService] = useState(false);
	const [closeServiceDialog, setCloseServiceDialog] = useState(false);
	return (
		<div className="container main gray">
			{/* 서비스종료팝업:S */}
			<button onClick={() => setCloseServiceDialog(true)} style={{ position: 'absolute', zIndex: 1 }}>픽오더종료팝업</button>
			<button onClick={() => setIsPreparingService(true)} style={{ position: 'absolute', zIndex: 1, left: '100px' }}>서비스준비중일때</button>
			{
				closeServiceDialog
				&&
				<UiDialog
					type="confirm"
					confirmTextName='종료'
					bindClickCancelBtn={() => {
						setCloseServiceDialog(false);
					}}
					bindClickConfirmBtn={() => {
						setCloseServiceDialog(false);
					}}
				>
					<div className="bnCls">
						<div className="bnImg">
							<img src={require('assets/images/thumb/banner4.png')} alt="" />
						</div>
						<div className="bnTit">픽오더를 종료하시겠습니까?</div>
					</div>
				</UiDialog>
			}
			{/* 서비스종료팝업:E */}
			<div className="locationBox">
				<UiLink to="/location" className="init ripple">
					<span>
						<img src={require(`assets/images/common/icoLocation.png`)} alt=""/>
						안산시 단원구 원선로 50
					</span>
				</UiLink>
			</div>

			<UiSwiper imgList={thumbImgBanner}></UiSwiper>

			<div className="btnFuncList">
				<ul>
					<li className="no1">
						<Link to="/order/myOrderList/menu">
							<span className="ico"><img src={require(`assets/images/main/icoMain01.png`)} alt="" /></span>
							<div className="subTit">방문 전 미리 주문!</div>
							<div className="tit">포장주문</div>
						</Link>
					</li>
					<li className="no2">
						<Link to="/order/myOrderList/reserWaiting">
							<span className="ico"><img src={require(`assets/images/main/icoMain02.png`)} alt="" /></span>
							<div className="subTit">기다리다 지친 나를 위한</div>
							<div className="tit">예약 / 줄서기</div>
						</Link>
					</li>
					<li className="no3">
						<Link to="/order/myOrderTableQRCode">
							<span className="ico"><img src={require(`assets/images/main/icoMain03.png`)} alt="" /></span>
							<div className="subTit">QR로 주문하자!</div>
							<div className="tit">테이블주문</div>
						</Link>
					</li>
				</ul>
			</div>

			<div className="mainSlideBox">
				<div className="tit">
					<span className="ico01">
						<img src={require(`assets/images/main/icoMain01.png`)} alt="" className="ic"/>
						포장주문
						<img src={require(`assets/images/common/icoArrow.png`)} alt="" className="arw"/>
					</span>
				</div>
				<div className="btSlide">
					<UiSwiperMain slideData={thumbImgStorePack} categoryLink="/order/myOrderList/menu"></UiSwiperMain>
				</div>
			</div>

			<div className="mainSlideBox">
				<div className="tit">
					<span className="ico02">
						<img src={require(`assets/images/main/icoMain02.png`)} alt="" className="ic"/>
						예약 / 줄서기
						<img src={require(`assets/images/common/icoArrow.png`)} alt="" className="arw"/>
					</span>
				</div>
				<div className="btSlide">
					<UiSwiperMain slideData={thumbImgStoreReser} categoryLink="/order/myOrderList/reserWaiting"></UiSwiperMain>
				</div>
			</div>

			<div className="mainSlideBox">
				<div className="tit">
					<span className="ico03">
						<img src={require(`assets/images/main/icoMain03.png`)} alt="" className="ic"/>
						테이블주문
						<img src={require(`assets/images/common/icoArrow.png`)} alt="" className="arw"/>
					</span>
				</div>
				<div className="btSlide">
					<UiSwiperMain slideData={thumbImgStoreTable} categoryLink="/order/myOrderList/orderTable"></UiSwiperMain>
				</div>
			</div>
			{
				!isPreparingService
					? <Navigator page="main" />
					: <div className="preService"> 현재 서비스 준비 중입니다 </div>
			}
		</div>
	)
}
export default Main;