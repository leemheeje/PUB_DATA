import React, { useState } from 'react';

//COMPONENTS
import UiProfile from 'components/UiProfile'
import UiReviewList from 'components/UiReviewList'

//STYLES
import 'assets/css/myPage.scss';

const MyReview = () => {
    const [defaultProfile, setDefaultProfile] = useState(false) //프로필 이미지 State

    const my_review_list = [			//테스트를 위한 값입니다 초기값은 [] 입니다.
		{
            link: '#;',
            name : '카페달미 (Cafe Dalmi)',
            date : 20200407,
			type : '예약',
			review_grade : 4,
            review_image_files : [],
            description : `미리 주문하고 찾으러 가니 너무 편하고 좋아요!`,
		},
		{
            link: '#;',
            name : '아웃백스테이크하우스 합정점',
            date : 20200205,
			type : '테이블주문',
			review_grade : 5,
            review_image_files : [],
            description : `QR코드로 주문 처음 해봤는데 신기했어요~
            음식도 완전 맛있게 먹었습니다!`,
		}
    ]
    
	return (
		<div className="container mypage">
			<div className="myReviewWrap">
            <div className="myReviewNum">
                <div className="profileImgBox">
                    <UiProfile loginCheck={true} defaultProfile={defaultProfile} />
                </div>
                <div className="txt">내가 작성한 리뷰 <span className="roboto">{my_review_list.length}</span>개</div>
            </div>
                <div className="motReview">
					<ul className="motReviewList">
						{
							my_review_list.map((review, index) => {
								return (
									<li className="motReviewListTp" key={index}>
										<UiReviewList {...review} />
									</li>
								)
							})
						}
					</ul>
				</div>
            </div>
		</div>
	)
}
export default MyReview;