import React, { useState, useEffect } from 'react';
import { useParams, useHistory } from 'react-router';

//COMPONENTS
import UiSwiper from 'components/UiSwiper';
import UiLink from 'components/UiLink';
import UiButton from 'components/UiButton';

//PAGES
import MyOrderTabsMenu from 'pages/order/MyOrderTabsMenu';
import MyOrderTabsInfo from 'pages/order/MyOrderTabsInfo';
import MyOrderTabsReview from 'pages/order/MyOrderTabsReview';

//STYLES
import 'assets/css/myOrderDetail.scss';

const MyOrderDetail = ({
	link,
	store_name = '매장명을 입력해주세요',
	store_service = {
		packingorder: true,		//포장주문
		reservation: true,		//예약
		waiting: true,			//줄서기
		tableorder: true,		//테이블주문
	},
	store_favorit_menu = [		//테스트를 위한 값입니다 초기값은 [] 입니다.
		{
			link: '/order/option',
			img: require(`assets/images/thumb/banner2.png`),
			title: '흑임자슈페너 (Only Iced)',
			text: '달미의 시그니처 크림과 고소한 흑임자의 콜라보레이션 달미의 시그니처 크림과 고소한 흑임자의 콜라보레이션',
			price: '5,800',
		},
		{
			link: '/order/option',
			img: require(`assets/images/thumb/banner3.png`),
			title: '죠리퐁 쉐이크',
			text: '달미 시그니처 / 남녀노소 좋아하는 달콤고소 쉐이크 달미의 시그니처 크림과 고소한 흑임자의 콜라보레이션',
			price: '5,300',
		},
		{
			link: '#;',
			img: require(`assets/images/thumb/banner2.png`),
			title: '흑임자슈페너 (Only Iced)',
			text: '달미의 시그니처 크림과 고소한 흑임자의 콜라보레이션',
			price: '5,800',
		},
		{
			link: '#;',
			img: require(`assets/images/thumb/banner3.png`),
			title: '죠리퐁 쉐이크',
			text: '달미 시그니처 / 남녀노소 좋아하는 달콤고소 쉐이크',
			price: '5,300',
		}
	],
	store_all_menu = [			//테스트를 위한 값입니다 초기값은 [] 입니다.
		{
			category_name: '커피',
			result: [
				{
					link: '/order/option',
					list_name: '아메리카노',
					list_description: '적절한 산미로 어떤 디저트와도 잘 어울리는 달미 아메리카노잘 어울리는 달미 아메리카노잘 어울리는 달미 아메리카노',
					list_thumbnail: require(`assets/images/thumb/thumb223.png`),
					list_price: 53000
				},
				{
					link: '/order/option',
					list_name: '라떼',
					list_description: '적절한 산미로 어떤 디저트와도 잘 어울리는 달미 아메리카노잘 어울리는 달미 아메리카노잘 어울리는 달미 아메리카노',
					list_price: 1598
				}
			]
		},
		{
			category_name: '계절생과일주스',
			result: [
				{
					link: '/order/option',
					list_name: '건강한 계절생과일주스',
					list_description: '적절한 산미로 어떤 디저트와도 잘 어울리는 달미 아메리카노잘 어울리는 달미 아메리카노잘 어울리는 달미 아메리카노',
					list_price: 35689
				},
			]
		}
	],
	store_info = {				//테스트를 위한 값입니다 초기값은 {} 입니다.
		store_name: '매장명을 입력해주세요',
		address: {
			value: '경기 안산시 단원구 석수로 138(선부동선부동선부동선부동선부동) ',
			map: true
		},
		business_hours: '13',
		store_contact: '010',
		store_description: '달콤 쌉싸름한 그린티와 에스프레소가 만났다! 마니아들만 안다는 비 밀의 레시피',
		business_owner: '비티원',
		business_license: '1616-464',
	},
	store_review = [			//테스트를 위한 값입니다 초기값은 [] 입니다.
		{
			thumbnail: require('assets/images/thumb/sample.jpg'),
			name: '5454',
			description: `미리 주문하고 찾으러 가니까 너무 편하고 좋아요!
			커피랑 디저트도 정말 맛있었어요. 흑임자 슈페너 짱! 감사합니다!!
			와플이 너무 먹고싶어서 처음 주문해봤는데 크림이 혜자네요...ㅎㅎㅎ
			재료 안아끼고 듬뿍 넣어주셔서 맛있게 잘 먹었습니`,
			date: 20101010,
			type: '포장주문',
			review_grade: 4,
			review_image_files: [require('assets/images/thumb/banner3.png')],
		},
		{
			thumbnail: require('assets/images/thumb/sample.jpg'),
			name: 'asdfasdf1',
			description: `good`,
			date: 16161611,
			type: '포장주문',
			review_grade: 1,
			review_image_files: [],
		}
	],
	thumbnail,
	address,
	distance,
	review_point = 748,
	review_grade = 4.5,
	...props
}) => {
	const { type } = useParams();
	const history = useHistory();
	const [usStoreService, setUsStoreService] = useState(store_service);
	const [isStoreAfter, setIsStoreAfter] = useState(false);
	const [isPreparingService, setIsPreparingService] = useState(false);
	const [orderTabsActive, setOrderTabsActive] = useState(0); //탭활성화 부분 0 : 메뉴,1:매장정보,2:리뷰
	const [isCart, setIsCart] = useState(0); //장바구니에 담긴것이 잇을때
	let scrollFixedGubun = true;
	useEffect(() => {
		//스크롤시 특정영역에서 탭 고정
		let scrollFixedTarget = document.querySelector('.orderTabs');
		let scrollHeaderTarget = document.querySelector('.header');
		window.addEventListener('scroll', event => {
			if (!scrollFixedGubun) return true;
			let _this = event.currentTarget;
			let scrollValue = _this.scrollY;
			let scrollBottom = document.body.offsetHeight - _this.innerHeight;

			if ((scrollValue + scrollHeaderTarget.clientHeight) >= scrollFixedTarget.offsetTop) {
				document.body.classList.add('fixedTabs');
			} else {
				document.body.classList.remove('fixedTabs');
			}
			if (_this.scrollY >= scrollBottom) { //스크롤이 끝에 도달할때
				document.body.classList.add('scrollBottom');
			} else {
				document.body.classList.remove('scrollBottom');
			}
		});
		return () => {
			scrollFixedGubun = false;
			if (document.body.classList.value.indexOf('fixedTabs') != -1) {
				document.body.classList.remove('fixedTabs');
			}
			if (document.body.classList.value.indexOf('scrollBottom') != -1) {
				document.body.classList.remove('scrollBottom');
			}
		};
	}, []);
	useEffect(() => {
		if (type === 'menu') {
			setUsStoreService({
				...{}, ...{
					packingorder: true,	//포장주문
					reservation: false,		//예약
					waiting: false,			//줄서기
					tableorder: false,		//테이블주문
				}
			});
			setOrderTabsActive(0); //메뉴 탭 활성화
		} else if (type === 'reser') {
			setUsStoreService({
				...{}, ...{
					packingorder: false,	//포장주문
					reservation: true,		//예약
					waiting: false,			//줄서기
					tableorder: false,		//테이블주문
				}
			});
			setOrderTabsActive(1); //매장정보 탭 활성화
		} else if (type === 'waiting') {
			setUsStoreService({
				...{}, ...{
					packingorder: false,	//포장주문
					reservation: false,		//예약
					waiting: true,			//줄서기
					tableorder: false,		//테이블주문
				}
			});
			setOrderTabsActive(1); //매장정보 탭 활성화
		} else if (type === 'orderTable') {
			setUsStoreService({
				...{}, ...{
					packingorder: false,	//포장주문
					reservation: false,		//예약
					waiting: false,			//줄서기
					tableorder: true,		//테이블주문
				}
			});
			setOrderTabsActive(0); //메뉴 탭 활성화
		} else if (type === 'reserWaiting') {
			setUsStoreService({
				...{}, ...{
					packingorder: false,	//포장주문
					reservation: true,		//예약
					waiting: true,			//줄서기
					tableorder: false,		//테이블주문
				}
			});
			setOrderTabsActive(1); //매장정보 탭 활성화
		}
	}, [type]);

	return (
		<div className={`container PDB0 ${
			type !== 'menu' && type !== 'orderTable'
				? 'inBottomBtns'
				: ''
			}`}>
			<button onClick={() => setIsCart(30)}>장바구니에 담긴물품이 있을때</button>
			<button onClick={() => setIsCart(0)}>장바구니에 담긴물품이 없을때</button>
			<button onClick={() => setIsPreparingService(true)}>서비스준비중일때</button>

			<div className="orderWrap">
				<div className="orderTop">
					<div className="orderTopSlide">
						<UiSwiper imgList={
							[require(`assets/images/thumb/slide1.jpg`), require(`assets/images/thumb/slide2.jpg`), require(`assets/images/thumb/slide3.jpg`)]
						} />
					</div>

					<div className="orderTopInfo">
						<div className="innerWrap">
							<div className="tit">{store_name}</div>
							<div className="review" onClick={() => setOrderTabsActive(2)}>
								<span className="grade roboto">
									{review_grade}
									<img src={require(`assets/images/common/icoStar.png`)} alt="" />
								</span>
								<span className="point">
									<span className="lb">리뷰</span>
									<span className="roboto">{review_point}</span>
								</span>
							</div>
							<div className="storeService">
								<div className="lst">
									<div className="sstp">
										<div onClick={() => history.push('/order/myOrderDetail/menu')} className={`opt packingorder ${usStoreService.packingorder ? 'active' : ''}`}>
											{
												usStoreService.packingorder
													? <img src={require(`assets/images/common/icoFuncOn01.png`)} alt="" />
													: <img src={require(`assets/images/common/icoFuncOff01.png`)} alt="" />
											}
											포장주문
										</div>
									</div>
									{
										type !== 'menu' && type !== 'orderTable'
											?
											<>
												<div className="sstp">
													<div onClick={() => history.push('/order/myOrderDetail/reser')} className={`opt reservation ${usStoreService.reservation ? 'active' : ''}`}>
														{
															usStoreService.reservation
																? <img src={require(`assets/images/common/icoFuncOn02.png`)} alt="" />
																: <img src={require(`assets/images/common/icoFuncOff02.png`)} alt="" />
														}
														예약
													</div>
												</div>
												<div className="sstp">
													<div onClick={() => history.push('/order/myOrderDetail/waiting')} className={`opt waiting ${usStoreService.waiting ? 'active' : ''}`}>
														{
															usStoreService.waiting
																? <img src={require(`assets/images/common/icoFuncOn03.png`)} alt="" />
																: <img src={require(`assets/images/common/icoFuncOff03.png`)} alt="" />
														}
														줄서기
													</div>
												</div>
											</>
											: ''
									}
									<div className="sstp">
										<div onClick={() => history.push('/order/myOrderDetail/orderTable')} className={`opt tableorder ${usStoreService.tableorder ? 'active' : ''}`}>
											{
												usStoreService.tableorder
													? <img src={require(`assets/images/common/icoFuncOn04.png`)} alt="" />
													: <img src={require(`assets/images/common/icoFuncOff04.png`)} alt="" />
											}
											테이블주문
										</div>
									</div>
								</div>
							</div>
						</div>
					</div>

				</div>
				<div className="orderTabs">
					<ul className="baseTab">
						<li className={orderTabsActive === 0 ? 'active' : ''} onClick={() => setOrderTabsActive(0)}><span>메뉴</span></li>
						<li className={orderTabsActive === 1 ? 'active' : ''} onClick={() => setOrderTabsActive(1)}><span>매장 정보</span></li>
						<li className={orderTabsActive === 2 ? 'active' : ''} onClick={() => setOrderTabsActive(2)}><span>리뷰</span></li>
					</ul>
					<div className="diviTabs">
						{
							orderTabsActive === 0
								?
								<>
									<MyOrderTabsMenu store_favorit_menu={store_favorit_menu} store_all_menu={store_all_menu} />
									{
										isCart && (type === 'menu' || type === 'orderTable')
											?
											<UiLink to="/payment/mycart/menu" className="init orderCart">
												<img src={require(`assets/images/common/icoCart.png`)} alt=""/>
												<div className="inner roboto">{isCart}</div>
											</UiLink>
											: ''
									}
								</>
								: orderTabsActive === 1
									? <MyOrderTabsInfo store_info={store_info} />
									: orderTabsActive === 2
										? <MyOrderTabsReview store_review={store_review} />
										: ''
						}

					</div>
				</div>


				{
					type !== 'menu' //파라미터가 메뉴로 들어오면 하단 버튼 X
						?
						usStoreService.reservation && usStoreService.waiting
							?
							<div className="bottomBtnsWrap">
								<div className="innerWrap">
									<button onClick={() => setIsStoreAfter(true)}>매장방문후</button>
									<button onClick={() => setIsStoreAfter(false)}>매장방문전</button>
									<div className="uiRow">
										<div className="uiCol6">
											<UiLink>예약</UiLink>
										</div>
										<div className="uiCol6">
											{
												isStoreAfter
													?
													<UiLink>줄서기</UiLink>
													:
													<UiButton className="smpd" disabled>
														<div className="FWN">
															줄서기
															<span>(매장 방문 후 이용 가능)</span>
														</div>
													</UiButton>
											}


										</div>
									</div>
								</div>
							</div>
							: usStoreService.reservation
								?
								<div className="bottomBtnsWrap">
									<div className="innerWrap">
										<div className="uiRow">
											<div className="uiCol12">
												<UiLink>예약</UiLink>
											</div>
										</div>
									</div>
								</div>
								: usStoreService.waiting
									?
									<div className="bottomBtnsWrap">
										<div className="innerWrap">
											<button onClick={() => setIsStoreAfter(true)}>매장방문후</button>
											<button onClick={() => setIsStoreAfter(false)}>매장방문전</button>
											<div className="uiRow">
												<div className="uiCol12">
													{
														isStoreAfter
															?
															<UiLink>줄서기</UiLink>
															:
															<UiButton disabled>
																<div className="FWN">
																	줄서기
															<span>(매장 방문 후 이용 가능)</span>
																</div>
															</UiButton>
													}

												</div>
											</div>
										</div>
									</div>
									: ''
						: ''


				}
				{
					isPreparingService
						? <div className="preService"> 현재 서비스 준비 중입니다 </div>
						: ''
				}


			</div>
		</div>
	)
}
export default MyOrderDetail;