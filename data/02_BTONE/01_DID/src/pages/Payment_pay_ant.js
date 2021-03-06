import React, { useState } from 'react';
import { NavLink, Link } from 'react-router-dom';
import 'assets/css/payment.scss';
import PopupToast from 'components/PopupToast';
import PopupModal from 'components/PopupModal';
import UiButton from '../components/UiButton';

const Payment_pay_ant = props => {

    //팝업용 State
	const [popupToast, setPopupToast] = useState('');
	const [isAnotherPayMentModal, setIsAnotherPayMentModal] = useState(false);

    const payPop = () => {
		setPopupToast(
			<PopupToast closeCallback={handlerToastCloseCallback}>
				결제가 진행중 입니다
			</PopupToast>
		);
    }
    const handlerToastCloseCallback = () =>{
		setPopupToast('');
		props.history.push('/payment/payment_receipt');
	}
	const handlerAnotherPayment = gubun => {
		setIsAnotherPayMentModal(false);
	}

    return (
        <>
            {popupToast}

            <div className="popArea paymentPay">
                <div className="inner">
            
                    <div className="paymentContents">

                        <div className="creditCard">
                            <div className="titleWrap">
                                <div className="icon"><img src={`${require('../assets/images/payment/ico_credit.png')}`} alt="" /></div>
                                <div className="title">삼성/LG페이 결제</div>
                                <div className="text txt2 first">다음 그림과 같이</div>
                                <div className="text txt1">스마트폰 뒷면을 리더기에 대주세요.</div>
                                <div className="img">
                                    <img src={`${require('../assets/images/payment/pay_reader.gif')}`} alt="" />
                                </div>
                            </div>
                            {/* 임시 */}
                            <button onClick={payPop}>결제Toast</button>
                        </div>

                    </div>

                    <div className="btn">
                        <NavLink to="/Main" className="btnBack">처음으로 돌아가기</NavLink>
						<UiButton onClick={() => setIsAnotherPayMentModal(true)} className="btnChange shadow">결제 수단 변경</UiButton>
                    </div>

                </div>
            </div>
			{
				isAnotherPayMentModal &&
				<PopupModal>
					<div className="multiLogin type2">
						{/* <div className="box top">
							<Link to="/payment/payment_face"><button>카드결제</button></Link>
						</div> */}
						<div className="box bottom">
							<div className="otherTit">결제 수단 선택</div>
							<ul className="loginList">
								<li><Link to="/payment/payment_pay"><button>신용/체크카드</button></Link></li>
								<li><Link to="/payment/payment_pay_ant"><button>삼성/LG페이</button></Link></li>
								{/* <li><button onClick={() => handlerAnotherPayment('kakaopay')}>카카오 페이</button></li> */}
								{/* <li><button onClick={() => handlerAnotherPayment('kakaopay')}>카카오 페이</button></li>
								<li><button onClick={() => handlerAnotherPayment('naverpay')}>네이버 페이</button></li>
								<li><button onClick={() => handlerAnotherPayment('samsungpay')}>삼성 페이</button></li>
								<li><button onClick={() => handlerAnotherPayment('samsungpay')}>L Pay</button></li>
								<li><button onClick={() => handlerAnotherPayment('samsungpay')}>Payco</button></li> */}
							</ul>
							<button className="cancel" onClick={() => handlerAnotherPayment()}>취소</button>
						</div>
					</div>
				</PopupModal>
			}
        </>
    )
}

export default Payment_pay_ant;