import React, { useEffect, useState, useRef } from 'react';

//STYLES
import '../assets/css/uiSelect.scss';

const UiSelect = ({
	id,
	name,
	label,
	className,
	children,
	value,
	onFailureMessage,
	failureMessage,
	onSuccessMessage,
	successMessage,
	onChange = () => { },
	...props
}) => {
	const [selectValue, setSelectValue] = useState('');
	const selectBox = useRef();
	useEffect(() => {
		let { selectedIndex } = selectBox.current;
		setSelectValue(selectBox.current[selectedIndex].innerText);
	}, []);
	const handlerSelectChange = event => {
		setSelectValue(selectBox.current[event.target.selectedIndex].innerText);
	}
	return (
		<div className={`uiSelect ${className} ${props.readOnly ? 'read-only' : ''}`}>
			{
				label
				&& <label htmlFor={id} className="lb">{label}</label>
			}
			<div className="ip">
				<div className="innt">{selectValue}</div>
				<img src={require(`assets/images/common/icoSortingOff.png`)} className="icoSortingOff" alt=""/>
			</div>
			<select id={id} name={name} defaultValue={value} onChange={event => {
				handlerSelectChange(event);
				onChange(event);
			}} ref={selectBox} {...props}>
				{children}
			</select>
			{
				!props.readOnly && onFailureMessage && <div className="errMsg"><img src={require(`assets/images/common/icoCircleError.png`)} alt=""/>{failureMessage}</div>
			}
			{
				!props.readOnly && onSuccessMessage && <div className="sucMsg"><img src={require(`assets/images/common/icoCircleError.png`)} alt=""/>{successMessage}</div>
			}
		</div>
	)
}

export default UiSelect;