import React, { useState, useEffect } from 'react';
import 'assets/css/uiTooltip.scss';

const UiTooltip = ({
	title = '',
	message = '',
}) => {
	return (
		<div className="tooltip">
			<div className="title">
				{title}
			</div>
			<div className="message">
				{message}
			</div>
		</div>
	);
};

export default UiTooltip;