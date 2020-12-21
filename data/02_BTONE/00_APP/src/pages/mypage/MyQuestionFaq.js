import React, { useState } from 'react';
import { RegExpFormat } from 'regexp';

// COMPONENTS
import UiInput from 'components/UiInput'
import UiSorting from 'components/UiSorting'
import UiLink from 'components/UiLink'
import UiAccordion from 'components/UiAccordion'

// STYLES
import 'assets/css/mySearch.scss';
const faq_list = [		//테스트를 위한 값입니다
	{
		title: `결제 내역이 안 보여요`,
		description: `결제가 완료된 주문내역은 마이페이지 > 주문내역 화면에서 확인 가능합니다`
	},
	{
		title: `주문했던 매장이 안 보여요`,
		description: `결제가 완료된 주문내역은 마이페이지 > 주문내역 화면에서 확인 가능합니다`
	},
	{
		title: `쿠폰이 없어졌어요`,
		description: `결제가 완료된 주문내역은 마이페이지 > 주문내역 화면에서 확인 가능합니다`
	},
	{
		title: `휴대폰 번호를 변경하고 싶어요`,
		description: ``
	},
	{
		title: `불편사항은 어디로 말하면 되나요?`,
		description: ``
	},
	{
		title: `주문 내역을 삭제하고 싶어요`,
		description: ``
	},
	{
		title: `포인트 사용은 어떻게 하나요?`,
		description: ``
	},
]
const MyQuestionFaq = () => {

	const [faqList, setFaqList] = useState(faq_list) // 검색 결과 State
	const [searchResult, setSearchResult] = useState(false) // 검색 결과 State

	const handlerSearchSubmit = () => {
		console.log(`검색어:${searchResult}`);

	}
	const radioList = ['모두 보기', '주문 / 결제', '이용 문의', '혜택', '개인정보', '기타']



	return (
		<div className="myQuestionBox faq">
			<button onClick={() => setFaqList([])}>검색목록이 없을때</button>
			<div className="searchBox">
				<UiInput type="search" placeholder="검색어 입력" onChange={(event) => {
					setSearchResult(event.target.value);
				}} bindSearchSubmit={value => handlerSearchSubmit(value)} />
			</div>
			{
				faqList.length ?
					<>
						<UiSorting radioList={radioList} />
						<ul className="myFaqList">
							{
								faqList.map((list, index) => {
									return (
										<li className="list" key={index}>
											<UiLink className="init lst" to="#;">
												<UiAccordion title={list.title} description={list.description} />
											</UiLink>
										</li>
									)
								})
							}
						</ul>
					</>
					:
					<ul className="mySearch">
						<li className="noResult">
							<div className="innerResult">
								<div className="tit">검색 결과가 없습니다</div>
								<div className="stit">다시 입력해주세요</div>
							</div>
						</li>
					</ul>
			}
		</div>
	)
}
export default MyQuestionFaq;