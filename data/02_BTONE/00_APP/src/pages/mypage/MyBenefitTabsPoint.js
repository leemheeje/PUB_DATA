import React, { useState } from 'react';
import { RegExpFormat } from 'regexp';
import { CSSTransition } from 'react-transition-group';
import { useLocation, useHistory } from 'react-router';

//CSSTransition.types
import { CSSTransitionTypes } from '../../CSSTransitionTypes';

// COMPONENTS
import UiButton from 'components/UiButton'
import UiLink from 'components/UiLink'
import UiModal from 'components/UiModal'
import UiSorting from 'components/UiSorting'

//STYLES
import 'assets/css/myPage.scss';

const MyBenefitTabsPoint = ({
	benefit_point = [],
	...props
}) => {
	const history = useHistory();
	const query = new URLSearchParams(useLocation().search);


	const radioList = ['전체 매장', '빈체로 파스타 안산 중앙점', '카페달미(Cafe Dalmi)', '반포쌀국수 잠원점', '첫번째 커피', '베네핏']

	const benefit_point_list = [
		{
			store_name: '빈체로 파스타 안산 중앙점',
			date: 20200421,
			point_plus: 2200,
			point_minus: 0
		},
		{
			store_name: '카페달미 (Cafe Dalmi)',
			date: 20200420,
			point_plus: 0,
			point_minus: 1700
		},
		{
			store_name: '반포쌀국수 잠원점',
			date: 20200418,
			point_plus: 1100,
			point_minus: 0
		},
		{
			store_name: '첫번째 커피',
			date: 20200418,
			point_plus: 300,
			point_minus: 0
		},
		{
			store_name: '베네핏',
			date: 20200415,
			point_plus: 0,
			point_minus: 1100
		},
		{
			store_name: '빈체로 파스타 안산 중앙점',
			date: 20200320,
			point_plus: 0,
			point_minus: 1700
		},
	]

	return (
		<div className="myBenefitBox point">
			<div className="btnListShow">
				<UiButton className="init" onClick={() => history.push('?benefitPointModal=true')}>
					적립 / 사용 내역 보기
				<img src={require(`assets/images/common/icoArrowGray_22.png`)} alt=""/>
				</UiButton>
			</div>
			{
				benefit_point.length > 0 ?
					<div className="benefitList pointList">
						{
							benefit_point.map((list, index) => {
								return (
										<UiLink className="init list" to={list.link} key={index}>
											<div className="thumb"><img src={list.img} /></div>
											<div className="txts">
												<div className="storeName">{list.store_name}</div>
												<div className="period">최근 방문일 : <span className="roboto">{RegExpFormat(list.date, 'date')}</span></div>
												<div className="point"><span className="roboto">{RegExpFormat(list.point, 'comma')}</span> P</div>
											</div>
										</UiLink>
								)
							})
						}
					</div>
					:
					<div className="emptyList">
						<img src={`${require('assets/images/common/icoPointEmpty.png')}`} className="icoPoint" />
						<span className="txt">보유 포인트가 없습니다</span>
					</div>
			}
			<CSSTransition
				{
				...{
					...CSSTransitionTypes.inOutY,
					...{
						in: query.get('benefitPointModal') === 'true',
						onEnter: () => { },
					}
				}
				}
			>
				<UiModal
					bindOnloadCallback={() => console.log('bindOnloadCallback')}
					bindCloseCallback={() => console.log('bindCloseCallback')}
					bindClickCancelBtn={() => { }}
					headerName="적립 / 사용 내역"
				>
					<UiSorting radioList={radioList} />
					{
						benefit_point_list.length > 0 ?
							<div className="benefitList pointList sorting">
								{
									benefit_point_list.map((list, index) => {
										return (
											list.use !== '' ?
												<div className="list" key={index}>
													<div className="storeName">{list.store_name}</div>
													<div className="period"><span className="roboto">{RegExpFormat(list.date, 'date')}</span></div>
													{
														list.point_plus > 0 ?
															<div className="point plus">
																<img src={`${require('assets/images/common/icoPlusBlack.png')}`} alt="" />
																<span className="roboto">{RegExpFormat(list.point_plus, 'comma')}</span> P
                                            </div>
															:
															<div className="point minus">
																<img src={`${require('assets/images/common/icoMinBlack.png')}`} alt="" />
																<span className="roboto">{RegExpFormat(list.point_minus, 'comma')}</span> P
                                            </div>
													}

												</div>
												:
												undefined
										)
									})
								}
							</div>
							:
							<div className="emptyList">
								<img src={`${require('assets/images/common/icoPointEmpty.png')}`} className="icoPoint" />
								<span className="txt">포인트 적립 / 사용 내역이 없습니다</span>
							</div>
					}
				</UiModal>
			</CSSTransition>


		</div>
	)
}
export default MyBenefitTabsPoint;