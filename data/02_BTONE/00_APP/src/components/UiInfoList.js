import React, { useState } from 'react';
import { RegExpFormat } from 'regexp';
//STYLES
import 'assets/css/uiInfoList.scss';


const UiInfoList = (props) => {
	return (
		<div className={`uiInfoList ${
			props.size
				? props.size
				: ''
			} ${
				props.list_thumbnail
				? 'isThumb'
				: ''
			}`}>
			<div className="uiListTit">{props.list_name}</div>
			<div className="uiListDescript">{props.list_description}</div>
			{
				typeof props.list_price !== 'undefined'
				&&
				<div className="uiListPrice">
					<span className="roboto">{RegExpFormat(props.list_price, 'comma')}</span>
					<span className="lb">원</span>
				</div>
			}
			{
				typeof props.list_thumbnail !== 'undefined'
				&&
				<div className="uiListThumb">
					<img src={props.list_thumbnail} alt=""/>
				</div>
			}
		</div>
	)
}


export default UiInfoList;