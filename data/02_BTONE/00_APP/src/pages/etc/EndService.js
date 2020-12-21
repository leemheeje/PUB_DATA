import React from 'react';
import { useHistory } from 'react-router';

//COMPONENTS
import UiButton from 'components/UiButton';
import UiLink from 'components/UiLink';

//STYLES
import 'assets/css/header.scss';
import 'assets/css/etc.scss';

const EndService = props => {
	const history = useHistory();
	return (
		<>
		<div className="header">
			<div className="in">
				<div className="subHeader">
					<div className="btnBack" onClick={() => history.goBack()}><img src={require(`assets/images/common/icoCloseBlack.png`)} alt=""/></div>
					<div className="pageName">서비스 종료</div>
				</div>
			</div>
		</div>
		<div className="container gray">
			<div className="etcCenter">
				<div className="tit endService"><img src={require(`assets/images/common/etcIcoEndService.png`)} alt=""/>반포쌀국수 잠원점</div>
				<div className="stit MT15">선택하신 매장은<div className="COLOR_BLACK strong">서비스가 종료되었습니다</div></div>
			</div>
		</div>
		</>
	)
}
export default EndService;