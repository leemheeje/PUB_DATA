import React, { useState } from 'react';
import { RegExpFormat } from '../regexp';
//COMPONENTS
//SCSS
import '../assets/css/UiItem.scss';


const defaultProps = {
	thumbnail: '',
	menu_name: '메뉴명을 입력해주세요.',
	menu_price: 0
}

const UiItem = props => {
	const { fnEventHandler, fnEventHandlerDelected, cart_index, order, menu_options, thumbnail_width_inherit } = props;
	const [eventHandlerFocus, setEventHandlerFocus] = useState(false);
	const fnEventHandlerFocus = () => {
		setEventHandlerFocus(true);
	}
	const fnEventHandlerBlur = () => {
		setEventHandlerFocus(false);
	}
	return (
		<div className={`uiItemWrap ${
			props.size ? props.size : ''
			}
			${
			props.favorite ? 'favorite' : ''
			}
			${
			order ? 'order' : ''
			}
			${
			eventHandlerFocus ? 'focus' : ''
			}`} onClick={
				fnEventHandler ? () => fnEventHandler(props) : null
			}>
			<div className="uiItemInner">
				<div className="uiItem">
					<span className={`uitThumb ${
						!props.thumbnail
						&& `noimg`
						}`}>
						<img src={
							props.thumbnail
								? props.thumbnail
								: require('../assets/images/common/noImg.png')
						} style={
							thumbnail_width_inherit ? {
								maxWidth: 'inherit'
							} : {}
						} alt="" />
					</span>
					<div className="uitTxts">
						<div className="uitT">{props.menu_name}</div>
						{
							order && menu_options
							&&
							<ul className="uitOpt">
								{
									menu_options.map((item, index) => {
										return item.add && (
											<li className={`tp tp${index}`} key={index}>
												<span className="lt">{item.label}</span>
												<span className="rt">{
													!isNaN(item.value)
														? (
															<>
																<span className="roboto">+{RegExpFormat(item.value, 'comma')}</span>원
															</>
														)
														: item.value
												}</span>
											</li>
										)
									})
								}
							</ul>
						}
						<div className="uitP">
							<span className="roboto">{
								order
									? RegExpFormat(props.totalMenuPrice, 'comma')
									: RegExpFormat(props.menu_price, 'comma')
							}</span>원
						</div>
					</div>
					{
						props.ui_count && (
							<div className="uitCount">
								{props.children}
							</div>
						)
					}
					{
						order && typeof props.count !== 'undefined'
						&&
						<span className="lbUitCount roboto">
							{props.count}</span>
					}
				</div>
				{
					fnEventHandlerDelected && <a className="uiItemDelect" onTouchStart={fnEventHandlerFocus} onTouchEnd={fnEventHandlerBlur} onClick={()=>fnEventHandlerDelected(cart_index)} title="삭제"></a>
				}
			</div>
		</div>
	)
}

UiItem.defaultProps = defaultProps;

export default UiItem;