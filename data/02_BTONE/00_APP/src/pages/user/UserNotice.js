import React, { useState } from 'react';
import { RegExpFormat } from 'regexp';

//COMPONENTS
import UiLink from 'components/UiLink';

//STYLES
import 'assets/css/userNotice.scss';

const UserNotice = ({
	list = [
		{
			title: 'asdf',
			date: 20202020
		},
		{
			title: 'asdf',
			date: 20202020
		}
	],
	...props
}) => {
	const [noticeList, setNoticeList] = useState(list);
	return (
		<div className="container">
			<div className="userNotice">
				<button onClick={()=>setNoticeList([])}>알림없을때</button>
				{
					noticeList.length
						?
						<ul className="usnList">
							{
								noticeList.map(({
									title,
									date,
								}, index) => {
									return (
										<li className="usnTp" key={index}>
											<UiLink to="/" className="init inner">
												<img src={require(`assets/images/common/icoArrowGray_22.png`)} className="icoArrowGray_22" alt=""/>
												<div className="innerWrap">
													<div className="tit">{title}</div>
													<div className="date">{RegExpFormat(date, 'date')}</div>
												</div>
											</UiLink>
										</li>
									)
								})
							}
						</ul>
						:
						<div className="usnNull">
							<div className="innerWrap">
								<div className="tit">
									<img src={require(`assets/images/common/icoPhoneNull.png`)} alt=""/>
									알림 메시지가 없습니다.
								</div>
								<UiLink to="/mypage/mySetting" className="MT70">알림설정</UiLink>
							</div>
						</div>
				}
			</div>
		</div>
	)
}
export default UserNotice;