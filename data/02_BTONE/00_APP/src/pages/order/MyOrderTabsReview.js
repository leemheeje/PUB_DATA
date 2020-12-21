import React, { useState } from 'react';
import { RegExpFormat } from 'regexp';

//COMPONENTS
import UiReviewList from 'components/UiReviewList';
import UiLink from 'components/UiLink';
import UiButton from 'components/UiButton';
import UiSorting from "components/UiSorting"

//STYLES
import 'assets/css/myOrderTabsReview.scss';

const MyOrderTabsReview = ({
	store_review,
	...props
}) => {
	const [reviewSortType, setReviewSortType] = useState(0); //0:최신순, 1:별점높은순, 2:별점낮은순
	return (
		<div className="myOrderTabsReview">
			<div className="innerWrap">
				<div className="motTop">
					<div className="txts">
						<div className="tit">전체 리뷰 <span className="roboto">{RegExpFormat(1616, 'comma')}</span>개</div>
						<UiLink className="inline outline red md shadowNone" to="/review">리뷰 작성</UiLink>
					</div>
					<div className="sort">
						<div className="btnsGroup">
							<UiButton className={`inline xs shadowNone ${reviewSortType === 0 ? 'red' : 'outline'}`} onClick={() => setReviewSortType(0)}>최신순</UiButton>
							<UiButton className={`inline xs shadowNone ${reviewSortType === 1 ? 'red' : 'outline'}`} onClick={() => setReviewSortType(1)}>별점높은순</UiButton>
							<UiButton className={`inline xs shadowNone ${reviewSortType === 2 ? 'red' : 'outline'}`} onClick={() => setReviewSortType(2)}>별점낮은순</UiButton>
						</div>
						<UiSorting />
					</div>
				</div>
				<div className="motReview">
					<ul className="motReviewList">
						{
							store_review.map((review, index) => {
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
export default MyOrderTabsReview;