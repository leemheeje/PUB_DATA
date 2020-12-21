import React, { useState, useEffect } from 'react';

//COMPONENTS
import UiInput from 'components/UiInput';

//STYLES
import 'assets/css/myCart.scss';

const MyCartListCoupon = props => {
	const {
        category,
        title,
        item,
        discount,
        period,
        coupon_index,
        couponApply,
        couponNoDialog,
        handlerCouponSubmit,
		..._props
    } = props;
    
    const [couponChkNum, setCouponChkNum] = useState(0);    // 선택된 쿠폰 수
    const [couponMenuFreeChk, setCouponMenuFreeChk] = useState(false);  // 선택된 쿠폰(카테고리 메뉴제공) State

    const [couponCheckedId, setCouponCheckedId] = useState(coupon_index);  // 선택된 쿠폰 index State
    const [couApply, setCouApply] = useState(couponApply);  // 쿠폰 적용 State

    useEffect(() => {
		setCouApply(couponApply)
    }, [couponApply])

    useEffect(() => {
        var couponCount = document.querySelectorAll('input[name=coupon]');
        for(var i=0; i<couponCount.length; i++) {
            if(couponNoDialog) {
                couponCount[i].checked = false;
            }   
        } 
    }, [couponNoDialog])
    
    // 쿠폰 선택시
    const handlerCouponApply = (e) => {
        var couponCount = document.querySelectorAll('input[name=coupon]');
        var couponCountChk = document.querySelectorAll('input[name=coupon]:checked');
        let _couponChecked;
        let _couponNo;
        let _couponChkNum;

        _couponChkNum = couponCountChk.length

        for(var i=0; i<couponCount.length; i++) {
            if(couponCount[i].checked){
                couponCount[i].checked = false;
                couponCount[e - 1].checked = true;

                setCouponCheckedId(e)

                if (category === '메뉴제공') {
                    if(couponCount[e - 1].checked === true) {
                        _couponChecked = true
                    } else {
                        _couponChecked = false
                    }
                } else {
                    _couponChecked = false
                }
                
            }
        }
        if(couponCountChk.length === 0) {
            _couponNo = ''
            setCouApply(_couponNo)
        }
        
        handlerCartSubmit(_couponChecked, _couponNo, _couponChkNum)
    }

    const handlerCartSubmit = (_couponChecked, _couponNo, _couponChkNum) => {
        setCouponMenuFreeChk(_couponChecked)
        setCouApply(_couponNo)
        setCouponChkNum(_couponChkNum)
		handlerCouponSubmit({
            ..._props,
            couponIndex: coupon_index,
            couponCategory: category,
            couponItem: item,
            couponDiscount: discount,
            couponApply: _couponNo,
            couponMenuFreeChk: _couponChecked,
            couponChkNum: _couponChkNum
        });
	}
    
    return (
        <>
            <>
                <div className="couponTitle">
                    {title}
                </div>
                <div className="couponPeriod">
                    유효기간 : <span className="roboto">{period}</span>
                </div>
                <div className="btnCoupon btnApply">
                    <UiInput type="checkbox" name="coupon" id={`chk${coupon_index}`} label={(
						<>
						<span className="txts">사용</span><img src={require(`assets/images/common/icoCircleChecked_27.png`)} className="icoCircleChecked_27" alt="" />
						</>
					)} onClick={() => handlerCouponApply(coupon_index)} />
                </div>
            </>
        </>
    )
}
export default MyCartListCoupon;