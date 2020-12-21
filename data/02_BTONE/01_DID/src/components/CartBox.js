import React, { useState, useEffect } from 'react';
import Swiper from 'react-id-swiper';
import Form from '../components/Form';
import 'swiper/css/swiper.css';

const CartBox = (props) => {

	//카트 슬라이드 옵션
	const cartOption = {
		slidesPerView: 4,
		loop: false,
		pagination: {
			el: '.swiper-pagination',
			type: 'bullets',
			clickable: true
		},
		navigation: {
			nextEl: '.swiper-button-next',
			prevEl: '.swiper-button-prev'
		},
		spaceBetween: 10,
	}
	return (
		<>
			<Swiper {...cartOption} >
				<CartBoxOne />
				<CartBoxOne />
				<CartBoxOne />
				<CartBoxOne />
				<CartBoxOne />
			</Swiper>
		</>
	);
};


//카트박스 1개
const CartBoxOne = (props) => {

	const [count, setCount] = useState(1);
	const [countAble, setCountAble] = useState('disabled');

	//수량증가
	const countUp = () => {
		setCount(count + 1);
	}

	//수량감소
	const countDown = () => {
		if (count > 1) {
			setCount(count - 1);
		}
	}

	//수량 0일 버튼 히든처리
	useEffect(() => {
		if (count > 1) {
			setCountAble('')
		} else {
			setCountAble('disabled')
		}
	}, [count])

	return (
		<>
			<div className="swiper-slide cartBox">
				<div className="img">이미지영역</div>
				<div className="name">
					<p className="txt">아메리카노</p>
					<p className="op">(ICE)(L)</p>
				</div>
				<div className="control">
					<button className={`minus ${countAble}`} onClick={countDown}>-</button>
					<Form type="text" value={count} disabled/>
					<button className="plus" onClick={countUp}>+</button>
				</div>
				<div className="price">금액 : 2500</div>

			</div>
		</>
	)
}

export default CartBox;