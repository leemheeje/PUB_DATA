import React, { useState, useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import UiSwiper from 'components/UiSwiper';
import Form from '../components/Form';
import 'assets/css/payment.scss';

// 임시 쿠폰 데이터
import coupon_data from '../coupon_data'

const Payment_coupon = () => {

	const couponListGroupColRow = [2, 3];
	const [couponList, setCouponList] = useState(coupon_data[0]);
	const [couponListGroup, setCouponListGroup] = useState([]);

	useEffect(() => {
		let _data = couponList.data;
		let _array = [];
		let _index = -1;

		for (let i = 0; i < _data.length; i++) {
			if (i % (couponListGroupColRow[0] * couponListGroupColRow[1]) === 0) {
				_index++;
				_array[_index] = [];
			}
			_array[_index].push(_data[i]);
		}
		setCouponListGroup(_array);
	}, [couponList.data]);


	//쿠폰 체크
	const [coupon, setCoupon] = useState('');
	
	const changeValue = (e) => {

		if (e.target.getAttribute('data-check') == 'checkUse') {
			document.querySelectorAll('input[name=coupon]').forEach(el => el.checked = false);
			e.target.setAttribute('data-check', '');
			setCoupon('');
			return false;
		} else {
			document.querySelectorAll('input[name=coupon]').forEach(el => el.setAttribute('data-check', ''));
			e.target.setAttribute('data-check', 'checkUse');
			setCoupon(e.target.value);
		}
	}


	return (
		<div className="popArea paymentCoupon">
			<div className="inner">

				<div className="paymentContents">

					<div className="titleWrap">
						<div className="icon"><img src={`${require('../assets/images/payment/ico_coupon.png')}`} alt="" /></div>
						<div className="title">쿠폰 사용</div>
						<div className="text txt1 first">사용하실 쿠폰을 선택해주세요</div>
						<div className="text txt2">쿠폰은 1회당 하나의 쿠폰만 사용 가능합니다</div>
					</div>

					<div className="couponList">
						<UiSwiper type="2" options={
							{
								shouldSwiperUpdate: true,
							}
						}>
						{
							couponListGroup.map((couponGroup, indexGroup) => {
								return (
									<ul className="list swiper-slide" key={indexGroup}>
										{
											couponGroup.map((coupon, index) => {
												return (
													<li key={index}>
														<Form type="radio" label={(
															<div className="couponCont">
																<span className="caption">{coupon.coupon_caption}</span>
																<span className="name">{coupon.coupon_name}</span>
																<span className="period roboto">{coupon.coupon_period}</span>
																<span className="btnCoupon">선택</span>
															</div>
														)} name="coupon" value={`cp${coupon.coupon_id}`} onClick={changeValue} id={`coupon${coupon.coupon_id}`} />
													</li>
												)
											})
										}
									</ul>
								)
							})
						}
						</UiSwiper>
					</div>

				</div>

				<div className="btn">
					<NavLink to="/payment/payment_option" className="btnCancel">취소</NavLink>
					<NavLink to="/payment/payment_point" className="btnNext shadow">다음</NavLink>
				</div>

			</div>

		</div>
	)
}

export default Payment_coupon;