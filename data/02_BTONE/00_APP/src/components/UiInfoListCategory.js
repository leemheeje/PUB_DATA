import React from 'react';

//STYLES
import 'assets/css/uiInfoListCategory.scss';

const UiInfoListCategory = ({
	category_name,
	...props
}) => {
	return (
		<div className="uiInfoListCategory">
			<div className="uiInfoListCateName">
				<div className="innerWrap">
					<div className="uiInfoListCateNameTit">{props.children || category_name}</div>
				</div>
			</div>
		</div>

	)
}


export default UiInfoListCategory;