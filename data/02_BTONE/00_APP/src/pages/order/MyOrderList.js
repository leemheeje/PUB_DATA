import React, { useState } from 'react';
import { Link, useParams } from 'react-router-dom';

//COMPONENTS
import UiButton from 'components/UiButton';
import UiSorting from 'components/UiSorting';

//STYLES
import 'assets/css/myOrderList.scss';

//임시슬라라이드 매장 이미지
const thumbImgStore = [
	{
		link: '/order/myOrderDetail/menu',
		store_name: '포장주문링크',
		thumbnail: require('assets/images/thumb/slide1.jpg'),
		address: '중앙동',
		distance: '1KM',
		review_point: '748',
		review_grade: '4.9',
		reserve: true,
		line: true
	}, {
		link: '/order/myOrderDetail/orderTable',
		store_name: '테이블주문링크',
		thumbnail: require('assets/images/thumb/slide2.jpg'),
		address: '이문동',
		distance: '2KM',
		review_point: '3,333',
		review_grade: '3',
		reserve: false,
		line: true
	}, {
		link: '/order/myOrderDetail/reserWaiting',
		store_name: '예약줄서기링크',
		thumbnail: require('assets/images/thumb/slide3.jpg'),
		address: '도봉동',
		distance: '2KM',
		review_point: '631',
		review_grade: '4',
		reserve: true,
		line: false
	}, {
		link: '/order/myOrderDetail/reser',
		store_name: '예약링크',
		thumbnail: require('assets/images/thumb/slide4.jpg'),
		address: '금호동',
		distance: '5KM',
		review_point: '777',
		review_grade: '2.2',
		reserve: true,
		line: true
	}, {
		link: '/order/myOrderDetail/waiting',
		store_name: '줄서기링크',
		thumbnail: require('assets/images/thumb/slide5.jpg'),
		address: '자양동',
		distance: '500M',
		review_point: '22,222',
		review_grade: '1.1',
		reserve: false,
		line: false
	}, {
		link: '/',
		store_name: '빌리엔젤',
		thumbnail: require('assets/images/thumb/slide6.jpg'),
		address: '삼성동',
		distance: '5KM',
		review_point: '348',
		review_grade: '4.2',
		reserve: true,
		line: false
	}
]
const MyOrderList = ({
	...props
}) => {
	const { type } = useParams();
	const [storeListSortType, setStoreListSortType] = useState(0); //1:별점순,2:거리순,3:리뷰많은순,4:신규등록순
	return (
		<div className="container">
			<div className="myOrderList">
				{
					type === 'reserWaiting'
					&&
					<div className="molSortSelect clearfix">
						<div className="innerWrap">
							<div className="FLR TXTR">
								<UiSorting radioList={['예약 / 줄서기', '예약', '줄서기']} />
							</div>
						</div>
					</div>
				}
				<div className="molSort">
					<div className="innerWrap">
						<div className="molSortInner">
							<div className="molBtns"><UiButton className={`inline xs shadowNone ${storeListSortType === 0 ? 'red' : 'outline'}`} onClick={() => setStoreListSortType(0)}>별점순</UiButton></div>
							<div className="molBtns"><UiButton className={`inline xs shadowNone ${storeListSortType === 1 ? 'red' : 'outline'}`} onClick={() => setStoreListSortType(1)}>거리순</UiButton></div>
							<div className="molBtns"><UiButton className={`inline xs shadowNone ${storeListSortType === 2 ? 'red' : 'outline'}`} onClick={() => setStoreListSortType(2)}>리뷰많은순</UiButton></div>
							<div className="molBtns"><UiButton className={`inline xs shadowNone ${storeListSortType === 3 ? 'red' : 'outline'}`} onClick={() => setStoreListSortType(3)}>신규등록순</UiButton></div>
						</div>
					</div>
				</div>
				<ul className="plList">

					{
						thumbImgStore.map((item, index) => {
							return (
								<li className="plTp" key={index}>
									<div className="inner">

										<Link to={item.link}>
											<div className="thumbnail">
												<img src={item.thumbnail} alt="" />
											</div>
										</Link>
										<div className="detailSlide">
											<Link to={item.link}>
												<div className="title">{item.store_name}</div>
												<div className="info">
													<div>
														<span>{item.address}</span>
														<span className="num">{item.distance}</span>
													</div>
													<div>리뷰 <span className="num"> {item.review_point} </span> </div>
												</div>
												<div className="rightInfo">
													<div className="star"><span>{item.review_grade}<img src={require(`assets/images/common/icoStar.png`)} alt=""/></span></div>
													<div className="able">
														{item.reserve && <span>예약 가능</span>}
														{item.line && <span>줄서기 가능</span>}
													</div>
												</div>
											</Link>
										</div>

									</div>
								</li>
							)
						})
					}


				</ul>
			</div>
		</div>
	)
}
export default MyOrderList;