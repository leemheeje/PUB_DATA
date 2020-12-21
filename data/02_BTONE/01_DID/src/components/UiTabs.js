import React from 'react';
import PropTypes from 'prop-types';

//SCSS
import '../assets/css/UiTabs.scss';


const defaultProps = {
	children: []
}
const propTypes = {
	children: PropTypes.oneOfType([
		PropTypes.array,
		PropTypes.string,
		PropTypes.number,
		PropTypes.object,
	])
}

const UiTabs = props => {
	let tabsAllLength = () => {
		let al = 0;
		let children = props.children;
		if (typeof children === 'object' && Array.isArray(children)) {
			al = children.length;
		} else {
			al = 1;
		}
		return al;
	}
	return (
		<div className={
			`uiTabs tpLength${tabsAllLength()} ${
			props.size ? props.size : ''
			}`
		}>
			{
				typeof props.children === 'object' && Array.isArray(props.children)
					? props.children.map((list, index) => {
						let isFirst = index === 0 ? 'first' : '';
						let isLast = props.children.length - 1 === index ? 'last' : '';
						return <div className={`uiList tp${index} ${isFirst} ${isLast}`} key={index}>{list}</div>
					})
					: <div className="uiList tp0">{props.children}</div>
			}
		</div>
	)
}

UiTabs.defaultProps = defaultProps;
UiTabs.propTypes = propTypes;

export default UiTabs;