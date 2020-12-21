import React, { useState } from 'react';
import '../assets/css/uiSorting.scss';


const UiSorting = ({
	radioList = ['모두보기', '포장주문', '예약', '줄서기', '테이블주문', '키오스크'],//임시 소팅 리스트
	...props
}) => {

	const [sortingTitle, setSortingTitle] = useState(radioList[0]);
	const [sortingVisible, setSortingVisible] = useState();

	//정렬노출
	const sortingToggle = () => {
		if (sortingVisible) {
			setSortingVisible('');
		} else {
			setSortingVisible('active');
		}
	}

	//정렬노출
	const sortingChange = (e) => {
		setSortingTitle(e.target.value)
	}

	return (
		<>
			<div className={`sortingPop ${sortingVisible}`}>
				<p className="title" onClick={sortingToggle}><span>{sortingTitle}<img src={require(`assets/images/common/icoSortingOff.png`)} alt=""/></span></p>
				<ul>
					{
						radioList.map((value, idx) => {
							return (

								<li key={idx}>
									<input
										type="radio"
										id={`sorting0${idx}`}
										name="sortingPop"
										onChange={sortingChange}
										defaultValue={value}
										defaultChecked={idx == 0 && 'defaultChecked'}
									/>
									<label
										htmlFor={`sorting0${idx}`}
										onClick={sortingToggle}>
										{value}
									</label>
								</li>
							)
						})
					}
				</ul>
			</div>
		</>
	)
}
export default UiSorting;