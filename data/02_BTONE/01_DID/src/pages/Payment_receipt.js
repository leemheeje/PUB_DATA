import React, { useState, useEffect } from 'react';
import UiTopBanner from '../components/UiTopBanner';
import 'assets/css/payment.scss';

const Payment_receipt = props => {

	return (
		<div className="popArea paymentReceipt">
			<UiTopBanner />

			<div className="inner">
				<div className="receiptContents">

					<div className="titleWrap">
						<div className="icon"><img src={`${require('../assets/images/payment/ico_complete01.png')}`} alt="" /></div>
						<div className="text txt1 first">결제가 완료되었습니다</div>
						<div className="text txt2">영수증 발행 방식을 선택해주세요</div>
					</div>

					<div className="btnReceipt">
						<button className="mobileReceipt shadow">전자영수증</button>
						<button className="paperReceipt shadow">종이영수증</button>
						<button className="noReceipt shadow" onClick={() => props.history.push('/payment/payment_completion')}>발행안함</button>
					</div>

				</div>
			</div>

		</div>
	)
}

export default Payment_receipt;