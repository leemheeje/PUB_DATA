import React, { useState, useEffect } from 'react';

const defaultProps = {
	isOpen: false,
	onAfterCallback: () => { },
	offAfterCallback: () => { },
}
const UiModal = props => {
	const [modalObject, setModalObject] = useState(props);
	useEffect(() => {
		setModalObject(props);
	}, [props]);

	useEffect(() => {
		if (modalObject.isOpen) {
			modalObject.onAfterCallback();
		} else {
			modalObject.offAfterCallback();
		}
	}, [modalObject.isOpen]);

	const bindDigModalClose = () => {
		setModalObject({
			...modalObject,
			isOpen: false
		});
	}
	return (
		<div className={`digModal ${modalObject.isOpen ? 'active' : 'hide'}`}>
			<div className="dimm"></div>
			<div className={`digModalBox ${modalObject.modalWaiting ? 'waiting' : ''}`}>
				{
					modalObject.modalWaiting ?
					<div className="innerWrap">
						<div className="contents">
							<div className="txts">{modalObject.children}</div>
							<button onClick={bindDigModalClose}>완료</button>
						</div>
					</div>
					:
					<div className="innerWrap">
						<div className="txts">{modalObject.children}</div>
					</div>
				}
			</div>
		</div>
	)
}
UiModal.defaultProps = defaultProps;
export default UiModal;
