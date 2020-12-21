import React, { useState } from 'react';

//STYLES
import '../assets/css/uiStep.scss';


const UiStep = ({
	steps = [],
	activeIndex = 0,
	...props
}) => {
	return (
		<div className="uiStep">
			<ol className="uiStepList">
				{
					steps.map((list, index) => {
						return (
							<li className={`uiStepTp ${
								index === activeIndex
									? 'active'
									: ''
								}`} key={index}>
								<span className="uiStepTxt">{list}</span>
								<img src={require(`assets/images/common/icoArrowGray_15.png`)} className="icoArrowGray_15" alt=""/>
							</li>
						)
					})
				}
			</ol>
		</div>
	)
}
export default UiStep;