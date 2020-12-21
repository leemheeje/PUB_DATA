import React, { useState, useEffect } from 'react';
import Swiper from 'react-id-swiper';
import 'swiper/css/swiper.css';

const MenuList = (props) => {

	const { prdShow } = props;

	//리스트 슬라이드 옵션
	const listOption = {
		slidesPerView: 1,
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
			<Swiper {...listOption} >
				<ul className="swiper-slide">
					<li onClick={prdShow}>
						<div className="img">이미지 영역</div>
						<div className="textWrap">
							<div className="name">메뉴명</div>
							<div className="price">금액</div>
						</div>
					</li>
					<li onClick={prdShow}>
						<div className="img">이미지 영역</div>
						<div className="textWrap">
							<div className="name">메뉴명</div>
							<div className="price">금액</div>
						</div>
					</li>
					<li onClick={prdShow}>
						<div className="img">이미지 영역</div>
						<div className="textWrap">
							<div className="name">메뉴명</div>
							<div className="price">금액</div>
						</div>
					</li>
					<li onClick={prdShow}>
						<div className="img">이미지 영역</div>
						<div className="textWrap">
							<div className="name">메뉴명</div>
							<div className="price">금액</div>
						</div>
					</li>
				</ul>
				<ul className="swiper-slide">
					<li onClick={prdShow}>
						<div className="img">이미지 영역</div>
						<div className="textWrap">
							<div className="name">메뉴명</div>
							<div className="price">금액</div>
						</div>
					</li>
					<li onClick={prdShow}>
						<div className="img">이미지 영역</div>
						<div className="textWrap">
							<div className="name">메뉴명</div>
							<div className="price">금액</div>
						</div>
					</li>
					<li onClick={prdShow}>
						<div className="img">이미지 영역</div>
						<div className="textWrap">
							<div className="name">메뉴명</div>
							<div className="price">금액</div>
						</div>
					</li>
					<li onClick={prdShow}>
						<div className="img">이미지 영역</div>
						<div className="textWrap">
							<div className="name">메뉴명</div>
							<div className="price">금액</div>
						</div>
					</li>
				</ul>
			</Swiper>


		</>
	);
};

export default MenuList;