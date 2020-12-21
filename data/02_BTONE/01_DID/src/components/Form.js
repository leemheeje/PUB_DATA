import React, { forwardRef } from 'react';
import '../assets/css/UiForm.scss';
const Form = forwardRef((props, ref) => {
	const { label, className,...as_props } = props;
	const fnFormTypeFilter = () => {
		switch (as_props.type) {
			case 'radio':
			case 'checkbox':
				return (
					<div className={`uiChkrdo ${
						className ? className : ''
					}`}>
						<input {...as_props} ref={ref} />
						{
							label && <label htmlFor={as_props.id}>{label}</label>
						}
					</div>
				)
			case 'button':
			case 'submit':
				return (
					<>
					</>
				)
			default:
				return (
					<>
						{label && <label htmlFor={as_props.id}>{label}</label>}
						<input {...as_props} ref={ref} />
					</>
				)
		}
	}
	return fnFormTypeFilter()
})

export default Form;