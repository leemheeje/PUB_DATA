import React, { useState, useEffect } from 'react';
import { useParams } from "react-router-dom";
import { RegExpFormat } from 'regexp';

//COMPONENTS
import MyHistoryDetail from 'pages/mypage/MyHistoryDetail';
import UiSorting from 'components/UiSorting'
import UiLink from 'components/UiLink'

//STYLES
import 'assets/css/myPage.scss';

const MyHistory = () => {
	let { historyDetail } = useParams();

	const radioList = ['모두 보기', '포장주문', '예약', '줄서기', '테이블주문', '키오스크']
	const review_state = {
		review_writing: 1,		// 리뷰 작성
		review_expiration: 2,		// 리뷰 작성 기간 만료
		review_written: 3,			// 내가 작성한 리뷰
	}
	const use_history_list = [		//테스트를 위한 값입니다 초기값은 [] 입니다.
		{
			store_service: '예약',
			store_name: '빈체로 파스타 안산 중앙점',
			date: 20200421,
			review: review_state.review_writing
		},
		{
			store_service: '포장주문',
			store_name: '카페달미 (Cafe Dalmi)',
			date: 20200420,
			review: review_state.review_expiration
		},
		{
			store_service: '줄서기',
			store_name: '반포쌀국수 잠원점',
			date: 20200418,
			review: review_state.review_written
		},
		{
			store_service: '키오스크',
			store_name: '첫번째 커피',
			date: 20200417,
			review: review_state.review_written
		},
		{
			store_service: '테이블주문',
			store_name: '베네핏',
			date: 20200415,
			review: review_state.review_written
		},
	]

	const [listId, setListId] = useState(0) // 리스트 페이지 index State
	const handlerListClick = (idx) => {
		setListId(idx)
	}

	return (
		<div className="container mypage">
			<div className="myHistoryWrap">
				<UiSorting radioList={radioList} />
				<ul className="historyList">
					{
						use_history_list.map((list, index) => {
							return (
								<li className="list" key={index}>
									<div className="storeService">
										<div className={
											list.store_service === '포장주문' ?  'icon icon1'
												:
												list.store_service === '예약' ? 'icon icon2'
													:
													list.store_service === '줄서기' ? 'icon icon3'
														:
														list.store_service === '테이블주문' ? 'icon icon4'
															: 'icon icon5'
										}>
											{
												list.store_service === '포장주문' ?  <img src={require(`assets/images/common/icoFuncOn01.png`)} alt=""/>
												:
												list.store_service === '예약' ? <img src={require(`assets/images/common/icoFuncOn02.png`)} alt=""/>
													:
													list.store_service === '줄서기' ? <img src={require(`assets/images/common/icoFuncOn03.png`)} alt=""/>
														:
														list.store_service === '테이블주문' ? <img src={require(`assets/images/common/icoFuncOn04.png`)} alt=""/>
															: <img src={require(`assets/images/common/icoFuncOn05.png`)} alt=""/>
											}
										</div>
										<div className="service">{list.store_service}</div>
									</div>
									<div className="storeName">{list.store_name}</div>
									<div className="date">
										{RegExpFormat(list.date, 'date')}
									</div>
									<div className="btnWrap">
										<div className="btnLeft">
											{
												list.review === 1 ?
													<UiLink className="init" to="/review">리뷰 작성</UiLink>
													: list.review === 2 ?
														<UiLink className="init disabled" to="#;">리뷰 작성 기간 만료</UiLink>
														: <UiLink className="init" to="/mypage/myReview">내가 작성한 리뷰</UiLink>
											}
										</div>
										<div className="btnRight">
											<UiLink className="init" to={
												list.store_service === '포장주문' ? '/payment/myPaymentDetail/package'
													:
													list.store_service === '줄서기' ? '/payment/myPaymentDetail/waitingComplete'
															: '/payment/myPaymentDetail/reser'
											} onClick={() => handlerListClick(index)}>이용 내역 상세</UiLink>
									</div>
									</div>
								</li>
							)
						})
					}
				</ul>
		</div>
		</div >
	)
}
export default MyHistory;