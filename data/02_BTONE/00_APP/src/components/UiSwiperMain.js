import React, {useState} from 'react';
import { Link } from 'react-router-dom';
import Swiper from 'react-id-swiper';
import '../assets/css/uiSwiper.scss';
import 'swiper/css/swiper.css';


const UiSwiperMain = props => {

	const [slideEnd, setSlideEnd] = useState('')
	const [slideIdx, setSlideIdx] = useState(0)
	const thumbImgStore = props.slideData;

	const params = {
		slidesPerView: 'auto',
		centeredSlides: true,
		resistance: true,
		resistanceRatio: 0,
		spaceBetween: 0,
		touchRatio: .4,
		on: {
			transitionStart: function (Swiper) {
				setSlideIdx(this.activeIndex)
				setSlideEnd(this.isEnd)
			},
		}
	}

	return (
		<>
			<Swiper {...params}>
				{thumbImgStore.map((value, idx) => {
					return (
						<div className="swiper-slide" key={idx}>
							<Link className="swInner" to={thumbImgStore[slideIdx].link}><img src={value.thumbnail} alt="" /></Link>
						</div>
					)
				})}
			</Swiper>
			<div className="detailSlide">
				<Link to={thumbImgStore[slideIdx].link}>
					<div className="title">{thumbImgStore[slideIdx].store_name}</div>
					<div className="info">
						<div>
							<span>{thumbImgStore[slideIdx].address}</span>
							<span className="num">{thumbImgStore[slideIdx].distance}</span>
						</div>
						<div>
							리뷰 
							<span className="num">
							{thumbImgStore[slideIdx].review_point}
							</span>
						</div>
					</div>
					<div className="rightInfo">
						<div className="star">
							<span>
								{thumbImgStore[slideIdx].review_grade}
								<img src={require(`assets/images/common/icoStar.png`)} alt=""/>
							</span>
						</div>
						<div className="able">
							{thumbImgStore[slideIdx].reserve && <span>예약 가능</span>}
							{thumbImgStore[slideIdx].line && <span>줄서기 가능</span>}
						</div>
					</div>
				</Link>
			</div>
			{
				props.categoryLink
				?
				<Link to={props.categoryLink} className={`moveLink ${slideEnd}`}>
					<img src={require(`assets/images/common/icoMore.png`)} alt="더보기"/>
				</Link>
				:''
			}
		</>
	)
}

export default UiSwiperMain;
