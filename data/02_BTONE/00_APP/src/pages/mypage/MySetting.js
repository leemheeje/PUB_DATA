import React, { useState } from 'react';
import { useParams, useHistory, useLocation } from 'react-router';

//COMPONENTS
import UiButton from 'components/UiButton'
import UiInput from 'components/UiInput'
import UiLink from 'components/UiLink'
import UiDialog from 'components/UiDialog';

//STYLES
import 'assets/css/myPage.scss';

const MySetting = () => {

    const [loginCheck, setLoginCheck] = useState(false) // 로그인 체크
    const [loginDialogOpen, setLoginDialogOpen] = useState(false) // 로그인 팝업 State
	const loginGo = () => {
        setLoginCheck(true);
    }

    const history = useHistory();
    
    const setting_list = ['SMS 수신 동의', '카카오 톡 알림 수신 동의', '주문 / 결제 현황 알림', '쿠폰 및 포인트 적립 / 사용 알림', '리뷰 작성 알림', '1:1 문의 답변 알림']

    const handlerBtnAlarm = (e) => {
        setLoginDialogOpen(true);
    }

	return (
        <div className="container mypage">
            {/* 임시버튼 */}
			<button onClick={loginGo}>회원일때</button>
			<button onClick={() => setLoginCheck(false)}>비회원일때</button>

            <div className="mySettingWrap">
                <ul className="settingList">
                    {
                        setting_list.map((list, index) => {
                            return (
                                <li className="list" key={index}>
                                    <UiButton className="init lst" disabled="disabled">{list}</UiButton>
                                    <div className="btnOnOff roboto">
                                        {
                                            loginCheck ?
                                            <UiInput type="checkbox" name={`on${index}`} id={`on${index}`} />
                                            :
                                            <UiInput type="checkbox" name={`on${index}`} id={`on${index}`} onClick={(e) => handlerBtnAlarm(e.target.checked)} checked={false} />
                                        }
                                    </div>
                                </li>
                            )
                        })
                    }
                </ul>
                <ul className="btnBack">
                    <li className="list">
                        <UiLink className="init lst" to="/">
                            안면인식 등록
                            <div className="btnArrow"></div>
                        </UiLink>
                    </li>
                    <li className="list">
                        <UiLink className="init lst" to="/">
                            오픈소스 라이선스
                            <div className="btnArrow"></div>
                        </UiLink>
                    </li>
                </ul>
            </div>
            {
				loginDialogOpen
				&&
				<UiDialog
					type="confirm"
					cancelTextName='아니오'
					confirmTextName='회원가입'
					bindClickCancelBtn={() => { setLoginDialogOpen(false); }}
					bindClickConfirmBtn={() => { setLoginDialogOpen(true); history.push('/user/userRegister/step1'); }}
				>
					<div className="authDialogArea">
						<div className="tit">회원 전용 설정입니다</div>
						<div className="txt">
							지금 회원가입하시면 PICK오더의 <br />
							다양한 혜택 알람을 받으실 수 있습니다 <br />
							<span>회원가입 하시겠습니까?</span>
						</div>
					</div>
				</UiDialog>
			}
        </div>
	)
}
export default MySetting;