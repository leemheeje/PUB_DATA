import React, { useState } from 'react';
import {RegExpImeType} from 'regexp';

//COMPONENTS
import UiModal from 'components/UiModal';
import UiSelect from 'components/UiSelect'
import UiInput from 'components/UiInput';
import UiTextarea from 'components/UiTextarea';
import UiButton from 'components/UiButton';
import UiToast from 'components/UiToast';
import UiDialog from 'components/UiDialog';

//STYLES
import 'assets/css/myQuestion.scss';

const MyQuestionWrite = ({
    history
}) => {
    const [loginCheck, setLoginCheck] = useState(false) // 로그인 체크

    const [emailCheck, setEmailCheck] = useState('') // 이메일
    const [categoryCheck, setCategoryCheck] = useState(0); // 카테고리 선택
    const [titleCheck, setTitleCheck] = useState(''); // 제목
    const [descCheck, setDescCheck] = useState(''); // 내용

    const [emailFailureCheck, setEmailFailureCheck] = useState();
    const [categoryFailureCheck, setCategoryFailureCheck] = useState();
    const [titleFailureCheck, setTitleFailureCheck] = useState();
    const [descFailureCheck, setDescFailureCheck] = useState();

    const [isCancelDialogOpen, setIsCancelDialogOpen] = useState('');
	const [completeToastOpen, setCompleteToastOpen] = useState(false);

	return (
            <div className="mypage">
                {/* 임시버튼 */}
                <button onClick={() => setLoginCheck(true)}>회원일때</button>
                <button onClick={() => setLoginCheck(false)}>비회원일때</button>

                <div className="myQuestionWriteWrap">
                    {
                        loginCheck ? 
                        undefined
                        :
                        <div className="mail">
                            <div className="sTit">이메일</div>
                            <UiInput
                                type="text"
                                pattern="number"
                                onFailureMessage={emailFailureCheck === false}
                                failureMessage="이메일을 입력해주세요" 
                                onChange={(event) => {
                                    RegExpImeType(event, {ime: 'email'})

                                    let { value } = event.target;

                                    if(value === "") {
                                        setEmailFailureCheck(false)
                                    } else {
                                        setEmailFailureCheck(true)
                                    }
            
                                    setEmailCheck(event.target.value)
                                }}
                            />
                        </div>
                    }
                    <div className="category">
                        <div className="sTit">유형</div>
                        <UiSelect 
                        onFailureMessage={categoryFailureCheck === false}
                        failureMessage="문의 유형을 선택해주세요" 
                        onChange={(event) => {
                            let { value } = event.target;

                            if(value === "") {
                                setCategoryFailureCheck(false)
                            } else {
                                setCategoryFailureCheck(true)
                            }

                            setCategoryCheck(event.target.value)
                        }}
                        >
                            <option value="">유형 선택</option>
                            <option value="1">주문 / 결제</option>
                            <option value="2">이용 문의</option>
                            <option value="3">혜택</option>
                            <option value="4">개인정보</option>
                            <option value="5">기타</option>
                        </UiSelect>
                    </div>
                    <div className="title">
                        <div className="sTit">제목 <span>(한글 26자 이내)</span></div>
                        <UiInput
                            type="text"
                            maxlength="26"
                            pattern="number"
                            onFailureMessage={titleFailureCheck === false}
                            failureMessage="제목을 입력해주세요" 
                            onChange={(event) => {
                                RegExpImeType(event, {ime: 'ko'})

                                let { value } = event.target;


                                if(value === "") {
                                    setTitleFailureCheck(false)
                                } else {
                                    setTitleFailureCheck(true)
                                }
        
                                setTitleCheck(event.target.value)
                            }}
                        />
                    </div>
                    <div className="title">
                        <div className="sTit">문의 내용</div>
                        <UiTextarea 
                        onFailureMessage={descFailureCheck === false}
                        failureMessage="문의 내용을 입력해주세요" 
                        onChange={(event) => {
                            let { value } = event.target;

                            if(value === "") {
                                setDescFailureCheck(false)
                            } else {
                                setDescFailureCheck(true)
                            }

                            setDescCheck(event.target.value)
                        }} 
                        />
                    </div>
                    <div className="btnWrap">
                        <div className="btnLeft">
                            <UiButton className="outline none" onClick={() => setIsCancelDialogOpen(true)}>취소</UiButton>
                        </div>
                        <div className="btnRight">
                            <UiButton 
                            disabled={
                                loginCheck ?
                                !categoryCheck 
                                || !titleCheck 
                                || !descCheck ? 
                                true : false
                                :
                                !emailCheck
                                || !categoryCheck
                                || !titleCheck 
                                || !descCheck ? 
                                true : false
                            } 
                            onClick={() => setCompleteToastOpen(true)}>작성 완료</UiButton>
                        </div>
                    </div>
                </div>
                {completeToastOpen && <UiToast bindCloseCallback={() => { history.push('/mypage/myQuestionDetail'); setCompleteToastOpen(false); }}>1:1 문의가 성공적으로 저장되었습니다</UiToast>}
                {
                    isCancelDialogOpen
                    &&
                    <UiDialog
                        type="confirm"
                        cancelTextName='아니오'
                        confirmTextName='예'
                        bindClickCancelBtn={() => setIsCancelDialogOpen(false)}
                        bindClickConfirmBtn={() => { history.push('/mypage/myQuestion'); }}
                    >
                        <div className="reserCancelDialogArea">
                            작성 중인 내용이 사라집니다. <br />
                            1:1 문의 목록으로 돌아가시겠습니까?
                        </div>
                    </UiDialog>
                }
            </div>
	)
}
export default MyQuestionWrite;