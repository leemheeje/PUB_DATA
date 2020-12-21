import React, { useState } from 'react';
import '../assets/css/uiTab.scss';

const UiTab = props => {
	return  (
		<>
			<div class="tabType1">
				
			</div>

			<button className={`btnType1 ${props.className}`} disabled={props.disableBtn}>{props.text}</button>
		</>
	)
}
export default UiTab;