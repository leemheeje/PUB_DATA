import React, { useState, useEffect } from 'react';
import 'assets/css/payment.scss';
import { NavLink } from 'react-router-dom';

const Payment_fail = (props) => {
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
        <div className="popArea paymentFail">
            <div className="inner">

                <div className="titleWrap">
                    <div className="icon"><img src={`${require('../assets/images/payment/ico_fail.png')}`} alt="" /></div>
                    <div className="title">결제 실패</div>
                    <div className="text txt1 first">결제에 실패했습니다</div>
                    <div className="text txt2">결제 수단을 다시 선택해 주세요</div>
                </div>

                <div className="timeInfo">
                    <span className="timeArea"><span className="time">{timeCount}</span>초</span> 후 메인 화면으로 이동합니다
                </div>

                <div className="btn">
                    <NavLink to="/payment/payment_option"  className="btnPay shadow" >결제 수단 선택</NavLink>
                </div>

            </div>

        </div>
    )
}

export default Payment_fail;