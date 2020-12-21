import React, { useRef, useEffect, useState } from 'react';
import { useHistory, useLocation } from 'react-router';

//COMPONENTS
import UiButton from 'components/UiButton';

//STYLES
import '../assets/css/uiModal.scss';

const UiModal = ({
	duration = 1500,
	children,
	offSearchHistory = false,
	headerName,
	headerCustomJSX,
	bindClickCancelBtn = () => { },
	bindClickConfirmBtn = () => { },
	bindOnloadCallback = () => { },
	bindCloseCallback = () => { },
	...props
}) => {
	const uiModal = useRef();
	const history = useHistory();


	useEffect(() => {
		if (uiModal.current) bindOnloadCallback(uiModal);
	}, []);
	const handleUiModalRemove = target => {
		bindCloseCallback(target);
	}
	return (

		<div className="uiModal" ref={uiModal}>
			<div className="dimm"></div>
			<div className="uiModalInner">
				{
					headerName
						?
						<div className="uiModalHeader">
							<div className="subHeader">
								<div className="btnClose" onClick={() => {
									!offSearchHistory && history.goBack();
									bindClickCancelBtn(uiModal.current);
									handleUiModalRemove(uiModal.current);
								}}>
									<img src={require(`assets/images/common/icoCloseBlack.png`)} alt=""/>
									<img src={require(`assets/images/common/icoCloseWhite.png`)} className="white" alt=""/>
								</div>
								<div className="pageName">{headerName}</div>
							</div>
						</div>
						: headerCustomJSX
							?
							<>
								{headerCustomJSX}
							</>
							: ''
				}
				<div className="container">
					{children}
				</div>
			</div>
		</div>
	)
}
export default UiModal;