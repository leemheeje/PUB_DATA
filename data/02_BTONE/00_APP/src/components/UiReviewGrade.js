import React, { useEffect, useState } from 'react';
import '../assets/css/uiReviewGrade.scss';

const UiReviewGrade = ({
	gradeLength = 5,
	point = 0,
	istext,
	fnEventHandlerPoint = () => { },
	...props
}) => {
	const [elementGrade, setElementGrade] = useState([]);
	const [pointGrade, setPointGrade] = useState(point);
	const buttonTextArray = ['비추', '별로', '무난', '좋음', '강추'];
	
	useEffect(() => {
		if (gradeLength) {
			let array = [];
			for (let count = 1; count <= gradeLength; count++) {
				array.push(count);
			}
			setElementGrade([
				...elementGrade,
				...array
			]);
		}
	}, []);

	return (
		<div className={
			`uiReviewGrade ${
			props.sm ? 'sm' : ''
			}`
		}>
			<div className="inner">
				{
					elementGrade.map((count, key) => <div className={`grArea ${
						count === pointGrade
							? 'active'
							: ''
						}`} key={key}><button className={`grCir tp${count}`} onClick={() => {
							fnEventHandlerPoint(count);
							setPointGrade(count);
						}} disabled={props.disabled}>
							<img src={require(`assets/images//common/reviewGradeImg00${count}.png`)} className="on" alt={count}/>
							<img src={require(`assets/images//common/reviewGradeImg00${count}Active.png`)} className="active" alt={count}/>
						</button>
						{
							istext === 'true'
								? <span className="txt">{buttonTextArray[key]}</span>
								: ''
						}
					</div>)
				}
			</div>
		</div>
	)
}

export default UiReviewGrade;