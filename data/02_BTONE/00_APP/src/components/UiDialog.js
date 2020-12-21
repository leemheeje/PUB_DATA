import React, { useEffect, useRef, useState } from 'react';

//COMPONENTS
import UiButton from 'components/UiButton';
//STYLES
import '../assets/css/uiDialog.scss';

const UiDialog = ({
	children = '문자를 입력해주세요',
	duration = 1000,
	type = 'alert',
	className = '',
	cancelTextName = '취소',
	confirmTextName = '확인',
	isDisabledCancelButton = false,
	isDisabledConfirmButton = false,
	bindClickCancelBtn = () => { },
	bindClickConfirmBtn = () => { },
	bindOnloadCallback = () => { },
	bindCloseCallback = () => { },
	...props
}) => {
	const uiPopup = useRef();

	useEffect(() => {
		bindOnloadCallback(uiPopup.current);
		if (type === 'toast') {
			//document.querySelector('body').append(uiPopup.current);
			setTimeout(() => {
				if (uiPopup.current) {
					handleUiPopupRemove();
				}
			}, duration);
		}
	}, []);

	const handleUiPopupRemove = event => {
		bindCloseCallback(uiPopup.current);
		//if (type === 'toast' && uiPopup.current) uiPopup.current.remove();
	}

	return (
		<div className={`uiDialog ${className} ${type}`} ref={uiPopup} onClick={() => {
			if (type === 'toast') handleUiPopupRemove();
		}}>
			<div className="dimm" onClick={() => {
				if (type !== 'toast') handleUiPopupRemove();
			}}></div>
			<div className="uiDialogBox">
				<div className="uiDialogContBox">
					<div className="uiDialogCont">
						{children}
					</div>
				</div>
				<div className="uiDialogBtnsWrap">
					{
						type === 'confirm'
							?
							<div className="uiRow">
								<div className="uiCol6">
									<UiButton disabled={isDisabledCancelButton} className="outline shadowNone uiDiagCancelBtn" onClick={event => {
										handleUiPopupRemove();
										bindClickCancelBtn(event);
									}}>{cancelTextName}</UiButton>
								</div>
								<div className="uiCol6">
									<UiButton disabled={isDisabledConfirmButton} className="uiDiagConfirmBtn" onClick={event => {
										handleUiPopupRemove();
										bindClickConfirmBtn(event);
									}}>{confirmTextName}</UiButton>
								</div>
							</div>
							: type === 'alert'
								?
								<div className="uiRow">
									<div className="uiCol12">
										<UiButton disabled={isDisabledConfirmButton} className="init uiDiagConfirmBtn" onClick={event => {
											handleUiPopupRemove();
											bindClickConfirmBtn(event);
										}}>{confirmTextName}</UiButton>
									</div>
								</div>
								: ''
					}

				</div>
			</div>
		</div>
	)
}

export default UiDialog;