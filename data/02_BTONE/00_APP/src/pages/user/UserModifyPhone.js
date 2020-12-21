import React, { useState, useEffect } from 'react';

//COMPONENTS
import UiInput from 'components/UiInput';
import UiLink from 'components/UiLink';
import UiButton from 'components/UiButton';

//STYLES
import 'assets/css/userIdentity.scss';

const UserModifyPhone = () => {
    const [newPhoneNumber, setNewPhoneNumber] = useState(0);
    const [inputPhoneOK , setInputPhoneOK] = useState(false);
    const [phoneComfirm , setPhoneComfirm] = useState(false);
    const [btnModifyPhoneOn , setBtnModifyPhoneOn] = useState(false);

    const phoneChange = () => {
		var phoneNum = document.querySelector('input[type=text]').value;
		setNewPhoneNumber(phoneNum)
    }
    
    useEffect(() => {
        if(newPhoneNumber.length > 9) {
            setInputPhoneOK(true)
        } else {
            setInputPhoneOK(false)
        }
    })

    const handlerConfirm = () => {
        setPhoneComfirm(true)
        setBtnModifyPhoneOn(true)
    }

	return (
		<div className="container userPassword userPhone">
			<div className="innerWrap">
				<div className="usfPassInner">
					<div className="topTxts">
						<div className="tit">전화번호 변경</div>
						<div className="stit">
                            본인 명의의 휴대폰 번호로 인증하실 수 있습니다 <br />
                            <span className="point">(본인 주민등록번호로 가입된 휴대폰 번호)</span> <br />
                            
                            타인 명의의 휴대폰 또는 법인 폰을 이용 중인 회원님은 <br />
                            휴대폰 인증이 불가합니다
						</div>
					</div>
                    <div className="midCont">
                        <div className="lt">
                            <UiInput type="tel" maxlength="11" placeholder="- 없이 번호만 입력해주세요" onKeyUp={() => phoneChange()} />
                        </div>
                        <div className="rt">
                            <UiButton className={inputPhoneOK ? 'red outline shadowNone' : 'none outline'} onClick={handlerConfirm}>확인</UiButton>
                        </div>
                        {
                            phoneComfirm ?
                            <div className="alertTxt">
                                <img src={`${require('assets/images/common/icoCircleError.png')}`} alt="" />
                                <span>
                                    확인 되었습니다 변경하실 휴대폰 번호로 <br />
                                    본인인증을 진행해주세요
                                </span>
                            </div>
                            : undefined
                        }
                    </div>
					<div className="fotAre">
                        <UiLink text="휴대폰 본인인증" to={btnModifyPhoneOn ? '/user/userModifyPassword' : '#;'}></UiLink>
					</div>
				</div>
			</div>
		</div>
	)
}
export default UserModifyPhone;