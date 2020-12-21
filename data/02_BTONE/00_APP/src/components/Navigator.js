import React, { useState } from "react";
import { Link } from 'react-router-dom';
import UiLink from 'components/UiLink'

const Navigator = ({
	page = '',
}) => {

	const [loginCheck, setLoginCheck] = useState(false)

	const loginGo = () => {
		setLoginCheck(true);
	}

	return (
		<>
		{
			loginCheck && page === '' ?
			undefined
			:
			<div className="navigator">
				{loginCheck && page === 'main' ?
					<ul>
						<li>
							<Link to="/mypage/myBenefit">
								<span className="ico01">
									<img src={require(`assets/images/common/icoNav01.png`)} alt=""/>
									나의 혜택
								</span>
							</Link>
						</li>
						<li>
							<Link to="/mypage/myHistory/index">
								<span className="ico02">
									<img src={require(`assets/images/common/icoNav02.png`)} alt=""/>
									이용내역
								</span>
							</Link>
						</li>
						<li>
							<Link to="/mypage/myModifyInfo">
								<span className="ico03">
									<img src={require(`assets/images/common/icoNav03.png`)} alt=""/>
									나의 정보
								</span>
							</Link>
						</li>
					</ul>
					:
					<div className="loginBox">
						<p>로그인하면 더 많은 서비스를 이용할 수 있습니다</p>
						<UiLink to="/user/userLogin" className="miniWhite" text="로그인"></UiLink>
					</div>
				}
			</div>
		}
		</>
	)
}
export default Navigator;