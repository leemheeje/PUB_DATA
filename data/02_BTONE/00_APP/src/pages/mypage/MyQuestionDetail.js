import React, { useState } from 'react';
import { RegExpFormat } from 'regexp';

// COMPONENTS
import UiInput from 'components/UiInput'
import UiSorting from 'components/UiSorting'
import UiButton from 'components/UiButton'
import UiLink from 'components/UiLink'

//STYLES
import 'assets/css/myPage.scss';
import 'assets/css/myQuestion.scss';

const MyQuestionDetail = () => {

	return (
        <div className="container mypage myquestion">
            <div className="myQuestionDetailWrap">
                <ul className="questionDetailList">
                    <li>
                        <span className="tit">작성일</span>
                        <span className="desc">{RegExpFormat('20200417', 'date')}</span>
                    </li>
                    <li>
                        <span className="tit">유형</span>
                        <span className="desc">주문/결제</span>
                    </li>
                    <li>
                        <span className="tit">제목</span>
                        <span className="desc">결제 내역이 안 보이는데요</span>
                    </li>
                    <li>
                        <span className="tit">문의 내용</span>
                        <span className="desc">전에 결제했던 내용을 찾고 싶은데 어디서 볼 수 있는 건지 잘 모르겠어요. 고객센터에 전화하면 되는 건가요?</span>
                    </li>
                </ul>

                <div className="answerBox">
                    <div className="tit">
                        <span className="name">고객센터 답변</span>
                        <span className="date">{RegExpFormat('20200420', 'date')}</span>
                    </div>
                    <div className="desc">
                        고객님 안녕하세요, PICK오더 고객센터 담당자 홍길동입니다.
                        결제가 완료된 주문내역은 마이페이지 > 주문내역 화면에서 확인
                        가능합니다
                    </div>
                </div>

                <div className="btnBack"><UiLink className="outline shadowNone" to="/mypage/myQuestion">목록으로 돌아가기</UiLink></div>
            </div>
        </div>
	)
}
export default MyQuestionDetail;