import React, { useState, useEffect } from 'react';

// COMPONENTS
import MyBenefitTabsCoupon from 'pages/mypage/MyBenefitTabsCoupon';
import MyBenefitTabsPoint from 'pages/mypage/MyBenefitTabsPoint';

//STYLES
import 'assets/css/myPage.scss';
const benefit_coupon = [		//테스트를 위한 값입니다 초기값은 [] 입니다.
	{
		link: '#;',
		store_name: '카페달미 (Cafe Dalmi)',
		title: '[2주년감사쿠폰] 자몽 에이드 제공',
		period_start: 20200421,
		period_end: 20200430,
		use: '기한만료'
	},
	{
		link: '#;',
		store_name: '고떡 고기떡볶이',
		title: '[4.19 이벤트] 날치알주먹밥 제공',
		period_start: 20200419,
		period_end: 20200430,
		use: '사용완료'
	},
	{
		link: '#;',
		store_name: '반포쌀국수 잠원점',
		title: '[반포쌀국수 고객감사쿠폰] 10% 할인',
		period_start: 20200415,
		period_end: 20200430,
		use: '사용완료'
	},
	{
		link: '#;',
		store_name: '강남면옥 선릉점',
		title: '[재방문 이벤트] 3,000원 할인',
		period_start: 20200415,
		period_end: 20200430,
		use: ''
	},
	{
		link: '#;',
		store_name: '깽스떡볶이',
		title: '[4월이벤트] 4,444원 할인',
		period_start: 20200404,
		period_end: 20200430,
		use: ''
	},
	{
		link: '#;',
		store_name: '신전떡볶이 삼성청담점',
		title: '[새학기이벤트] 튀김만두 제공',
		period_start: 20200401,
		period_end: 20200430,
		use: ''
	},
	{
		link: '#;',
		store_name: '타코 칸타빌레',
		title: '[특별 할인쿠폰] 5,000원 할인',
		period_start: 20200401,
		period_end: 20200430,
		use: ''
	},
	{
		link: '#;',
		store_name: '롯데스낵바',
		title: '[신규 입점 이벤트] 10%원 할인',
		period_start: 20200315,
		period_end: 20200430,
		use: ''
	},
]

const benefit_point = [		//테스트를 위한 값입니다 초기값은 [] 입니다.
	{
		link: '/order/myOrderDetail/menu',
		img: require(`assets/images/thumb/storeThumb1.jpg`),
		store_name: '포장주문',
		date: 20200421,
		point: 2200
	},
	{
		link: '/order/myOrderDetail/reser',
		img: require(`assets/images/thumb/storeThumb2.jpg`),
		store_name: '예약',
		date: 20200420,
		point: 2200
	},
	{
		link: '/order/myOrderDetail/waiting',
		img: require(`assets/images/thumb/storeThumb3.jpg`),
		store_name: '줄서기',
		date: 20200418,
		point: 3000
	},
	{
		link: '/order/myOrderDetail/orderTable',
		img: require(`assets/images/thumb/storeThumb4.jpg`),
		store_name: '테이블주문',
		date: 20200417,
		point: 1600
	},
	{
		link: '/order/myOrderDetail/menu',
		img: require(`assets/images/thumb/storeThumb5.jpg`),
		store_name: '베네핏',
		date: 20200415,
		point: 5000
	},
]
const MyBenefit = () => {
	const [couponNum, setCouponNum] = useState(0);  // 사용 가능한 쿠폰 수 State
	const [couponEndNum, setCouponEndNum] = useState(0);  // 사용 불가능한 쿠폰 수 State
	const [point, setPoint] = useState(benefit_point);  // 사용 가능한 쿠폰 수 State
	const [benefitTabsActive, setBenefitTabsActive] = useState(0);


	useEffect(() => {
		var num = 0;
		var num2 = 0;
		for (var i = 0; i < benefit_coupon.length; i++) {
			if (benefit_coupon[i].use === '') {
				num += 1;
				setCouponNum(num)
			} else {
				num2 += 1;
				setCouponEndNum(num2)
			}
		}
	}, [])



	return (
		<div className="container mybenefit">

			<div className="myBenefitWrap">
				<div className="benefitTabs">
					<ul className="baseTab">
						<li className={benefitTabsActive === 0 ? 'active' : ''} onClick={() => setBenefitTabsActive(0)}><span>보유 쿠폰  ( <span className="roboto">{couponNum}</span> )</span></li>
						<li className={benefitTabsActive === 1 ? 'active' : ''} onClick={() => setBenefitTabsActive(1)}><span>보유 포인트</span></li>
					</ul>
					<div className="diviTabs">
						{console.log(couponNum)}
						{
							benefitTabsActive === 0
								?
								<>
									<button onClick={() => setCouponNum(0)}>쿠폰없을때</button>
									<MyBenefitTabsCoupon benefit_coupon={benefit_coupon} couponNum={couponNum} couponEndNum={couponEndNum} />
								</>
								:
								<>
									<button onClick={() => setPoint([])}>포인트없을때</button>
									<MyBenefitTabsPoint benefit_point={point} />
								</>
						}
					</div>
				</div>
			</div>
		</div>
	)
}
export default MyBenefit;