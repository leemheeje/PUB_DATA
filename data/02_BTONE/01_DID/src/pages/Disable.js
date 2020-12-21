import React from 'react';
import 'assets/css/disable.scss';

const Disable = () => {

    return (
        <div id="disable">
            <div className="inner">
                <div className="disableCont">
                    <div className="titleWrap">
                        <div className="icon"><img src={`${require('../assets/images/disable/ico_disable.png')}`} alt="" /></div>
                        <div className="title">사용 불가</div>
                        <div className="text txt2 first">현재 일시적으로 사용 할 수 없습니다</div>
                        <div className="text txt1">카운터에서 주문 도와드리겠습니다</div>
                        <div className="img">
                            <img src={`${require('../assets/images/disable/disableImg.gif')}`} alt="" />
                        </div>
                    </div>
                </div>
            </div>
            
        </div> 
    )
}


export default Disable;
