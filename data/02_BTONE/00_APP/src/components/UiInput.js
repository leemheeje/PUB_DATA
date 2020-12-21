import React, { useState, useRef, useEffect, forwardRef } from 'react';
import '../assets/css/uiInput.scss';

const UiInput = forwardRef(({
	id,
	label,
	type = 'text',
	placeholder = '입력해주세요.',
	pattern,
	value,
	className,
	onFailureMessage,
	failureMessage,
	onSuccessMessage,
	successMessage,
	maxlength,
	bindSearchSubmit = () => { },
	onChange = () => { },
	onKeyDown = () => { },
	onFocus = () => { },
	onBlur = () => { },
	...props
}, ref) => {
	const [componentInputFocus, setComponentInputFocus] = useState(false);
	const [inputFieldValue, setInputFieldValue] = useState(''); //
	const [searchInputValue, setSearchInputValue] = useState(''); //검색인풋에 값조작
	const [searchInputBtn, setSearchInputBtn] = useState(true); //검색인풋에 검색버튼&값삭제버튼 쇼히든 조작
	const [validityCheck, setValidityCheck] = useState(''); //패턴이있는 인풋일때 패턴값 체크
	useEffect(() => value && setInputFieldValue(value), []);
	return (
		<>
			{
				type === "checkbox" || type === "radio"
					?
					<div className={`uiInput radiochk ${
						props.size ? props.size : ''
						} ${className}`}>
						<input ref={ref} type={type} id={id} placeholder={placeholder} {...props} onChange={event => {
							onChange(event);
						}} />
						<label className="lb" htmlFor={id}>
							<img src={require(`assets/images/common/icoInputChecked.png`)} className="active" alt="" />
							{label}
						</label>
					</div>
					: type === "file"
						?
						<div className={`uiInput file ${
							props.size ? props.size : ''
							}`}>
							<div className="cmmInputFile fakFile" >
								<div className="ip">
									<div className="icofile">
										<span className="ic"></span>
										<div className="txt">
											<img src={require(`assets/images/common/icoCamera_29.png`)} alt="" />
											사진첨부
										</div>
									</div>
									<label htmlFor={id} className="filename">{placeholder}</label>
									<input ref={ref} type={type} id={id} className="filePut" onChange={event => {
										let reader = new FileReader();
										let target = event.target;
										let file = target.files[0];
										if (file) {
											let imgPath = () => {
												let replaceValue = '';
												return replaceValue;
											};
											reader.onloadend = () => onChange(imgPath(), reader.result);
											reader.readAsDataURL(file);
										}
									}} />
								</div>
							</div>
						</div>
						:
						<div className={`uiInput field ${
							props.readOnly ? 'readonly' : ''
							} ${
							props.size ? props.size : ''
							} `}>
							<label className="lb" htmlFor={id}>{label}</label>
							<div className={`ip ${
								componentInputFocus
									? 'focus'
									: ''
								} ${
								validityCheck === true
									? 'validityComplete'
									: validityCheck === false
										? 'validityFail'
										: ''
								} ${
								onFailureMessage
									? 'onFailureMessage'
									: onSuccessMessage
										? 'onSuccessMessage'
										: ''
								}`}>
								{
									type !== "search"
										?
										<input ref={ref} type={type} id={id} placeholder={placeholder} maxLength={maxlength} {...props} onFocus={event => {
											setComponentInputFocus(true);
											onFocus(event);
										}} onBlur={event => {
											setComponentInputFocus(false);
											onBlur(event);
										}} onChange={event => {
											if (pattern) {
												let regExp = new RegExp(pattern, 'g');
												let boolean = regExp.test(event.target.value);
												setValidityCheck(boolean);
												onChange(event, boolean);
											} else {
												onChange(event);
											}
										}} />
										:
										<>
											<input ref={ref} type={type} id={id} placeholder={placeholder} {...props} value={searchInputValue} onFocus={event => {
												setComponentInputFocus(true);
												onFocus(event);
											}} onBlur={event => {
												setComponentInputFocus(false);
												onBlur(event);
											}} onChange={event => {
												setSearchInputBtn(true);
												setSearchInputValue(event.target.value);
												onChange(event);
											}} onKeyDown={event => {
												if (event.keyCode === 13) {
													setSearchInputBtn(false);
													bindSearchSubmit(searchInputValue);
												}
												onKeyDown(event);
											}} />
											<div className="ipBtns">
												{
													searchInputValue
														?
														searchInputBtn
															? <span className="icos search" onClick={() => {//검색버튼 클릭
																setSearchInputBtn(false);
																bindSearchSubmit(searchInputValue);
															}}><img src={require(`assets/images/common/icoSearch.png`)} alt="" /></span>
															: <span className="icos close" onClick={() => {//검색입력 초기화
																setSearchInputValue('');
																setSearchInputBtn(true);
															}}><img src={require(`assets/images/common/icoSearchClose.png`)} alt="" /></span>
														: ''
												}
											</div>
										</>
								}
								<img src={require(`assets/images/common/icoInputCheck.png`)} className="icoValidityComplete" alt="" />
							</div>
							{
								!props.readOnly && onFailureMessage && <div className="errMsg"><img src={require(`assets/images/common/icoCircleError.png`)} alt="" />{failureMessage}</div>
							}
							{
								!props.readOnly && onSuccessMessage && <div className="sucMsg"><img src={require(`assets/images/common/icoCircleError.png`)} alt="" />{successMessage}</div>
							}
						</div>

			}
		</>
	)
});

export default UiInput;