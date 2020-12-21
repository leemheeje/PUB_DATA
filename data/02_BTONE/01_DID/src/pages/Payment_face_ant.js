import React, { useState, useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import 'assets/css/payment.scss';

const Payment_face_ant = () => {

    return (
        <div className="popArea paymentFace">
            <div className="inner">

                <div className="paymentContents">

                    <div className="faceRecog">
                        <img src={`${require('../assets/images/payment/face_area.png')}`} alt="" />
                        <div className="faceTxt">
                            BTONE 안면인식 서비스를 <br />
                            등록하시겠습니까?
                        </div>
                    </div>

                </div>

                <div className="btn">
					<NavLink to="/payment/payment_pay_ant" className="btnNo">등록안함</NavLink>
					<a href="#;" className="btnSubmit shadow">등록</a>
				</div>

            </div>

        </div>
    )
}

export default Payment_face_ant;