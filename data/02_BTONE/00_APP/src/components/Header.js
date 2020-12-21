import React, { useState, useEffect } from "react";
import { Route, Link, useParams, useLocation } from 'react-router-dom';
import { CSSTransition } from 'react-transition-group';

//CSSTransition.types
import { CSSTransitionTypes } from '../CSSTransitionTypes';

//COMPONENTS
import UiInput from 'components/UiInput';
import UiModal from 'components/UiModal';
import UiLink from 'components/UiLink';

//PAGES
import MyPage from 'pages/mypage/MyPage';

//STYLES
import '../assets/css/header.scss';

const Header = ({
	location,
	history,
	...props
}) => {
	const query = new URLSearchParams(useLocation().search);
	const [onModalOpen, setOnModalOpen] = useState(false);
	const [alarmCheck, setAlarmCheck] = useState(true); //새로운 알림이 있을때 ? :
	const [pageName, setPageName] = useState('');
	const { pathname, options } = location;
	const [searchInputValue, setSearchInputValue] = useState(''); //검색어
	const handlerSearchSubmit = value => { //검색버튼 누를때
		console.log(value); //컴포넌트에서 넘어오는 검색어 값
		console.log(searchInputValue); //페이지내에서 불러오는 검색어 값
	}
	useEffect(() => {
		let pg_name = location.options.pageName || window.DEFAULT_PAGE_NAME;
		setPageName(pg_name);
	}, [pathname]);

	return (
		<div className="header">
			{
				pathname.indexOf('/payment/paymentcompletion') !== -1
					? <>
					</>
					:
					<div className={pathname === '/mypage/myBenefit' || pathname === '/mypage/myQuestion' ? 'in none' : 'in'}>
						{
							pathname === '/' || pathname === '/mypage' || query.get('mypageModal') === 'true'
								? <>
									{
										pathname === '/' ?
											<>
												<div className="btnMenu" onClick={() => history.push('?mypageModal=true')}>
													<span><img src={require(`assets/images/common/btnMenu.png`)} alt="메뉴열기" /></span>
												</div>

												<div className="h1Logo">
													<h1><img src={require('../assets/images/common/logo.png')} alt="비티원" /></h1>
												</div>
											</>
											:
											<>
												<Link className="btnClose" to="/">
													<img src={require(`assets/images/common/icoCloseBlack.png`)} alt="닫기"/>
												</Link>
											</>
									}
									<HeaderInnerComponents alarmCheck={alarmCheck} />
								</>
								: <div className={`subHeader ${
									pathname === '/search' && 'noPaddingRight'
									}`}>
									<div className="btnBack" onClick={() => history.goBack()}>
										<img src={require(`assets/images/common/icoBack.png`)} alt="뒤로가기"/>
									</div>
									{
										pathname !== '/search'
											?
											<div className="pageName">{pageName}</div>
											:
											<div className="headerSearch">
												<UiInput type="search" placeholder="매장명 또는 메뉴명으로 검색하세요" onChange={(event) => {
													setSearchInputValue(event.target.value);
												}} bindSearchSubmit={value => handlerSearchSubmit(value)} />
											</div>
									}
								</div>
						}
					</div>
			}

			<div className="dimm"></div>

			<CSSTransition
				{
				...{
					...CSSTransitionTypes.inOutY,
					...{
						in: query.get('mypageModal') === 'true',
						onEnter: () => { },
					}
				}
				}
			>
				<UiModal
					bindOnloadCallback={() => console.log('bindOnloadCallback')}
					bindCloseCallback={() => console.log('bindCloseCallback')}
					bindClickCancelBtn={() => { }}
					headerCustomJSX={(
						<div className="uiModalHeader">
							<div className="subHeader">
								<div className="btnClose" onClick={() => {
									history.goBack();
								}}><img src={require(`assets/images/common/icoCloseBlack.png`)} alt="닫기"/></div>
								<HeaderInnerComponents alarmCheck={alarmCheck} />
							</div>
						</div>
					)}
				>
					<MyPage />
				</UiModal>
			</CSSTransition>

		</div>
	)
}

const HeaderInnerComponents = ({ alarmCheck, ...props }) => (
	<div className="rightArea">

		<div className={`btnAlarm ${alarmCheck ? 'active' : ''}`}>
			<UiLink className="init" to="/user/userNotice">
				<>
					<img src={require(`assets/images/common/icoAlarm.png`)} alt="알림" />
					<span className="new"><img src={require(`assets/images/common/icoNew.png`)} alt="알림" /></span>
				</>
			</UiLink>
		</div>

		<div className="btnSearch">
			<UiLink className="init" to="/search">
				<img src={require(`assets/images/common/icoSearch.png`)} alt="검색"/>
			</UiLink>
		</div>
	</div>
)
export default Header;