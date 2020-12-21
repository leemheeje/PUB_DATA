import React from 'react';
import UiSwiper from './UiSwiper';
import PropTypes from 'prop-types';
import '../assets/css/Category.scss';
import $ from "jquery";


const propTypes = {
	productCategoryList: PropTypes.array.isRequired,
	fnEventHandler: PropTypes.func
};
const Category = props => {
	const { productCategoryList, fnEventHandler, productCategoryListActiveName, ...as_props } = props;

	//탭메뉴 강제 이동
	$('.tabSlide .swiper-slide').on('click',function(){
		var $this = $(this);
		var $swiperWrapper = $('.tabSlide .swiper-wrapper');
		var elLeft = $this.position().left;
		var elWidth = $this.width();
		var parentwidth = $this.parent().width();
		var moveNext = elLeft+elWidth - parentwidth;
		var movePrev =elLeft;
		var matrix = $swiperWrapper.css('transform').replace(/[^0-9\-.,]/g, '').split(',');
		var x = matrix[12] || matrix[4];
		
		if($this.index() === 0){
			$swiperWrapper.css({transform: 'translate3d(0,0,0)'})
		}else{
			if(elLeft+elWidth > Math.abs(x) + parentwidth) {
				$swiperWrapper.css({transform: 'translate3d(-' + moveNext + 'px,0,0)'})
			}else if(elLeft < Math.abs(x)){
				$swiperWrapper.css({transform: 'translate3d(-' + movePrev + 'px,0,0)'})
			}
		}
	})


	return (
		<div className="uiCategory">
			{
				productCategoryList.length > 5
					?
					<UiSwiper options={
						{
							slidesPerView: 'auto',
							spaceBetween: 33,
							loop: false,
							freeMode: true,
							pagination: false,
						}
					}>
						{
							productCategoryList.map((v, i) => {
								return (
									<div className={`swiper-slide uiCategoryItem ${v === productCategoryListActiveName ? 'active' : ''}`} {...as_props} onClick={(e) => {
										fnEventHandler(i);
									}} key={i}><span>{v}</span> </div>
								)
							})
						}
					</UiSwiper>
					:
					<div className="notSlide">
						{
							productCategoryList.map((v, i) => {
								return (
									<div className={`uiCategoryItem ${v === productCategoryListActiveName ? 'active' : ''}`} {...as_props} onClick={() => {
										fnEventHandler(i);
									}} key={i}> {v} </div>
								)
							})
						}
					</div>

			}

		</div>
	);
};

Category.propTypes = propTypes;
export default Category;