import React from 'react';
import { Link } from 'react-router-dom';
import Swiper from 'react-id-swiper';
import 'swiper/css/swiper.css';
import '../assets/css/uiSwiper.scss';



const UiSwiper = props => {

	const requireList = props.imgList.map((value, idx) => {
		return (
			<div className="swiper-slide" key={idx}><Link to="/order/myOrderList/menu"><img key={idx} src={value} alt="" /></Link></div>
		)
	})

	const params = {
		autoplay: {
			delay: 3000,
			disableOnInteraction: false
		},
		pagination: {
			el: '.swiper-pagination',
			type: 'bullets',
			clickable: true
		},
		loop: true
	}


	return (
		<div className="uiSwiper oneSlide">
			<Swiper {...params}>
				{
					requireList
				}
			</Swiper>
		</div>
	)
}

export default UiSwiper;
