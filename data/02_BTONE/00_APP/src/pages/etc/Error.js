import React from 'react';
import { useHistory } from 'react-router';

//COMPONENTS
import UiButton from 'components/UiButton';
import UiLink from 'components/UiLink';

//STYLES
import 'assets/css/header.scss';
import 'assets/css/etc.scss';

const Error = props => {
	const history = useHistory();
	return (
		<>
		<div className="header">
			<div className="in">
				<div className="subHeader">
					<div className="btnBack" onClick={() => history.goBack()}></div>
					<div className="h1Logo">
						<h1><img src={require('assets/images/common/logo.png')} alt="비티원" /></h1>
					</div>
				</div>
			</div>
		</div>
		<div className="container">
			<div className="etcCenter">
				<div className="tit error404"><img src={require(`assets/images/common/etcIcoError404.png`)} alt=""/>고객님, 죄송합니다</div>
				<div className="stit MT15">페이지를 찾을 수 없습니다.</div>
				<div className="btnsWrap MT150">
					<UiLink to="/">메인으로 바로가기</UiLink>
				</div>
			</div>
		</div>
		</>
	)
}
export default Error;