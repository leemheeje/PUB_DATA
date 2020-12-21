import React from 'react';
import { Link } from 'react-router-dom';
import Swiper from 'react-id-swiper';
import 'swiper/css/swiper.css';
import '../assets/css/uiSwiper.scss';



const UiSwiperFree = props => {

	const requireList = props.imgList.map((value, idx) => {
		return (
			<div className="swiper-slide" key={idx}>
				<Link to={value.link}>
					<div className="img"><img key={idx} src={value.img} alt="" /></div>
					<div className="textBox">
						<div className="title">{value.title}</div>
						<div className="txt">{value.text}</div>
						<div className="price">
							<em className="num">{value.price}</em><span>원</span>
						</div>
					</div>
				</Link>
			</div>
		)
	})

	const params = {
		slidesPerView: 'auto',
		freeMode: true
	}


	return (
		<div className="uiSwiper freeSlide">
			<Swiper {...params}>
				{
					requireList
				}
			</Swiper>
		</div>
	)
}

export default UiSwiperFree;
