import React from 'react';

//STYLES
import 'assets/css/uiProfile.scss';

const UiProfile = ({
	loginCheck,
	defaultProfile,
	thumbnail = '',
	...props
}) => {
	return (
		<div className="uiReviewList">
			{
				thumbnail
					? <img src={thumbnail} alt="" className="profileImg" />
					: loginCheck
						? defaultProfile
							? <img src={`${require('assets/images/common/mypageProfile.png')}`} alt="" className="profileImg" />
							: <img src={`${require('assets/images/common/icoProfileBasic.png')}`} alt="" className="profileImg default" />
						: <img src={`${require('assets/images/common/icoProfileBasicGray.png')}`} alt="" className="profileImg default" />
			}
		</div>
	)
}


export default UiProfile;