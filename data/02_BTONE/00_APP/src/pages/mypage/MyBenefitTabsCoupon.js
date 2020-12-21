import React, { useState, useEffect } from 'react';
import { RegExpFormat } from 'regexp';
import { CSSTransition } from 'react-transition-group';
import { useLocation, useHistory } from 'react-router';

//CSSTransition.types
import { CSSTransitionTypes } from '../../CSSTransitionTypes';

// COMPONENTS
import UiButton from 'components/UiButton'
import UiLink from 'components/UiLink'
import UiModal from 'components/UiModal'

//STYLES
import 'assets/css/myPage.scss';

const MyBenefitTabsCoupon = ({
	benefit_coupon = [],
	couponNum,
	couponEndNum,
	...props
}) => {
	const history = useHistory();
	const query = new URLSearchParams(useLocation().search);
	const [couponLength, setCouponLength] = useState(couponNum);
	const [couponEndLength, setCouponEndLength] = useState(couponEndNum);
	
	useEffect(()=>{
		setCouponLength(couponNum);
	},[couponNum]);
	useEffect(()=>{
		setCouponEndLength(couponEndNum);
	},[couponEndNum]);


	return (
		<div className="myBenefitBox">
			<div className="btnListShow">
				<UiButton className="init" onClick={() => history.push('?benefitCouponModal=true')}>
				지난 쿠폰 내역 보기
				<img src={require(`assets/images/common/icoArrowGray_22.png`)} alt=""/>
				</UiButton>
			</div>
			{
				couponLength ?
					<div className="benefitList couponList">
						{
							benefit_coupon.map((list, index) => {
								return (
									list.use === '' ?
										<div className="list" key={index}>
											<div className="storeName">{list.store_name}</div>
											<div className="title">{list.title}</div>
											<div className="period">유효기간 : <span className="roboto">{RegExpFormat(list.period_start, 'date')} - {RegExpFormat(list.period_end, 'date')}</span></div>
											<div className="btnStore"><UiLink className="init" to={list.link}>
												매장 바로가기
												<img src={require(`assets/images/common/icoArrowBlack2.png`)} alt=""/>
											</UiLink></div>
										</div>
										:
										undefined
								)
							})
						}
					</div>
					:
					<div className="emptyList">
						<img src={`${require('assets/images/common/icoCouponEmpty.png')}`} className="icoCoupon" />
						<span className="txt">보유 쿠폰이 없습니다</span>
					</div>
			}


			<CSSTransition
				{
				...{
					...CSSTransitionTypes.inOutY,
					...{
						in: query.get('benefitCouponModal') === 'true',
						onEnter: () => { },
					}
				}
				}
			>
				<UiModal
					bindOnloadCallback={() => console.log('bindOnloadCallback')}
					bindCloseCallback={() => console.log('bindCloseCallback')}
					bindClickCancelBtn={() => { }}
					headerName="지난 쿠폰 내역"
				>
					{
						couponEndLength > 0 ?
							<div className="benefitList couponList end">
								{
									benefit_coupon.map((list, index) => {
										return (
											list.use !== '' ?
												<div className="list" key={index}>
													<div className="storeName gray">{list.store_name}</div>
													<div className="title">{list.title}</div>
													<div className="period">유효기간 : <span className="roboto">{RegExpFormat(list.period_start, 'date')} - {RegExpFormat(list.period_end, 'date')}</span></div>
													<div className="couponState">{list.use}</div>
												</div>
												:
												undefined
										)
									})
								}
							</div>
							:
							<div className="emptyList">
								<img src={`${require('assets/images/common/icoCouponEmpty.png')}`} className="icoCoupon" />
								<span className="txt">지난 쿠폰 내역이 없습니다</span>
							</div>
					}
				</UiModal>
			</CSSTransition>
		</div>
	)
}
export default MyBenefitTabsCoupon;