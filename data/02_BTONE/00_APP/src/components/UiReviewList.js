import React, { useState, useEffect } from 'react';
import { RegExpFormat } from 'regexp';
import { CSSTransition } from 'react-transition-group';

//CSSTransition.types
import { CSSTransitionTypes } from '../CSSTransitionTypes';

//COMPONENTS
import UiReviewGrade from 'components/UiReviewGrade';
import UiButton from 'components/UiButton';
import UiModal from 'components/UiModal';
import UiLink from 'components/UiLink';

//STYLES
import 'assets/css/uiReviewList.scss';
import { useHistory, useLocation } from 'react-router';


const UiReviewList = ({
	thumbnail,
	name,
	description,
	date,
	type,
	review_grade,
	review_image_files = [],
	link,
	...props
}) => {

	const history = useHistory();
	const query = new URLSearchParams(useLocation().search);
	const [oriImageModalSource, setOriImageModalSource] = useState('');

	return (
		<div className="uiReviewList">
			<div className="urvTop">
				<div className="thumb">
					<img src={thumbnail} alt="user_Thumbnail" />
				</div>
				<div className="txts">
					<div className="urvTit">
						{
							link ?
								<UiLink className="init" to={link}>{name}</UiLink>
								:
								<>
									{name}님
							</>
						}
						<img src={require(`assets/images/common/icoArrow.png`)} alt=""/>
					</div>
					<div className="urvGradeArea">
						<div className="urvGrade">
							<UiReviewGrade sm disabled point={review_grade} />
						</div>
						<div className="rrvgRt">
							<div className="date">{RegExpFormat(date, 'date')}</div>
							<div className="type">{type}</div>
						</div>
					</div>
				</div>
				<UiButton className="init urvDeleteBtn">
					<img src={require(`assets/images/common/icoSearchClose.png`)} alt="리뷰삭제"/>
				</UiButton>
			</div>
			<div className="urvCont">
				{
					review_image_files.map((image, index) => {
						return <div className="imgFiles" key={index} onClick={() => {
							setOriImageModalSource(image);
							history.push('?defOriginImage=true');
						}}><img src={image} alt="" /></div>;
					})
				}
				<div className="txtDescription">
					{description}
				</div>
			</div>
			<div className="urvBot">
				<div className="urvBotInner">
					<div className="urvBotTp">
						<div className="urvBotTit">
							<span className="nm">사장님</span>답글
						</div>
						<div className="date roboto">{RegExpFormat(date, 'date')}</div>
					</div>
					<div className="txtDescription">
						{description}
					</div>
				</div>
			</div>
			<CSSTransition
				{
				...{
					...CSSTransitionTypes.inOutY,
					...{
						in: oriImageModalSource !== '' && query.get('defOriginImage') === 'true',
						onEnter: () => { },
					}
				}
				}
			>
				<UiModal
					headerName="리뷰사진 상세보기"
					bindCloseCallback={() => {
						setOriImageModalSource('');
					}}
				>
					<div className="oriThumb">
						<img src={oriImageModalSource} alt="" />
					</div>
				</UiModal>
			</CSSTransition>
		</div>
	)
}


export default UiReviewList;