import React, { useState } from 'react';
import { RegExpFormat } from 'regexp';
import { CSSTransition } from 'react-transition-group';
import { useLocation, useHistory } from 'react-router';

//CSSTransition.types
import { CSSTransitionTypes } from '../../CSSTransitionTypes';

// COMPONENTS
import UiLink from 'components/UiLink'
import UiButton from 'components/UiButton'
import UiModal from 'components/UiModal'

// PAGES
import MyQuestionWrite from 'pages/mypage/MyQuestionWrite';

const MyQuestionPrivate = ({
	question_list = [],
	answer_state
}) => {
	const [loginCheck, setLoginCheck] = useState(false) // 로그인 체크
	const history = useHistory();
	const query = new URLSearchParams(useLocation().search);
	return (
		<div className="myQuestionBox private">
			{/* 임시버튼 */}
			<button onClick={() => setLoginCheck(true)}>회원일때</button>
			<button onClick={() => setLoginCheck(false)}>비회원일때</button>

			<div className="btnWrite">
				<UiButton className="md outline red shadowNone" onClick={()=>history.push('?myQuestionWrite=true')}>
					문의 작성
                </UiButton>
			</div>
			{
				loginCheck ?
					<ul className="myQuestionList">
						{
							question_list.map((list, index) => {
								return (
									<li className="list" key={index}>
										<UiLink className="init lst" to="#;">
											<div className="category">[{list.category}]</div>
											<div className="tit">{list.title}</div>
											<div className="date roboto">{RegExpFormat(list.date, 'date')}</div>
											<div className="answerState">
												{
													list.answer !== answer_state.answer_complete ?
														<div className="ing">대기중</div>
														:
														<div className="complete">답변완료</div>
												}
											</div>
										</UiLink>
									</li>
								)
							})
						}
					</ul>
					:
					<div className="loginBox">
						비회원의 <span className="roboto">1:1</span> 문의는 <br />
                이메일로 답변을 보내드립니다
            </div>
			}

			<div className="customerCenter"><a href="tel:1877-0011">고객센터 <span className="roboto">1877-0011</span></a></div>


			<CSSTransition
				{
				...{
					...CSSTransitionTypes.inOutY,
					...{
						in: query.get('myQuestionWrite') === 'true',
						onEnter: () => { },
					}
				}
				}
			>
				<UiModal
					bindOnloadCallback={() => console.log('bindOnloadCallback')}
					bindCloseCallback={() => console.log('bindCloseCallback')}
					bindClickCancelBtn={() => { }}
					headerName="문의 작성"
				>
					<MyQuestionWrite history={history}/>
				</UiModal>
			</CSSTransition>


		</div>
	)
}
export default MyQuestionPrivate;