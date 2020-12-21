import React, { useState, useEffect } from 'react';
import 'assets/css/main.scss';

const Main = (props) => {

    const { history } = props;
    const [adminCheck, setAdminCheck] = useState(0);
    const [btnTwo, setBtnTwo] = useState(true); // 버튼2개 사용시 true

    //관리자모드 체크
    const adminClick = () => {
        setAdminCheck(adminCheck + 1);
    }

    useEffect(() => {
        if (adminCheck >= 5) {
            history.push('/')
            setAdminCheck(0);
        }
    }, [adminCheck])

    //주문으로 이동
    const oveOrder = () => {
        history.push('order')
    }

    //버튼 없는 화면 보기
    const change = () => {
        setBtnTwo(false);
    }


    return (
        <div id="main">
            <div className="in" onClick={btnTwo ? undefined : oveOrder}>
                <div className="adBox">
                    <img src={require('../assets/images/main/mainBanner.jpg')} alt="메인베너" />
                </div>
                <div className="btnMain">
                    <div className="in">
                        <div className="tit">
                            <em>
                                {btnTwo ? (`버튼을 터치하여 주문해주세요`) : (`화면을 터치하여 주문해주세요`)}
                            </em>
                        </div>
                        {btnTwo &&
                            <>
                                <div className="btnOp">
                                    <p className="store"><button onClick={oveOrder}><span>매장</span></button></p>
                                    <p className="take"><button onClick={oveOrder}><span>포장</span></button></p>
                                    
                                </div>
                                <button onClick={change}>임시 - 버튼 없는 화면 보기</button>
                            </>
                        }
                    </div>
                </div>
            </div>
            <div className="adminLink" onClick={adminClick}>
                관리자모드
            </div>
        </div>
    )
}


export default Main;
