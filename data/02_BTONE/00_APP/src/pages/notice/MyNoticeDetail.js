import React, { useState } from 'react';
import { RegExpFormat } from 'regexp';

//COMPONENTS
import UiLink from 'components/UiLink'

//STYLES
import 'assets/css/myNotice.scss';

const MyNoticeDetail = ({
	list = [],
}) => {
	return (
		<div className="myNoticeDetail">
			<div className="titArea">
				<div className="tit">
					<span>[{list.category}]</span> <span>{list.title}</span>
				</div>
				<div className="date roboto">{RegExpFormat(list.date, 'date')}</div>
			</div>
			<div className="descArea">
				{list.description}
			</div>
			<div className="btnBack"><UiLink className="outline shadowNone" to="/notice/index">목록으로 돌아가기</UiLink></div>
		</div>
	)
}
export default MyNoticeDetail;