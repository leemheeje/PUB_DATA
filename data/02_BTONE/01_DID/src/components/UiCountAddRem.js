import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
//SCSS
import '../assets/css/UiCountAddRem.scss';

const defaultProps = {
	count: 1,
	max_count: 30,
	min_count: 1,
	watchCount:()=>{}
};
const propTypes = {
	count: PropTypes.number,
	max_count: PropTypes.number,
	min_count: PropTypes.number,
	watchCount:PropTypes.func
};

const UiCountAddRem = props => {
	const {watchCount, ...as_props} = props;
	
	const [countAddRemove, setCountAddRemove] = useState(as_props);
	const handlerCountAddRemove = gubun => {
		setCountAddRemove({
			...countAddRemove,
			count: gubun ? countAddRemove.count + 1 : countAddRemove.count - 1
		});
	}
	useEffect(()=>{
		watchCount(countAddRemove.count, as_props.cart_index);
	},[countAddRemove.count]);
	return (
		<div className={`uiFormCount ${
			countAddRemove.count < countAddRemove.min_count
			&& 'uiFormGray'
		}`}>

			<button className="rem" disabled={
				countAddRemove.count <= countAddRemove.min_count ? true : false
			} onClick={() => handlerCountAddRemove(false)}>빼기</button>

			<input type="text" className="ufcInput roboto" value={countAddRemove.count} readOnly />

			<button className="add" disabled={
				countAddRemove.count >= countAddRemove.max_count ? true : false
			} onClick={() => handlerCountAddRemove(true)}>추가하기</button>

		</div>
	)
}

UiCountAddRem.defaultProps = defaultProps;
UiCountAddRem.propTypes = propTypes;

export default UiCountAddRem;
