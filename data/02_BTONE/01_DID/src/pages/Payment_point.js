import React, { useState, useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import Form from '../components/Form';
import 'assets/css/payment.scss';

const Payment_point = () => {

    //상품 가격
    const productPrice = 500;

    //포인트 증가감소 폭
    const pointAble = 100;

    //사용자 포인트
    const allPoint = 700;

    //포인트 스테이트
    const [pointCount, setPointCount] = useState(0);
    const [pointText, setPointText] = useState();
    const [pointText2, setPointText2] = useState();

    //포인트 증가
    const countUp = () => {
        if(pointCount < 999999){
            setPointCount(pointCount + pointAble);
            setBtnPointUse(true)
        }
    }

    //포인트감소
    const countDown = () => {
        if (pointCount >= 100) {
            setPointCount(pointCount - pointAble);
            setBtnPointUse(true)
        }else{
            setPointCount(0);
        }
    }

    useEffect(() => {
        //포인트가 주문금액보다 클 경우
        if (pointCount > productPrice) {
            setPointText(true)
        } else {
            setPointText(false)
        }

        //보유포인트보다 사용 포인트가 클 경우
        if (pointCount > allPoint) {
            setPointText2(true)
            setPointText(false)
        } else {
            setPointText2(false)
        }

        //전체 보유포인트보다 포인트가 적을 경우 전액사용 비활성화
        if (pointCount < allPoint) {
            setActiveAll('')
        }


    }, [pointCount])


    // 포인트 표기 (가격 세자리수 ',')
    const aPoint = allPoint.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")
    const pCount = pointCount.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",") + ' P'


    const [btnPointUse, setBtnPointUse] = useState(); // -,+ 로 포인트 변경했는지 체크
    const [pointNumber, setPointNumber] = useState([]); //원본 포인트 배열
    const [pointResult, setPointResult] = useState(0); //원본 포인트 배열 합침

    const [activeAll, setActiveAll] = useState(); //전액사용 활성화
    const [activeDir, setActiveDir] = useState(); //직접입력 활성화


    //번호입력
    const numberInput = (e) => {
        let num = e.target.value;

        if(btnPointUse){
            setPointNumber([num])
            setBtnPointUse(false)
        }else{
            if(pointNumber.length < 6){
                setPointNumber(pointNumber => ([...pointNumber, num]))
            }
        }
    };

    //포인트 합치기
    useEffect(() => {
        //setPointResult();
        if (activeDir) {
            if (pointNumber.length <= 0) {
                setPointResult(0)
            } else {
                setPointResult(pointNumber.join(""))
            }
        }
    }, [pointNumber]);

    //포인트 합치기
    useEffect(() => {
        setPointCount(Number(pointResult))
        if (pointResult.length <= 0) {
            setPointResult(0)
        }
    }, [pointResult]);


    //포인트 지우기
    const numberDel = (e) => {
        if (pointResult.length > 0) {
            setPointResult(pointResult.slice(0, pointResult.length - 1))
        }
    };

    //포인트 전체 지우기
    const numberClear = (e) => {
        setPointNumber([])
        setPointResult(0)
        setPointCount(0)

    };

    //포인트 전액 사용
    const allPointUse = (e) => {
        setActiveAll('active');
        setActiveDir('');
        setPointCount(allPoint)
    };

    //직접입력
    const dirPointUse = (e) => {
        if (!activeDir) {
            setActiveAll('')
            setActiveDir('active')
            setPointNumber([])
            setPointResult(0)
            setPointCount(0)

        }
    };


    return (
        <div className="popArea paymentPoint">
            <div className="inner">

                <div className="paymentContents">

                    <div className="titleWrap">
                        <div className="icon"><img src={`${require('../assets/images/payment/ico_point.png')}`} alt="" /></div>
                        <div className="title">포인트 사용</div>
                        <div className="text txt1 first">사용하실 포인트 금액을 입력해주세요</div>
                        <div className="text txt2">포인트는 결제 금액을 초과할 수 없습니다</div>
                        <div className="text txt3">100P부터 사용 가능합니다</div>
                    </div>

                    <div className="pointUse">
                        <div className="useBox">
                            <div className="box">
                                <div className="tit">B.T POINT</div>
                                <div className="point roboto">{aPoint} P</div>
                            </div>
                            <div className="box">
                                <div className="tit">포인트 사용</div>
                                <div className="control">
                                    <button className="minus" onClick={countDown} disabled={pointCount === 0}>-</button>
                                    <Form type="text" value={pCount} disabled />
                                    <span className="openDir" onClick={dirPointUse}>직접입력 열기</span>
                                    <button className="plus" onClick={countUp} disabled={allPoint === 0 || pointCount >= allPoint || pointCount > 999900 }>+</button>
                                </div>
                            </div>
                        </div>
                        <div className="infoText">
                            {pointText &&
                                <span className="txt">할인 금액이 결제금액을 초과했습니다.</span>
                            }
                            {pointText2 &&
                                <span className="txt">사용포인트가 보유하신 포인트를 초과했습니다.</span>
                            }
                        </div>
                    </div>

                    <div className="pointOption">
                        <div className="ctr">
                            <p><span className={activeAll} onClick={allPointUse}>전액 사용</span></p>
                            <p><span className={activeDir} onClick={dirPointUse}>직접 입력</span></p>
                        </div>
                        {
                            activeDir &&
                            <div className="numberList">
                                <ul>
                                    <li><button value="1" onClick={numberInput}>1</button></li>
                                    <li><button value="2" onClick={numberInput}>2</button></li>
                                    <li><button value="3" onClick={numberInput}>3</button></li>
                                    <li><button value="4" onClick={numberInput}>4</button></li>
                                    <li><button value="5" onClick={numberInput}>5</button></li>
                                    <li><button value="6" onClick={numberInput}>6</button></li>
                                    <li><button value="7" onClick={numberInput}>7</button></li>
                                    <li><button value="8" onClick={numberInput}>8</button></li>
                                    <li><button value="9" onClick={numberInput}>9</button></li>
                                    <li className="btnClear"><button value="C" onClick={numberClear}>전체 지우기</button></li>
                                    <li><button value="0" onClick={numberInput}>0</button></li>
                                    <li className="btnDelete"><button value="D" onClick={numberDel}><img src={`${require('../assets/images/payment/ico_arrow.png')}`} alt="" /></button></li>
                                </ul>
                            </div>
                        }
                    </div>



                </div>

                <div className="btn">
                    <NavLink to="/payment/payment_coupon" className="btnCancel">취소</NavLink>
                    {
                        pointText || pointText2 ?
                            <a href="#;" className="btnNext off">확인</a>
                            :
                            <NavLink to="/payment/payment_option" className="btnNext shadow" disabled>확인</NavLink>

                    }
                </div>

            </div>

        </div>
    )
}

export default Payment_point;