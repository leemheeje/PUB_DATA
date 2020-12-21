import React, { useState, useEffect } from 'react';
import {RegExpFormat} from 'regexp';

//COMPONENTS
import UiCountAddRem from 'components/UiCountAddRem';
import UiButton from 'components/UiButton';

//STYLES
import 'assets/css/myCart.scss';

const MyCartListOrder = props => {
	const {
		cart_index,
		title,
		price,
		count,
		options,
		totalPrice,
		couponApply,
		handlerOrderSubmit,
		..._props
	} = props;
	const [totalMenuPrice, setTotalMenuPrice] = useState(totalPrice);
	const [totalCount, setTotalCount] = useState(count);
	const [couApply, setCouApply] =useState(couponApply);

	useEffect(() => {
		setCouApply(couponApply)
	}, [couponApply])

	var opTotalPrice = 0;
	for(var i = 0; i < options.length; i++) {
		opTotalPrice += options[i].value;
	}

	const handlerCountAddPrice = (count) => {
		var changeCount = count;
		var toPrice = (price + opTotalPrice) * changeCount;

		handlerCartSubmit(changeCount, toPrice);
	}

	const handlerCartSubmit = (changeCount, toPrice) => {
		setTotalCount(changeCount);
		setTotalMenuPrice(toPrice);
		handlerOrderSubmit({
			..._props,
			orderIndex: cart_index,
			orderPrice: toPrice,
			orderCount: changeCount
		});
	}

	return (
		<>
			<div className="orderTitle">
				{title}
			</div>
			<div className="orderPrice">
				<span>기본 금액 : </span> <span className="roboto">{RegExpFormat(price, 'comma')}</span><span>원</span>
			</div>
			<div className="orderOptions">
				{
					options.length > 0 ?
					<>
						<span>추가 옵션 : </span>
						{
							options.map((option, index) => {
								return (
									<span className="options" key={index}>
										<span>{option.label}</span> <span>(<span className="roboto">{option.value}</span>원) </span>
									</span>
								)
							})
						}
						</>
					:
					undefined
				}
			</div>
			<div className="control">
				<UiCountAddRem count={count} watchCount={handlerCountAddPrice} />
			</div>
			<div className="totalPrice">
				<span className={couApply === cart_index ? 'price active' : 'price'}>
					<span className="roboto">{RegExpFormat(totalMenuPrice, 'comma')}</span>
					<span className="won">원</span>
				</span>
				<span className={couApply === cart_index ? 'couponApplyText active' : 'couponApplyText'}>
				<span className="txt1 roboto">{totalPrice - price}</span><span className="won">원</span>
					<span className="txt2">쿠폰 적용</span>
				</span>
			</div>
			<div className="carListDeleteBtn">
				<UiButton className="init">
					<img src={require(`assets/images/common/icoSearchClose.png`)} alt="삭제"/>
				</UiButton>
			</div>
			
		</>
	)
}
export default MyCartListOrder;