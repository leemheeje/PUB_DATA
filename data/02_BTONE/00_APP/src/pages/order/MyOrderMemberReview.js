import React, { useState } from 'react';
import { RegExpFormat } from 'regexp';

//COMPONENTS
import UiReviewList from 'components/UiReviewList';
import UiProfile from 'components/UiProfile';

//STYLES
import 'assets/css/myOrderMemberReview.scss';

const MyOrderMemberReview = ({
	...props
}) => {
	const [defaultProfile, setDefaultProfile] = useState(false) //프로필 이미지 State
	const my_review_list = [			//테스트를 위한 값입니다 초기값은 [] 입니다.
		{
			link: '#;',
			name: '카페달미 (Cafe Dalmi)',
			date: 20200407,
			type: '예약',
			review_grade: 4,
			review_image_files: [require('assets/images/thumb/banner2.png')],
			description: `미리 주문하고 찾으러 가니 너무 편하고 좋아요!`,
		},
		{
			link: '#;',
			name: '아웃백스테이크하우스 합정점',
			date: 20200205,
			type: '테이블주문',
			review_grade: 5,
			review_image_files: [require('assets/images/thumb/banner3.png')],
			description: `QR코드로 주문 처음 해봤는데 신기했어요~
            음식도 완전 맛있게 먹었습니다!`,
		}
	]
	return (
		<div className="container">
			<div className="myOrderMemberReview">
				<div className="innerWrap">
					<div className="mmrTop">
						<UiProfile defaultProfile={defaultProfile} />
						<div className="txts">
							<div className="tit">토실토실토시님</div>
							<div className="stit">작성한 리뷰 <span className="roboto">{RegExpFormat(my_review_list.length, 'comma')}</span>개</div>
						</div>
					</div>
					<div className="mmrCont">
						<ul className="mmrContList">

							{
								my_review_list.map((review, index) => {
									return (
										<li className="mmrContTp" key={index}>
											<UiReviewList {...review} />
										</li>
									)
								})
							}

						</ul>
					</div>
				</div>
			</div>
		</div>
	)
}
export default MyOrderMemberReview;