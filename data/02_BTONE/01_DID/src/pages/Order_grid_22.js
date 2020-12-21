import React, { useState, useEffect } from 'react';
import UiTopBanner from 'components/UiTopBanner';
import Category from 'components/Category';
import ProductPop from 'components/ProductPop';
import UiItem from 'components/UiItem';
import UiCountAddRem from '../components/UiCountAddRem';
import UiSwiper from 'components/UiSwiper';
import UiButton from 'components/UiButton';
import { RegExpFormat } from '../regexp';

import 'assets/css/order.scss';

//가짜데아타
import dummy_data from '../dummy_data'



let cartListIndex = 0;
const Order22 = props => {
	const productMenuListGroupColRow = [2, 2]; //메뉴목록을 3*3 으로
	const [prdVisible, setPrdVisible] = useState('')
	const [productCategoryList, setProductCategoryList] = useState(['일이삼사오육칠팔구십일이삼사오육칠팔구십', '가나다라마바사아자차', '데모-치킨', '데모-피자', '데모-돈까스', '데모-족발']);
	const [productMenuList, setProductMenuList] = useState(dummy_data[0]);
	const [productCartList, setProductCartList] = useState([]);
	const [productMenuListGroup, setProductMenuListGroup] = useState([]);
	const [productDetailListGroup, setProductDetailListGroup] = useState(null);
	const [totalMenuPrice, setTotalMenuPrice] = useState(0);

	const prdShow = () => {
		setPrdVisible('active');
	}
	const prdClose = () => {
		setPrdVisible('');
		setProductDetailListGroup(null);
	}

	const handlerCategoryParse = catgory_gubun => {
		setProductMenuList(dummy_data[catgory_gubun]);
	}

	const handlerDetailParse = params => {
		prdShow();
		let { fnEventHandler, ...as_params } = params;
		setProductDetailListGroup(as_params);
	}
	const handlerBesketSubmit = params => {
		setProductCartList([...productCartList, ...[{
			...params,
			cart_index: cartListIndex
		}]]);
		cartListIndex++;
	}
	const handlerCountAddPrice = (changeCount, cart_index) => {
		if (productCartList.length) {
			let _totalMenuPrice = productCartList[cart_index].totalMenuPrice;
			let count = productCartList[cart_index].count;
			productCartList[cart_index].count = changeCount;
			productCartList[cart_index].totalMenuPrice = _totalMenuPrice / count * changeCount;
		}
		setProductCartList([...productCartList]);
	}
	const handlerCartItemDelected = index => {
		let allValueCheck = false;
		productCartList[index] = false;
		productCartList.forEach(item => {
			if (item) {
				allValueCheck = true;
			}
		});
		if (!allValueCheck) {
			setProductCartList([]);
			cartListIndex = 0;
		} else {
			setProductCartList([...productCartList]);
		}
	}

	useEffect(() => {
		let _data = productMenuList.data;
		let _array = [];
		let _index = -1;
		for (let i = 0; i < _data.length; i++) {
			if (i % (productMenuListGroupColRow[0] * productMenuListGroupColRow[1]) === 0) {
				_index++;
				_array[_index] = [];
			}
			_array[_index].push(_data[i]);
		}
		setProductMenuListGroup(_array);
	}, [productMenuList.data]);

	useEffect(() => {
		let total = 0;
		productCartList.forEach(item => {
			if (item) {
				total += item.totalMenuPrice;
			}
		});
		setTotalMenuPrice(total);
	}, [productCartList]);

	return (
		<div id="order">
			<UiTopBanner />
			<div className="tabSlide">
				<Category productCategoryList={productCategoryList} productCategoryListActiveName={productMenuList.category_name} fnEventHandler={handlerCategoryParse} />
			</div>

			{/* <div className="listWrap">
				<MenuList prdShow={prdShow} />
			</div> */}
			<div className="orderProductList">
				<div className="innerWrap">
					<div className="uiRow">
						<UiSwiper type="2" options={
							{
								shouldSwiperUpdate: true,
							}
						}>
							{
								productMenuListGroup.map((menuGroup, indexGroup) => {
									return (
										<div className="swiper-slide" key={indexGroup}>
											{
												menuGroup.map((menu, index) => {
													return (
														<div className={`uiCol${12 / productMenuListGroupColRow[0]}`} style={
															{
																width: `${100 / productMenuListGroupColRow[0]}%`
															}
														} key={index}>
															<UiItem size={
																productMenuListGroupColRow[0] === 1
																? 'row1'
																: productMenuListGroupColRow[0] === 2
																	? 'lg'
																	: productMenuListGroupColRow[0] === 3
																		? ''
																		: productMenuListGroupColRow[0] === 4
																			? 'sm'
																			: productMenuListGroupColRow[0] >= 5
																			? 'sm xs'
																			: ''
															} thumbnail_width_inherit={productMenuListGroupColRow[0] == 1 ? true : false} fnEventHandler={handlerDetailParse} {...menu} />
														</div>
													)
												})
											}
										</div>
									)
								})
							}

						</UiSwiper>
					</div>
				</div>
			</div>

			<div className="cartWrap">

				<div className="orderCartList">
					{/* <p className="listnone">상품을 추가해 주세요</p> */}
					{/* <CartBox /> */}
					<div className="innerWrap">
						<div className="uiRow">
							{
								productCartList.length
									? <UiSwiper options={
										{
											slidesPerView: 4,
											shouldSwiperUpdate: true,
											pagination: false
										}
									}>
										{
											productCartList.map((menu, index) => {
												let { menu_price, menu_options, ..._menu } = menu;
												menu_options && menu_options.forEach(option => {
													if (option) {
														menu_price += option.value;
													}
												})
												return menu ? (
													<div className="swiper-slide" key={index}>
														<div className="uiCol12">
															<UiItem {..._menu} menu_price={menu_price} size="sm" cart_index={menu.cart_index} fnEventHandlerDelected={handlerCartItemDelected} ui_count>
																<UiCountAddRem count={menu.count} cart_index={menu.cart_index} watchCount={handlerCountAddPrice} />
															</UiItem>
														</div>
													</div>
												) : <></>
											})
										}
									</UiSwiper>
									: <div className="nullmsg">상품을 추가해주세요.</div>
							}
						</div>
					</div>
				</div>

				<div className="priceWrap">
					<div className="innerWrap">
						<div className="inBox">
							<div className="pricetext">
								<span className="lb">총 결제금액</span>
								<p className="total">
									<span className="roboto">{RegExpFormat(totalMenuPrice, 'comma')}</span>
									<span className="won">원</span>
								</p>
							</div>
							<div className="btnWrap">
								<UiButton className="btns outline btnAllDel" onClick={() => {
									setProductCartList([]);
									cartListIndex = 0;
								}}>전체삭제</UiButton>
								<UiButton className="btns red shadow bold btnOrder" disabled={
									!productCartList.length ? true : false
								} onClick={() => props.history.push('/payment/payment_saving')}>주문하기</UiButton>
							</div>
						</div>
					</div>
				</div>

			</div>

			{/* 상품 팝업 */}
			<div className={`popVisible  ${prdVisible}`}>
				{
					productDetailListGroup && <ProductPop {...productDetailListGroup} handlerBesketSubmit={handlerBesketSubmit} prdClose={prdClose} />
				}
			</div>


		</div>
	)
}


export default Order22;