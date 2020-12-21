import React, { useState, useEffect, useRef } from 'react';
import { useParams, useHistory } from 'react-router';
import { RegExpFormat } from 'regexp';

//COMPONENTS
import UiTooltip from 'components/UiTooltip';
import UiToast2 from 'components/UiToast2';
import UiDialog from 'components/UiDialog';
import UiLink from "components/UiLink"
import UiButton from "components/UiButton"
import UiInput from "components/UiInput"

import MyCartListOrder from './MyCartListOrder';
import MyCartListCoupon from './MyCartListCoupon';

//STYLES
import 'assets/css/uiCountAddRem.scss';

// 임시 카트 데이터
import order_data from '../../order_data'
import coupon_data from '../../coupon_data'

const MyCart = () => {

	const [loginCheck, setLoginCheck] = useState(true) // 로그인 체크
	const loginGo = () => {
		setLoginCheck(true);
	}

	const { type } = useParams();
	const history = useHistory();
	const [orderList, setOrderList] = useState(order_data[0]); // 주문목록 임시 데이터 State
	const [orderListGroup, setOrderListGroup] = useState([]);

	const [couponList, setCouponList] = useState(coupon_data[0]); // 쿠폰목록 임시 데이터 State
	const [couponListGroup, setCouponListGroup] = useState([]);

	const [cartTotalNum, setCartTotalNum] = useState(0); // 메뉴 총 수량
	const [orderTotalPrice, setOrderTotalPrice] = useState(0); // 총 주문 금액
	const [cartTotalPrice, setCartTotalPrice] = useState(0); // 총 결제 금액

	// 매장 이름
	const store_name = {
		ko_name: '카페달미',
		eng_name: 'Cafe Dalmi'
	}

	useEffect(() => {
		let _data = orderList.order_menu;
		let _array = [];
		let _index = -1;

		for (let i = 0; i < _data.length; i++) {
			_index++;
			_array[_index] = [];
			_array[_index].push(_data[i]);
		}
		setOrderListGroup(_array);
	}, [orderList.order_menu]);

	useEffect(() => {
		let _data = couponList.my_coupon;
		let _array = [];
		let _index = -1;

		for (let i = 0; i < _data.length; i++) {
			_index++;
			_array[_index] = [];
			_array[_index].push(_data[i]);
		}
		setCouponListGroup(_array);
	}, [couponList.my_coupon]);


	const pointAble = 100;	// 포인트 증가감소 폭
	const allPoint = 2200;	// 사용자 총 포인트

	// 포인트 State
	const [pointCount, setPointCount] = useState(0);
	const [pointApplyPrice, setPointApplyPrice] = useState(0); // 포인트 적용 State
	const [pointbtn, setPointBtn] = useState(false); // 포인트 버튼 State
	const [isPointInputShow, setIsPointInputShow] = useState(false);
	const [isPointInputValue, setIsPointInputValue] = useState(0);
	const [isCuntAllPoint, setIsCuntAllPoint] = useState(false); //포인트 "전액사용" boolean
	const pointInputRef = useRef(); //직접입력 인풋레퍼런스 사용 target.value = 0 용도
	// 쿠폰 State
	const [couponApply, setCouponApply] = useState(''); // 쿠폰 할인 작용 State
	const [couponApplyPrice, setCouponApplyPrice] = useState(0); // 쿠폰 할인 금액 State
	const [couponToast, setCouponToast] = useState(false);	// 쿠폰 1매 이상 선택시 toast 팝업 State
	const [couponDialog, setCouponDialog] = useState(''); // 사용 불가 쿠폰 알림창 State
	const [couponNoDialog, setCouponNoDialog] = useState(false);


	// 총 결제금액
	useEffect(() => {
		let _totalPrice = orderTotalPrice - (couponApplyPrice + pointApplyPrice)
		setCartTotalPrice(_totalPrice);
	}, [orderTotalPrice, couponApplyPrice, pointApplyPrice]);

	//포인트변경
	useEffect(() => {
		if (pointCount < 100 || pointCount > allPoint) {
		} else {
		}
	}, [pointCount]);

	//포인트 증가
	const pointUp = () => {
		if (pointCount < allPoint) {
			setPointCount(pointCount + pointAble);
			setIsCuntAllPoint(false);
			setPointBtn(false);
		}
	}
	//포인트감소
	const pointDown = () => {
		if (pointCount > 0) {
			setPointCount(pointCount - pointAble);
			setIsCuntAllPoint(false);
			setPointBtn(false);
		}
	}

	const toastCloseCallback = () => {
		setCouponToast('');
	}
	// 체크된 보유 쿠폰 data
	const handlerCouponSubmit = params => {
		let _saleApplyPrice = 0;
		let _cartTotalPrice = orderTotalPrice - (couponApplyPrice + pointApplyPrice);
		let flag = 0;

		if (params.couponChkNum > 1) {
			setCouponToast(
				<UiToast2 closeCallback={toastCloseCallback}>
					<div className="couponToast">
						<div>쿠폰은 1주문당 1매 사용 가능하므로</div>
						<div>새로 선택하신 쿠폰으로 적용되었습니다</div>
					</div>
				</UiToast2>
			)
		}

		if (params.couponIndex && (params.couponApply !== '')) {
			// 메뉴 카테고리에 따라 할인적용
			switch (params.couponCategory) {
				case '메뉴제공':
					for (var i = 0; i < orderListGroup.length; i++) {
						if (params.couponItem === orderList.order_menu[i].title) {
							if (!params.couponMenuFreeChk) {
								setCouponApply('')
							} else {
								setCouponApply(orderList.order_menu[i].cart_index)
								_saleApplyPrice = orderList.order_menu[i].price
								setCouponApplyPrice(_saleApplyPrice)
								setCartTotalPrice(_cartTotalPrice)
							}
							break;
						} else {
							flag += 1;

							if (flag === orderListGroup.length) {
								setCouponApply('')
								setCouponApplyPrice(0)
								toastCloseCallback()
								setCouponNoDialog(true)
								setCouponDialog(
									<UiDialog
										bindClickConfirmBtn={() => setCouponDialog('')}
									>
										<div className="diagTit">적용 가능한 메뉴가 없습니다</div>
										<div className="diagSubTit MT10">메뉴를 추가하신 후 상품쿠폰을 적용해 주세요</div>
									</UiDialog>
								)
								break;
							}
						}
					}
					break;
				case '할인율':
					_saleApplyPrice = orderTotalPrice * (params.couponDiscount / 100)
					setCouponApplyPrice(_saleApplyPrice)
					setCartTotalPrice(_cartTotalPrice)
					setCouponApply('')
					setCouponNoDialog(false)
					break;
				case '할인금액':
					_saleApplyPrice = params.couponDiscount
					setCouponApplyPrice(_saleApplyPrice)
					setCartTotalPrice(_cartTotalPrice)
					setCouponApply('')
					setCouponNoDialog(false)
					break;
			}
		} else {
			setCouponApply('')
			setCouponApplyPrice(0)
		}
	}


	// 하단 총 주문금액 부분
	const handlerOrderSubmit = params => {
		let _totalNum = 0;
		let _totalPrice = 0;
		for (var i = 0; i < orderListGroup.length; i++) {
			if (params.orderIndex === orderList.order_menu[i].cart_index) {
				orderList.order_menu[i].count = params.orderCount
				orderList.order_menu[i].totalPrice = params.orderPrice
			}

			_totalNum += orderList.order_menu[i].count
			_totalPrice += orderList.order_menu[i].totalPrice

			setCartTotalNum(_totalNum)
			setOrderTotalPrice(_totalPrice)
		}
	}

	// 툴팁
	const [tooltip, setTooltip] = useState(); // 툴팁 호출 State
	const tooltipStyle = {
		left: '4.9%',
		top: '-100%'
	}
	const tooltipPop = () => {
		setTooltip(
			<div className="tooltipWrap" style={tooltipStyle}>
				<UiTooltip title="쿠폰/포인트 사용 안내" message="쿠폰 1매와 포인트 사용은 동시에 적용 가능하며, 쿠폰은 1주문당 1매 사용 가능합니다" />
				<button className="btnClose" onClick={() => setTooltip('')}><img src={require(`assets/images/common/icoX.png`)} alt="닫기" /></button>
			</div>
		)
	};

	return (
		<>
			<div className="container mycart">
				{/* 임시 버튼 */}
				<button onClick={() => setLoginCheck(false)}>비회원일때</button>
				<button onClick={() => setLoginCheck(true)}>회원일때</button>
				{loginCheck ?
					undefined
					:
					<div className="loginBox MB40">
						<div className="text">로그인 후 <span>쿠폰/포인트</span>를 확인해 보세요!</div>
						<div className="btnLogin">
							<UiLink text="로그인" onClick={loginGo}></UiLink>
						</div>
					</div>
				}
				<div className="mycartWrap">
					<div className="storeName">{store_name.ko_name} <span className="roboto">({store_name.eng_name})</span></div>
					<div className="cateName">
						<span className="tit">
							{orderList.category_name}
						</span>
					</div>
					<div className="mycartListWrap">
						{
							orderListGroup.map((orderGroup, indexGroup) => {
								return (
									<div className="mycartList orderList" key={indexGroup}>
										{
											orderGroup.map((list, index) => {
												return (
													<MyCartListOrder key={index} {...list} couponApply={couponApply} handlerOrderSubmit={handlerOrderSubmit} />
												)
											})
										}
									</div>
								)
							})
						}
					</div>
					<div className="cateName">
						<span className="tit">
							{couponList.category_name}
						</span>
						{
							loginCheck ?
								<>
									<span className="icoInfo" onClick={tooltipPop}><img src={`${require('assets/images/common/icoInfo.png')}`} alt="" /></span>
									{tooltip}
								</>
								:
								<>
									<span className="icoInfo"><img src={`${require('assets/images/common/icoInfo.png')}`} alt="" /></span>
									<span className="txtInfo">비회원 이용 시 쿠폰/ 포인트 할인을 받으실 수 없습니다</span>
								</>
						}

					</div>
					{
						loginCheck ?
							<>
								<div className="mycartListWrap">
									<div className="subTitle">보유 쿠폰</div>
									{
										couponListGroup.map((couponGroup, indexGroup) => {
											return (
												<div className="mycartList couponList" key={indexGroup}>
													{
														couponGroup.map((list, index) => {
															return (
																<MyCartListCoupon key={index} {...list} couponApply={couponApply} couponNoDialog={couponNoDialog} handlerCouponSubmit={handlerCouponSubmit} />
															)
														})
													}
												</div>
											)
										})
									}
								</div>
								<div className="mycartListWrap">
									<div className="myPont">
										<div className="subTitle">보유 포인트 <span className="roboto allPoint">: {RegExpFormat(allPoint, 'comma')}P</span></div>
										<div className="text">최소 <span className="roboto">100</span> P부터 <span className="roboto">100</span> P 단위로 사용 가능</div>
										{
											!isPointInputShow
												?
												<>
													<div className="control uiFormCount">
														<button className="rem" onClick={pointDown} disabled={pointCount === 0}>
															<img src={require(`assets/images/common/icoMinWhite.png`)} className="on" alt="빼기" />
															<img src={require(`assets/images/common/icoMinGray.png`)} className="disabled" alt="빼기비활성" />
														</button>
														<input className="ufcInput roboto" type="text" value={`${RegExpFormat(pointCount, 'comma')}P`} readOnly />
														<button className="add" onClick={pointUp} disabled={allPoint === 0 || pointCount === allPoint || (couponApplyPrice + pointCount) === orderTotalPrice}>
															<img src={require(`assets/images/common/icoPlusWhite.png`)} className="on" alt="추가하기" />
															<img src={require(`assets/images/common/icoPlusGray.png`)} className="disabled" alt="추가하기비활성" />
														</button>
													</div>
													<UiButton className="init COLOR_RED pitActBtn" onClick={() => {
														setIsPointInputShow(true);
														setIsCuntAllPoint(false);
														setPointBtn(false);
														setPointApplyPrice(0);
													}}>직접입력</UiButton>
												</>
												:
												<>
													<div className="pitActFid">
														<UiInput
															size="sm"
															type="tel"
															placeholder="0"
															onFailureMessage={isPointInputValue > allPoint ? true : false}
															failureMessage="사용포인트가 보유하신 포인트를 초과했습니다."
															onChange={event => {
																let v = '';
																let orgin_value = '';
																if (event.target.value) {
																	v = event.target.value.replace(/[\D]/g, '');
																	orgin_value = v;
																	v = RegExpFormat(v, 'comma');
																}
																event.target.value = `${v}`;
																setIsCuntAllPoint(false);
																setIsPointInputValue(Number(orgin_value));
															}} ref={pointInputRef} />
														<UiButton className="init pitActAllDelect" title="입력삭제" onClick={() => {
															setPointCount(0);
															pointInputRef.current.value = '';

														}}><img src={require(`assets/images/common/icoSearchClose.png`)} alt="" /></UiButton>
													</div>
													<UiButton className="init COLOR_RED pitActBtn" onClick={() => {
														setIsPointInputShow(false);
														setIsCuntAllPoint(false);
													}}>입력취소</UiButton>
												</>
										}

										<div className="rtBtnsWrap">
											<button
												className={`btns btnApply ${isCuntAllPoint ? 'active' : ''}`}
												onClick={() => {

													setPointCount(allPoint);
													setPointApplyPrice(allPoint);
													setIsCuntAllPoint(true);
													setIsPointInputShow(false);
													setPointBtn(false);
													if (isPointInputShow) pointInputRef.current.value = RegExpFormat(allPoint, 'comma');
												}}
											>
												<span className="txt">전액 사용</span>
												<img src={require(`assets/images/common/icoCircleChecked_27.png`)} alt="" />
											</button>
											{
												!isPointInputShow
													?
													<button
														className={`btns btnApply ${pointbtn && !isCuntAllPoint ? 'active' : ''}`}
														disabled={!pointbtn && isCuntAllPoint ? true : false}
														onClick={() => {
															setPointApplyPrice(pointCount);
															setPointBtn(true);
														}}
													>
														<span className="txt">사용</span>
														<img src={require(`assets/images/common/icoCircleChecked_27.png`)} alt="" />
													</button>
													:  //입력필드의 포인트사용버튼
													<button
														className={`btns btnApply`}
														disabled={
															isCuntAllPoint || isPointInputValue < 100 || isPointInputValue > allPoint ? true : false
														}
														onClick={() => {
															setPointCount(isPointInputValue);
															setPointApplyPrice(isPointInputValue);
															setIsPointInputShow(false);
															setPointBtn(true);
															pointInputRef.current.value = isPointInputValue;
														}}
													>
														<span className="txt">사용</span>
														<img src={require(`assets/images/common/icoCircleChecked_27.png`)} alt="" />
													</button>
											}

										</div>
									</div>
								</div>
							</>
							:
							<div className="emptyBox"></div>
					}


					<div className="btnAddMenu">
						<button onClick={() => history.push('/order/myOrderDetail/menu')}>+메뉴 추가하기</button>
					</div>

					<div className="resultWrap">
						<ul className="resultList">
							<li>
								<span className="title">주문금액</span>
								<span className="price"><span className="roboto">{RegExpFormat(orderTotalPrice, 'comma')}</span>원</span>
							</li>
							{
								loginCheck ?
									<li>
										<span className="title">할인금액</span>
										<span className="price">- <span className="roboto">{RegExpFormat(couponApplyPrice + pointApplyPrice, 'comma')}</span>원</span>
										<ul className="resultList">
											<li>
												<span className="title">쿠폰할인</span>
												<span className="price"><span className="roboto">{RegExpFormat(-5300, 'comma')}</span>원</span>
											</li>
											<li>
												<span className="title">포인트할인</span>
												<span className="price"><span className="roboto">{RegExpFormat(-2000, 'comma')}</span>원</span>
											</li>
										</ul>
									</li>
									:
									undefined
							}
							{
								type === 'reser'
									?
									<li>
										<span className="title">예약금</span>
										<span className="price">- <span className="roboto">{RegExpFormat(0, 'comma')}</span>원</span>
									</li>
									: ''
							}
							<li>
								<span className="title">결제금액</span>
								<span className="price"><span className="roboto">{RegExpFormat(cartTotalPrice, 'comma')}</span>원</span>
							</li>
						</ul>

						<div className="mooBottom">
							<div className="inner">
								{
									loginCheck ?
										<UiLink className="block" text={`${cartTotalNum}건 주문하기`} to="/payment/mypayment/menu"></UiLink>
										:
										<UiLink text={<>
											<span className="btnLeft">
												<span className="txt">비회원</span>
											</span>
											<span className="btnRight">
												{`${cartTotalNum}건 주문하기`}
											</span>
										</>} to="/payment"></UiLink>
								}
							</div>
						</div>
					</div>
				</div>
			</div>
			{couponToast}
			{couponDialog}
		</>
	)
}

export default MyCart;