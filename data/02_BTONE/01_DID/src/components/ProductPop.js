import React, { useState, useEffect } from 'react';
import Form from '../components/Form';
import UiItem from '../components/UiItem';
import UiCountAddRem from '../components/UiCountAddRem';
import UiTabs from '../components/UiTabs';
import UiButton from '../components/UiButton';
import { CustomScrollBar } from 'react-custom-scrollbar';
import { RegExpFormat } from '../regexp';
import 'react-custom-scrollbar/lib/react-custom-scrollbar.css';
import '../assets/css/ProductPop.scss';

const ProductPop = props => {
	const {
		prdClose, //팝업 닫기
		description, //상품정보
		information, //영양정보(nutrition) 및 원산지(origin)
		menu_options,
		menu_basic,
		handlerBesketSubmit,
		size,
		..._props
	} = props;

	const [menuPrice, setMenuPrice] = useState(_props.menu_price);
	const [menuCount, setMenuCount] = useState(1);
	const [menuAddOptionsPrice, setMenuAddOptionsPrice] = useState(0);
	const handlerCountAddPrice = count => {
		setMenuCount(count);
		setMenuPrice(() => {
			return count * _props.menu_price + count * menuAddOptionsPrice;
		});
	}
	const handlerOptionsAddPrice = (event, addPrice, addLabel) => {
		if (event.target.checked) {
			setMenuAddOptionsPrice(menuAddOptionsPrice + addPrice);
			setMenuPrice(menuPrice + (addPrice * menuCount));
		} else {
			setMenuAddOptionsPrice(menuAddOptionsPrice - addPrice);
			setMenuPrice(menuPrice - (addPrice * menuCount));
		}
		menu_options && menu_options.forEach(option => {
			if (option.label == addLabel) {
				option[`add`] = event.target.checked;
			}
		});

	}
	const handlerSubmit = (event) => {

		let menuAddOptions = menu_options ? menu_options.map(option => {
			return option.add && option;
		}) : [];
		handlerBesketSubmit({
			..._props,
			menu_options: menuAddOptions,
			totalMenuPrice: menuPrice,
			count: menuCount
		});
		prdClose();
	}
	useEffect(() => {
		menu_options && menu_options.forEach(item => {
			if (typeof item.add !== 'undefined') {
				item['add'] = false;
			}
		});
	}, [])
	return (
		<div className="prdPop">
			<div className="in">
				<div className="popTop">
					<div className="itemBox">
						<UiItem size="lg" {..._props} ui_count>
							<UiCountAddRem count={menuCount} watchCount={handlerCountAddPrice} />
						</UiItem>
					</div>
					<div className="rtTxts">
						<div className="title">{description}</div>
						<div className="stitle">
							<CustomScrollBar
								allowOuterScroll={false}
								heightRelativeToParent="243px"
								onScroll={() => { }}
								addScrolledClass={true}
								freezePosition={false}
								handleClass="inner-handle"
								minScrollHandleHeight={38}
							>
								<div className="lb">세부정보</div>
								<ul className="lst">
									<li className="tp">
										<span className="slb">영양정보</span>
										<div className="txt">{information.nutrition}</div>
									</li>
									<li className="tp">
										<span className="slb">원산지</span>
										<div className="txt">{information.origin}</div>
									</li>
								</ul>
							</CustomScrollBar>
						</div>
					</div>
				</div>
				<div className="popBottom">
					<UiTabs size="lg">
						<a className="active">옵션추가</a>
					</UiTabs>
					<div className="popBottomInner">
						<CustomScrollBar
							allowOuterScroll={false}
							heightRelativeToParent="700px"
							onScroll={() => { }}
							addScrolledClass={true}
							freezePosition={false}
							handleClass="inner-handle"
							minScrollHandleHeight={38}
						>
							<div className="optionsTabs">
								<div className="optionsList">
									{
										menu_options && menu_options.map((option, index) => {
											return (
												<div style={{ marginBottom: `30px` }} key={index}>
													<Form
														type="checkbox"
														id={`chk${index}`}
														label={`${option.label} +${option.value}`}
														defaultChecked={false}
														onChange={event => handlerOptionsAddPrice(event, option.value, option.label)}
													/>
												</div>
											)
										})
									}
									{
										menu_basic && menu_basic.map((basic, index) => {
											return (
												<div key={index} style={{ marginBottom: `30px` }}>
													<div className="optLabel">{basic.label}</div>
													{
														basic.value.map((value, i) => {
															return (
																<Form
																	type="radio"
																	key={i}
																	className="inline"
																	name={`${basic.label}`}
																	id={`rdo${index}${i}`}
																	label={value}
																	defaultChecked={i == 0 ? true : false}
																// onChange={handlerOptionsAddPrice} 
																/>
															)
														})
													}
												</div>
											)
										})
									}
								</div>
							</div>
						</CustomScrollBar>
						{
							!menu_options && !menu_basic && <div className="nullmsg">선택 가능한 옵션이 없습니다.</div>
						}
						<div className="btnsWrap">
							<div className="uiRow">
								<div className="uiCol3">
									<UiButton className="btns lg outline block" onClick={prdClose}>취소</UiButton>
								</div>
								<div className="uiCol9">
									<div className="btnsGroup">
										<UiButton className="btns lg red block shadow">
											<span className="prc"> 총 <span className="roboto">{RegExpFormat(menuPrice, 'comma')}</span>원 </span>
											<span className="dn" onClick={handlerSubmit}>담기</span>
										</UiButton>
									</div>
								</div>
							</div>
						</div>
					</div>

				</div>

			</div>
			<div className="bg"></div>
		</div>
	);
};

export default ProductPop;