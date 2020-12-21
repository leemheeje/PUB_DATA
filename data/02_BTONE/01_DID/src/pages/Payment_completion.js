import React, { useState, useEffect } from 'react';
import UiTopBanner from '../components/UiTopBanner';
import 'assets/css/payment.scss';
import { NavLink } from 'react-router-dom';

const Payment_completion = (props) => {

    const { history } = props;

    // 5초 타이머 State
    const [timeCount, setTimeCount] = useState(5);

    useEffect(() => {
        const timer = setInterval(() => {
            setTimeCount(timeCount => timeCount - 1);
        }, 1000);
        return (() => {
            clearInterval(timer)
        });
    }, []);

    useEffect(() => {
        if (timeCount == 0) {
            history.push('/Main')
        }
    }, [timeCount]);

    return (
        <div className="popArea paymentCompletion">
            <UiTopBanner/>

            <div className="inner">
                <div className="receiptContents">

                    <div className="titleWrap">
                        <div className="icon"><img src={`${require('../assets/images/payment/ico_complete02.png')}`} alt="" /></div>
                        <div className="text txt2 first">입력하신 연락처로</div>
                        <div className="text txt1">[주문상황 알림], [포인트/쿠폰 알림], [전자영수증]</div>
                        <div className="text txt2">알림이 발송됩니다</div>
                    </div>

                    <div className="timeInfo">
                        <span className="timeArea"><span className="time">{timeCount}</span>초</span> 후 메인 화면으로 이동합니다
                    </div>

                    <div className="btnComplete">
                        <NavLink to="/Main"  className="btn_pay shadow" >확인</NavLink>
                    </div>
                    
                </div>
            </div>

        </div>
    )
}

export default Payment_completion;