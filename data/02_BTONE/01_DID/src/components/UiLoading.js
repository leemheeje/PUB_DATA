import React, { useState } from 'react';
import '../assets/css/UiLoading.scss';

const UiLoading = props => {
	return (
		<>
			<div className="loadingPop">
				<div className="img">
					<div className="txt"><span>처</span><span>리</span><span>중</span></div>
					<div className="dot">
						<span>.</span>
						<span>.</span>
						<span>.</span>
					</div>
				</div>
			</div>
		</>
	)
}

export default UiLoading;