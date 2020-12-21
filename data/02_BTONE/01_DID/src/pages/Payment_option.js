import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import UiTopBanner from 'components/UiTopBanner';
import UiItem from 'components/UiItem';
import UiSwiper from 'components/UiSwiper';
import UiButton from 'components/UiButton';
import PopupModal from 'components/PopupModal';
import { RegExpFormat } from '../regexp';
import 'assets/css/payment.scss';
import 'assets/css/payment_option.scss';


import order_data from '../order_data'

const defaultProps = {
	options: order_data,
	orderCouponAndPoint: [
		{
			name: 'Ms포인트',
			value: 184
		},
		{
			name: 'Ms포인트',
			value: 184
		},
	],
	orderCouponAndPointPrice: 0,
	cartTotalMenuPrice: 0,
	orderTotalMenuPrice: 0,
	depositPrice: 3000,
	isAnotherPayMent: true
}

const Payment_option = props => {
	const { options, ..._props } = props;
	const [orderOptions, setOrderOptions] = useState([]);
	const [pay_com, setpay_com] = useState(false);
	const [poi_com, setpoi_com] = useState(true);
	const [orderCouponAndPoint] = useState(_props.orderCouponAndPoint);
	const [isAnotherPayMent] = useState(_props.isAnotherPayMent);
	const [productOrderListGroupColRow, setProductOrderListGroupColRow] = useState([]);
	const [isAnotherPayMentModal, setIsAnotherPayMentModal] = useState(false);

	const [orderCouponAndPointPrice, setOrderCouponAndPointPrice] = useState(_props.orderCouponAndPointPrice);
	const [cartTotalMenuPrice, setCartTotalMenuPrice] = useState(_props.cartTotalMenuPrice);
	const [orderTotalMenuPrice, setOrderTotalMenuPrice] = useState(_props.orderTotalMenuPrice);

	useEffect(() => {
		if (orderCouponAndPoint.length) {
			setProductOrderListGroupColRow([4, 1]);
		} else {
			setProductOrderListGroupColRow([4, 2]);
		}

	}, [orderCouponAndPoint]);

	useEffect(() => {
		let _array = [];
		let _index = -1;
		if (productOrderListGroupColRow.length) {
			for (let i = 0; i < options.length; i++) {
				if (i % (productOrderListGroupColRow[0] * productOrderListGroupColRow[1]) === 0) {
					_index++;
					_array[_index] = [];
				}
				_array[_index].push(options[i]);
			}
			setOrderOptions(_array);
		}
	}, [options, productOrderListGroupColRow]);

	useEffect(() => {
		let _orderCouponAndPointPrice = 0;
		let _cartTotalMenuPrice = 0;
		orderCouponAndPoint.forEach(item => {
			_orderCouponAndPointPrice += item.value;
			setOrderCouponAndPointPrice(_orderCouponAndPointPrice);
		});
		options.forEach(item => {
			_cartTotalMenuPrice += item.totalMenuPrice;
			setCartTotalMenuPrice(_cartTotalMenuPrice);
		});
	}, [orderCouponAndPoint, options]);

	useEffect(() => {
		setOrderTotalMenuPrice(cartTotalMenuPrice - orderCouponAndPointPrice - _props.depositPrice);
	}, [cartTotalMenuPrice, orderCouponAndPointPrice]);

	const handlerAnotherPayment = gubun => {
		setIsAnotherPayMentModal(false);
		switch (gubun) {
			case 'kakaopay':
				_props.history.push('/payment/payment_kakaopay');
				break;
		}
	}

	return (
		<div className="popArea paymentOption">
			<UiTopBanner />
			<div className="payTop">
				<div className="innerWrap">
					<div className="payTopInner">
						<div className="locTit">주문내역</div>
						<div className="pyoSlide">
							<div className="uiRow">
								{
									orderOptions.length
										? <UiSwiper type="2" options={
											{
												shouldSwiperUpdate: true,
											}
										}>
											{
												orderOptions.map((itemGroup, index) => {
													return (
														<div className="swiper-slides" key={index}>
															{
																itemGroup.map((item, i) => {
																	return <div className="uiCol3" key={i}> <UiItem {...item} order /> </div>
																})
															}
														</div>
													)
												})
											}
										</UiSwiper>
										: <div className="nullImg">nullImg</div>
								}

							</div>
						</div>
						{
							orderCouponAndPoint.length
								?
								<div className="pyoCoupon">
									<div className="locTit MT125">쿠폰 / 포인트</div>
									<div className="shadowBox">
										{
											orderCouponAndPoint.map((item, index) => {
												return (
													<div className="list" key={index}>
														<div className="lt">{item.name}</div>
														<div className="rt"><span className="roboto">{RegExpFormat(-item.value, 'comma')}</span>원</div>
													</div>
												)
											})
										}
									</div>
								</div>
								: false
						}
					</div>
				</div>
			</div>
			<div className="payBottom">
				<div className="innerWrap">
					<div className="payBottomInner">
						<div className="ltBox">
							<div className="shadowBox tp2">
								<div className="list">
									<div className="lt">주문금액</div>
									<div className="rt"><span className="roboto">{RegExpFormat(cartTotalMenuPrice, 'comma')}</span><span className="middle">원</span></div>
								</div>
								<div className="list">
									<div className="lt">할인금액</div>
									<div className="rt"><span className="roboto">{RegExpFormat(-orderCouponAndPointPrice, 'comma')}</span><span className="middle">원</span></div>
								</div>
								<div className="list">
									<div className="lt">예약 예치금</div>
									<div className="rt"><span className="roboto">{RegExpFormat(-_props.depositPrice, 'comma')}</span><span className="middle">원</span></div>
								</div>
								<div className="list price">
									<div className="lt">총 결제금액</div>
									<div className="rt"><span className="roboto">{RegExpFormat(orderTotalMenuPrice, 'comma')}</span><span className="middle">원</span></div>
								</div>
							</div>
						</div>
						<div className="rtButtons">
							{poi_com&&orderCouponAndPoint.length
									? <Link to="/payment/payment_coupon" className="btns yellow bold shadow block">쿠폰 / 포인트</Link>
									: false
							}
							<UiButton onClick={() => setIsAnotherPayMentModal(true)} className="btns red bold shadow block motion01">결제수단</UiButton>
							{/* {
								isAnotherPayMent
									? <UiButton onClick={() => setIsAnotherPayMentModal(true)} className="btns red bold shadow block">다른결제수단</UiButton>
									: false
							} */}
							<Link to="/order" className="btns outline block rtButtonCancel">취소</Link>
						</div>
					</div>
				</div>
			</div>
			{
				isAnotherPayMentModal &&
				<PopupModal>
					<div className="multiLogin type2">
						{/* <div className="box top">
							<Link to="/payment/payment_face"><button>카드결제</button></Link>
						</div> */}
						<div className="box bottom">
							<div className="otherTit">결제 수단 선택</div>
							<ul className="loginList">
								<li><Link to="/payment/payment_pay"><button>신용/체크카드</button></Link></li>
								<li><Link to="/payment/payment_pay_ant"><button>삼성/LG페이</button></Link></li>
								{/* <li><button onClick={() => handlerAnotherPayment('kakaopay')}>카카오 페이</button></li> */}
								{/* <li><button onClick={() => handlerAnotherPayment('kakaopay')}>카카오 페이</button></li>
								<li><button onClick={() => handlerAnotherPayment('naverpay')}>네이버 페이</button></li>
								<li><button onClick={() => handlerAnotherPayment('samsungpay')}>삼성 페이</button></li>
								<li><button onClick={() => handlerAnotherPayment('samsungpay')}>L Pay</button></li>
								<li><button onClick={() => handlerAnotherPayment('samsungpay')}>Payco</button></li> */}
							</ul>
							<button className="cancel" onClick={() => handlerAnotherPayment()}>취소</button>
						</div>
					</div>
				</PopupModal>
			}
		</div>
	)
}
Payment_option.defaultProps = defaultProps;
export default Payment_option;