import React, { useState, useEffect, useRef } from 'react';

//COMPONENTS
import UiToast from 'components/UiToast';

//STYLES
import 'assets/css/myOrderTable.scss';

const MyOrderTableQRCode = ({
	history,
	...props
}) => {
	const [isToastOpen, setIsToastOpen] = useState(false);
	return (
		<div className="container">
			<div className="myOrderTable">
				<div className="myOrderTableQRCode">
					<div className="qrArea" style={
						{
							backgroundImage: `url(${require('assets/images/thumb/qr1.png')})`
						}
					}>
						<button onClick={()=>setIsToastOpen(true)}>qr코드실패</button>
						<div className="ang"></div>
					</div>
					<div className="inf">
						<div className="tit">
							<img src={require(`assets/images/common/icoFuncOn04_89.png`)} alt=""/>
							매장 테이블의 QR 코드를<br /> 스캔하여 주문해주세요
						</div>
					</div>
				</div>
			</div>
			{
				isToastOpen
				&&
				<UiToast bindCloseCallback={()=>setIsToastOpen(false)}>QR코드를 다시 스캔해주세요</UiToast>
			}
		</div>
	)
}
export default MyOrderTableQRCode;