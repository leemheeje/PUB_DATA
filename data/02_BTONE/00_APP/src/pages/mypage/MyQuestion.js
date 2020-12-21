import React, { useState } from 'react';


// COMPONENTS
import MyQuestionPrivate from 'pages/mypage/MyQuestionPrivate';
import MyQuestionFaq from 'pages/mypage/MyQuestionFaq';



//STYLES
import 'assets/css/myPage.scss';
import 'assets/css/myQuestion.scss';

const MyQuestion = () => {
	
    const [questionTabsActive, setQuestionTabsActive] = useState(0);

    const answer_state = {
		answer_ing: 1,		// 대기중
		answer_complete: 2,		// 답변완료
	}

    const question_list = [		// 1:1문의 리스트, 테스트를 위한 값입니다
        {
            category: "주문/결제",
            title: `결제 내역이 안 보이는데요`,
            date: 20200417,
            answer: answer_state.answer_ing
        },
        {
            category: "기타",
            title: `찾는 매장이 있어요`,
            date: 20200411,
            answer: answer_state.answer_ing
        },
        {
            category: "혜택",
            title: `쿠폰이 없어졌어요`,
            date: 20200401,
            answer: answer_state.answer_complete
        },
        {
            category: "기타",
            title: `토끼정 강남점에 예약하려면 어떻게 해야하죠?`,
            date: 20200211,
            answer: answer_state.answer_complete
        },
        {
            category: "혜택",
            title: `쿠폰이 없어졌어요`,
            date: 20200401,
            answer: answer_state.answer_complete
        },
    ]

	return (
		<div className="container mypage myquestion">
			<div className="myQuestionWrap">
             <div className="questionTabs">
                    <ul className="baseTab">
                        <li className={questionTabsActive === 0 ? 'active' : ''} onClick={() => setQuestionTabsActive(0)}><span><span className="roboto">1:1</span>문의</span></li>
                        <li className={questionTabsActive === 1 ? 'active' : ''} onClick={() => setQuestionTabsActive(1)}><span>자주 묻는 질문</span></li>
                    </ul>
                    <div className="diviTabs">
                        {
                            questionTabsActive === 0
                                ? <MyQuestionPrivate question_list={question_list} answer_state={answer_state} />
                                : 
                                <MyQuestionFaq />
                        }
                    </div>
                </div>
            </div>

			


		</div>
	)
}
export default MyQuestion;