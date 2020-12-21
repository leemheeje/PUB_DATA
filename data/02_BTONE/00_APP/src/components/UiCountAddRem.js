import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
//SCSS
import '../assets/css/uiCountAddRem.scss';

const defaultProps = {
	count: 1,
	max_count: 30,
	min_count: 1,
	watchCount: () => { }
};
const propTypes = {
	count: PropTypes.number,
	max_count: PropTypes.number,
	min_count: PropTypes.number,
	watchCount: PropTypes.func
};

const UiCountAddRem = props => {
	const { watchCount, ...as_props } = props;

	const [countAddRemove, setCountAddRemove] = useState(as_props);
	const handlerCountAddRemove = gubun => {
		setCountAddRemove({
			...countAddRemove,
			count: gubun ? countAddRemove.count + 1 : countAddRemove.count - 1
		});
	}
	useEffect(() => {
		watchCount(countAddRemove.count, as_props.cart_index);
		
		console.log(countAddRemove);
	}, [countAddRemove.count]);
	return (
		<div className={`uiFormCount ${
			countAddRemove.count < countAddRemove.min_count
			&& 'uiFormGray'
			}`}>

			<button className="rem" disabled={
				countAddRemove.count <= countAddRemove.min_count ? true : false
			} onClick={() => handlerCountAddRemove(false)}>
				<img src={require(`assets/images/common/icoMinWhite.png`)} className="on" alt="빼기"/>
				<img src={require(`assets/images/common/icoMinGray.png`)} className="disabled" alt="빼기비활성"/>
			</button>

			<input type="text" className="ufcInput roboto" style={{pointerEvents: 'none'}} value={countAddRemove.value || countAddRemove.count} readOnly />

			<button className="add" disabled={
				countAddRemove.count >= countAddRemove.max_count ? true : false
			} onClick={() => handlerCountAddRemove(true)}>
				<img src={require(`assets/images/common/icoPlusWhite.png`)} className="on" alt="추가하기"/>
				<img src={require(`assets/images/common/icoPlusGray.png`)} className="disabled" alt="추가하기비활성"/>
			</button>

		</div>
	)
}

UiCountAddRem.defaultProps = defaultProps;
UiCountAddRem.propTypes = propTypes;

export default UiCountAddRem;
