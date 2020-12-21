import React, { useState } from 'react';

//COMPONENTS
import UiSwiperFree from 'components/UiSwiperFree';
import UiInfoListCategory from 'components/UiInfoListCategory';
import UiInfoList from 'components/UiInfoList';
import UiLink from 'components/UiLink';

//STYLES
import 'assets/css/myOrderTabsMenu.scss';

const MyOrderTabsMenu = ({
	store_favorit_menu = [],
	store_all_menu = [],
	...props
}) => {
	const [addMore, setAddMore] = useState(false);
	return (
		<div className="myOrderTabsMenu">
			<div className="tbmTop">
				<div className="innerWrap">
					<div className="tit">추천메뉴</div>
				</div>
				<UiSwiperFree imgList={
					store_favorit_menu
				}></UiSwiperFree>
			</div>
			<div className="tbmList">
				<div className="tbmMenuList">
					{
						store_all_menu.map((menus, i) => {
							return (
								<div className="tbmMenuTp" key={i}>
									{
										menus.category_name
										&& <UiInfoListCategory category_name={menus.category_name} />
									}
									{
										menus.result.map((list, index) => {
											return (
												<UiLink to={list.link} className="init innerWrap" key={index}>
													<UiInfoList {...list} />
												</UiLink>
											)
										})
									}

								</div>
							)
						})
					}

				</div>
			</div>
			<div className="tbmInfo">
				<div className="innerWrap">
					<div className="tbmiTit">원산지 정보</div>
					<p className={`tbmiTxts ${addMore ? 'active' : ''}`}>
						원두(브라질, 콜롬비아), 우유(국내산), 계란(국내산), 치즈(국내산), 소시지
						(국내산), 설탕(국내산), 메밀(국내산), 대파(국내산), 물(국내산), 빵(미국산),
						원두(브라질, 콜롬비아), 우유(국내산), 계란(국내산), 치즈(국내산), 소시지
						(국내산)원두(브라질, 콜롬비아), 우유(국내산), 계란(국내산), 치즈(국내산), 소시지
						(국내산)
					</p>
					{
						!addMore
						?
						<span className="tbmiMore" onClick={() => setAddMore(true)}>더보기</span>
						:
						<span className="tbmiMore" onClick={() => setAddMore(false)}>닫기</span>
					}
				</div>
			</div>
		</div>
	)
}
export default MyOrderTabsMenu;