import React from 'react';
import Swiper from 'react-id-swiper';
import '../assets/css/uiSwiper.scss';
import 'swiper/css/swiper.css';


const UiSwiper = props => {
	
	const { options = {}, children = [], ...as_props } = {
		...{
			type: 1
		},
		...props
	};


	const slide_options = {
		...{
			slidesPerView: 1,
			loop: false,
			navigation: {
				nextEl: '.uiSwiperContrNext',
				prevEl: '.uiSwiperContrPrev'
			},
			pagination: {
				el: '.uiSwiperContrPagination',
				clickable: true,
			},
		}, ...options
	}


	return (
		<div className={`uiSwiper ${
			as_props.type !== 'undifined' ? `type${as_props.type}` : ''
			}`}>
			<Swiper {...slide_options} >
				{
					children.map(slide => slide !== null && slide)
				}
			</Swiper>
		</div>
	)
}

export default UiSwiper;
